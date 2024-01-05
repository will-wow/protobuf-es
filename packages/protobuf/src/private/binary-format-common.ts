// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type { IBinaryReader, IBinaryWriter } from "../binary-encoding.js";
import { BinaryReader, BinaryWriter, WireType } from "../binary-encoding.js";
import type {
  BinaryFormat,
  BinaryReadOptions,
  BinaryWriteOptions,
} from "../binary-format.js";
import { Message } from "../message.js";
import type { FieldInfo } from "../field.js";
import { LongType, ScalarType } from "../field.js";
import { wrapField } from "./field-wrapper.js";
import { scalarDefaultValue, scalarTypeInfo } from "./scalars.js";
import { assert } from "./assert.js";

/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unnecessary-condition, no-case-declarations, prefer-const */

const unknownFieldsSymbol = Symbol("@bufbuild/protobuf/unknown-fields");

// Default options for parsing binary data.
const readDefaults: Readonly<BinaryReadOptions> = {
  readUnknownFields: true,
  readerFactory: (bytes) => new BinaryReader(bytes),
};

// Default options for serializing binary data.
const writeDefaults: Readonly<BinaryWriteOptions> = {
  writeUnknownFields: true,
  writerFactory: () => new BinaryWriter(),
};

function makeReadOptions(
  options?: Partial<BinaryReadOptions>,
): Readonly<BinaryReadOptions> {
  return options ? { ...readDefaults, ...options } : readDefaults;
}

function makeWriteOptions(
  options?: Partial<BinaryWriteOptions>,
): Readonly<BinaryWriteOptions> {
  return options ? { ...writeDefaults, ...options } : writeDefaults;
}

export function makeBinaryFormatCommon(): Omit<BinaryFormat, "writeMessage"> {
  return {
    makeReadOptions,
    makeWriteOptions,
    listUnknownFields(
      message: Message,
    ): ReadonlyArray<{ no: number; wireType: WireType; data: Uint8Array }> {
      return (message as any)[unknownFieldsSymbol] ?? [];
    },
    discardUnknownFields(message: Message): void {
      delete (message as any)[unknownFieldsSymbol];
    },
    writeUnknownFields(message: Message, writer: IBinaryWriter): void {
      const m = message as any;
      const c = m[unknownFieldsSymbol] as any[] | undefined;
      if (c) {
        for (const f of c) {
          writer.tag(f.no, f.wireType).raw(f.data);
        }
      }
    },
    onUnknownField(
      message: Message,
      no: number,
      wireType: WireType,
      data: Uint8Array,
    ): void {
      const m = message as any;
      if (!Array.isArray(m[unknownFieldsSymbol])) {
        m[unknownFieldsSymbol] = [];
      }
      m[unknownFieldsSymbol].push({ no, wireType, data });
    },
    readMessage<T extends Message<T>>(
      message: T,
      reader: IBinaryReader,
      lengthOrEndTagFieldNo: number,
      options: BinaryReadOptions,
      delimitedMessageEncoding?: boolean,
    ): void {
      const type = message.getType();
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const end = delimitedMessageEncoding
        ? reader.len
        : reader.pos + lengthOrEndTagFieldNo;
      let fieldNo: number | undefined, wireType: WireType | undefined;
      while (reader.pos < end) {
        [fieldNo, wireType] = reader.tag();
        if (wireType == WireType.EndGroup) {
          break;
        }
        const field = type.fields.find(fieldNo);
        if (!field) {
          const data = reader.skip(wireType);
          if (options.readUnknownFields) {
            this.onUnknownField(message, fieldNo, wireType, data);
          }
          continue;
        }
        let target = message as any,
          repeated = field.repeated,
          localName = field.localName;
        if (field.oneof) {
          target = target[field.oneof.localName];
          if (target.case != localName) {
            delete target.value;
          }
          target.case = localName;
          localName = "value";
        }
        switch (field.kind) {
          case "scalar":
          case "enum":
            const scalarType =
              field.kind == "enum" ? ScalarType.INT32 : field.T;
            let read = readScalar;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- acceptable since it's covered by tests
            if (field.kind == "scalar" && field.L > 0) {
              read = readScalarLTString;
            }
            if (repeated) {
              let arr = target[localName] as any[]; // safe to assume presence of array, oneof cannot contain repeated values
              if (
                wireType == WireType.LengthDelimited &&
                scalarType != ScalarType.STRING &&
                scalarType != ScalarType.BYTES
              ) {
                let e = reader.uint32() + reader.pos;
                while (reader.pos < e) {
                  arr.push(read(reader, scalarType));
                }
              } else {
                arr.push(read(reader, scalarType));
              }
            } else {
              target[localName] = read(reader, scalarType);
            }
            break;
          case "message":
            const messageType = field.T;
            if (repeated) {
              // safe to assume presence of array, oneof cannot contain repeated values
              (target[localName] as any[]).push(
                readMessageField(reader, new messageType(), options, field),
              );
            } else {
              if (target[localName] instanceof Message) {
                readMessageField(reader, target[localName], options, field);
              } else {
                target[localName] = readMessageField(
                  reader,
                  new messageType(),
                  options,
                  field,
                );
                if (
                  messageType.fieldWrapper &&
                  !field.oneof &&
                  !field.repeated
                ) {
                  target[localName] = messageType.fieldWrapper.unwrapField(
                    target[localName],
                  );
                }
              }
            }
            break;
          case "map":
            let [mapKey, mapVal] = readMapEntry(field, reader, options);
            // safe to assume presence of map object, oneof cannot contain repeated values
            target[localName][mapKey] = mapVal;
            break;
        }
      }
      if (
        delimitedMessageEncoding && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
        (wireType != WireType.EndGroup || fieldNo !== lengthOrEndTagFieldNo)
      ) {
        throw new Error(`invalid end group tag`);
      }
    },
  };
}

// Read a message, avoiding MessageType.fromBinary() to re-use the
// BinaryReadOptions and the IBinaryReader.
function readMessageField<T extends Message>(
  reader: IBinaryReader,
  message: T,
  options: BinaryReadOptions,
  field: { kind: "message"; no: number; delimited?: boolean } | undefined,
): T {
  const format = message.getType().runtime.bin;
  const delimited = field?.delimited;
  format.readMessage(
    message,
    reader,
    delimited ? field?.no : reader.uint32(), // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    options,
    delimited,
  );
  return message;
}

// Read a map field, expecting key field = 1, value field = 2
function readMapEntry(
  field: FieldInfo & { kind: "map" },
  reader: IBinaryReader,
  options: BinaryReadOptions,
): [string | number, any] {
  const length = reader.uint32(),
    end = reader.pos + length;
  let key: any, val: any;
  while (reader.pos < end) {
    let [fieldNo] = reader.tag();
    switch (fieldNo) {
      case 1:
        key = readScalar(reader, field.K);
        break;
      case 2:
        switch (field.V.kind) {
          case "scalar":
            val = readScalar(reader, field.V.T);
            break;
          case "enum":
            val = reader.int32();
            break;
          case "message":
            val = readMessageField(reader, new field.V.T(), options, undefined);
            break;
        }
        break;
    }
  }
  if (key === undefined) {
    let keyRaw = scalarDefaultValue(field.K, LongType.BIGINT);
    key =
      field.K == ScalarType.BOOL
        ? keyRaw.toString()
        : (keyRaw as string | number);
  }
  if (typeof key != "string" && typeof key != "number") {
    key = key.toString();
  }
  if (val === undefined) {
    switch (field.V.kind) {
      case "scalar":
        val = scalarDefaultValue(field.V.T, LongType.BIGINT);
        break;
      case "enum":
        val = 0;
        break;
      case "message":
        val = new field.V.T();
        break;
    }
  }
  return [key, val];
}

// Read a scalar value, but return 64 bit integral types (int64, uint64,
// sint64, fixed64, sfixed64) as string instead of bigint.
export function readScalarLTString(reader: IBinaryReader, type: ScalarType) {
  const v = readScalar(reader, type);
  return typeof v == "bigint" ? v.toString() : v;
}

// Does not use scalarTypeInfo() for better performance.
function readScalar(reader: IBinaryReader, type: ScalarType): any {
  switch (type) {
    case ScalarType.STRING:
      return reader.string();
    case ScalarType.BOOL:
      return reader.bool();
    case ScalarType.DOUBLE:
      return reader.double();
    case ScalarType.FLOAT:
      return reader.float();
    case ScalarType.INT32:
      return reader.int32();
    case ScalarType.INT64:
      return reader.int64();
    case ScalarType.UINT64:
      return reader.uint64();
    case ScalarType.FIXED64:
      return reader.fixed64();
    case ScalarType.BYTES:
      return reader.bytes();
    case ScalarType.FIXED32:
      return reader.fixed32();
    case ScalarType.SFIXED32:
      return reader.sfixed32();
    case ScalarType.SFIXED64:
      return reader.sfixed64();
    case ScalarType.SINT64:
      return reader.sint64();
    case ScalarType.UINT32:
      return reader.uint32();
    case ScalarType.SINT32:
      return reader.sint32();
  }
}

export function writeMapEntry(
  writer: IBinaryWriter,
  options: BinaryWriteOptions,
  field: FieldInfo & { kind: "map" },
  key: any,
  value: any,
): void {
  writer.tag(field.no, WireType.LengthDelimited);
  writer.fork();

  // javascript only allows number or string for object properties
  // we convert from our representation to the protobuf type
  let keyValue = key;
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- we deliberately handle just the special cases for map keys
  switch (field.K) {
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      keyValue = Number.parseInt(key);
      break;
    case ScalarType.BOOL:
      assert(key == "true" || key == "false");
      keyValue = key == "true";
      break;
  }

  // write key, expecting key field number = 1
  writeScalar(writer, field.K, 1, keyValue, true);

  // write value, expecting value field number = 2
  switch (field.V.kind) {
    case "scalar":
      writeScalar(writer, field.V.T, 2, value, true);
      break;
    case "enum":
      writeScalar(writer, ScalarType.INT32, 2, value, true);
      break;
    case "message":
      writer.tag(2, WireType.LengthDelimited).bytes(value.toBinary(options));
      break;
  }

  writer.join();
}

export function writeMessageField(
  writer: IBinaryWriter,
  options: BinaryWriteOptions,
  field: FieldInfo & { kind: "message" },
  value: any,
): void {
  if (value !== undefined) {
    const message = wrapField(field.T, value);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (field?.delimited)
      writer
        .tag(field.no, WireType.StartGroup)
        .raw(message.toBinary(options))
        .tag(field.no, WireType.EndGroup);
    else
      writer
        .tag(field.no, WireType.LengthDelimited)
        .bytes(message.toBinary(options));
  }
}

export function writeScalar(
  writer: IBinaryWriter,
  type: ScalarType,
  fieldNo: number,
  value: any,
  emitIntrinsicDefault: boolean,
): void {
  let [wireType, method, isIntrinsicDefault] = scalarTypeInfo(type, value);
  if (!isIntrinsicDefault || emitIntrinsicDefault) {
    (writer.tag(fieldNo, wireType)[method] as any)(value);
  }
}

export function writePacked(
  writer: IBinaryWriter,
  type: ScalarType,
  fieldNo: number,
  value: any[],
): void {
  if (!value.length) {
    return;
  }
  writer.tag(fieldNo, WireType.LengthDelimited).fork();
  let [, method] = scalarTypeInfo(type);
  for (let i = 0; i < value.length; i++) {
    (writer[method] as any)(value[i]);
  }
  writer.join();
}
