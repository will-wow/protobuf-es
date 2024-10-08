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

// @generated by protoc-gen-es v2.2.0 with parameter "target=ts,import_extension=js,json_types=true"
// @generated from file extra/json_types.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Any, AnyJson, BoolValueJson, BytesValueJson, DoubleValueJson, Duration, DurationJson, Empty, EmptyJson, FieldMask, FieldMaskJson, FloatValueJson, Int32ValueJson, Int64ValueJson, ListValue, ListValueJson, NullValue, NullValueJson, StringValueJson, StructJson, Timestamp, TimestampJson, UInt32ValueJson, UInt64ValueJson, Value, ValueJson } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/json_types.proto.
 */
export const file_extra_json_types: GenFile = /*@__PURE__*/
  fileDesc("ChZleHRyYS9qc29uX3R5cGVzLnByb3RvEgRzcGVjIu4KChBKc29uVHlwZXNNZXNzYWdlEi4KCmJvb2xfZmllbGQYASABKAhSGmJvb2xlYW5GaWVsZFdpdGhDdXN0b21OYW1lEhQKDGRvdWJsZV9maWVsZBgCIAEoARITCgtieXRlc19maWVsZBgDIAEoDBITCgtpbnQ2NF9maWVsZBgEIAEoAxImCgplbnVtX2ZpZWxkGAUgASgOMhIuc3BlYy5Kc29uVHlwZUVudW0SLQoNbWVzc2FnZV9maWVsZBgGIAEoCzIWLnNwZWMuSnNvblR5cGVzTWVzc2FnZRInCglhbnlfZmllbGQYByABKAsyFC5nb29nbGUucHJvdG9idWYuQW55EjEKDmR1cmF0aW9uX2ZpZWxkGAggASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uEisKC2VtcHR5X2ZpZWxkGAkgASgLMhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5EjQKEGZpZWxkX21hc2tfZmllbGQYCiABKAsyGi5nb29nbGUucHJvdG9idWYuRmllbGRNYXNrEi0KDHN0cnVjdF9maWVsZBgLIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QSKwoLdmFsdWVfZmllbGQYDCABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWUSNAoQbGlzdF92YWx1ZV9maWVsZBgNIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5MaXN0VmFsdWUSNAoQbnVsbF92YWx1ZV9maWVsZBgOIAEoDjIaLmdvb2dsZS5wcm90b2J1Zi5OdWxsVmFsdWUSMwoPdGltZXN0YW1wX2ZpZWxkGA8gASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBI6ChR3cmFwcGVkX2RvdWJsZV9maWVsZBgQIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5Eb3VibGVWYWx1ZRI4ChN3cmFwcGVkX2Zsb2F0X2ZpZWxkGBEgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkZsb2F0VmFsdWUSOAoTd3JhcHBlZF9pbnQ2NF9maWVsZBgSIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlEjoKFHdyYXBwZWRfdWludDY0X2ZpZWxkGBMgASgLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQ2NFZhbHVlEjgKE3dyYXBwZWRfaW50MzJfZmllbGQYFCABKAsyGy5nb29nbGUucHJvdG9idWYuSW50MzJWYWx1ZRI6ChR3cmFwcGVkX3VpbnQzMl9maWVsZBgVIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRI2ChJ3cmFwcGVkX2Jvb2xfZmllbGQYFiABKAsyGi5nb29nbGUucHJvdG9idWYuQm9vbFZhbHVlEjoKFHdyYXBwZWRfc3RyaW5nX2ZpZWxkGBcgASgLMhwuZ29vZ2xlLnByb3RvYnVmLlN0cmluZ1ZhbHVlEjgKE3dyYXBwZWRfYnl0ZXNfZmllbGQYGCABKAsyGy5nb29nbGUucHJvdG9idWYuQnl0ZXNWYWx1ZRIvChNyZXBlYXRlZF9lbnVtX2ZpZWxkGBkgAygOMhIuc3BlYy5Kc29uVHlwZUVudW0SSQoTbWFwX2Jvb2xfZW51bV9maWVsZBgaIAMoCzIsLnNwZWMuSnNvblR5cGVzTWVzc2FnZS5NYXBCb29sRW51bUZpZWxkRW50cnkaSwoVTWFwQm9vbEVudW1GaWVsZEVudHJ5EgsKA2tleRgBIAEoCBIhCgV2YWx1ZRgCIAEoDjISLnNwZWMuSnNvblR5cGVFbnVtOgI4ASpdCgxKc29uVHlwZUVudW0SHgoaSlNPTl9UWVBFX0VOVU1fVU5TUEVDSUZJRUQQABIWChJKU09OX1RZUEVfRU5VTV9ZRVMQARIVChFKU09OX1RZUEVfRU5VTV9OTxACYgZwcm90bzM", [file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers]);

/**
 * @generated from message spec.JsonTypesMessage
 */
export type JsonTypesMessage = Message<"spec.JsonTypesMessage"> & {
  /**
   * @generated from field: bool bool_field = 1 [json_name = "booleanFieldWithCustomName"];
   */
  boolField: boolean;

  /**
   * @generated from field: double double_field = 2;
   */
  doubleField: number;

  /**
   * @generated from field: bytes bytes_field = 3;
   */
  bytesField: Uint8Array;

  /**
   * @generated from field: int64 int64_field = 4;
   */
  int64Field: bigint;

  /**
   * @generated from field: spec.JsonTypeEnum enum_field = 5;
   */
  enumField: JsonTypeEnum;

  /**
   * @generated from field: spec.JsonTypesMessage message_field = 6;
   */
  messageField?: JsonTypesMessage;

  /**
   * @generated from field: google.protobuf.Any any_field = 7;
   */
  anyField?: Any;

  /**
   * @generated from field: google.protobuf.Duration duration_field = 8;
   */
  durationField?: Duration;

  /**
   * @generated from field: google.protobuf.Empty empty_field = 9;
   */
  emptyField?: Empty;

  /**
   * @generated from field: google.protobuf.FieldMask field_mask_field = 10;
   */
  fieldMaskField?: FieldMask;

  /**
   * @generated from field: google.protobuf.Struct struct_field = 11;
   */
  structField?: JsonObject;

  /**
   * @generated from field: google.protobuf.Value value_field = 12;
   */
  valueField?: Value;

  /**
   * @generated from field: google.protobuf.ListValue list_value_field = 13;
   */
  listValueField?: ListValue;

  /**
   * @generated from field: google.protobuf.NullValue null_value_field = 14;
   */
  nullValueField: NullValue;

  /**
   * @generated from field: google.protobuf.Timestamp timestamp_field = 15;
   */
  timestampField?: Timestamp;

  /**
   * @generated from field: google.protobuf.DoubleValue wrapped_double_field = 16;
   */
  wrappedDoubleField?: number;

  /**
   * @generated from field: google.protobuf.FloatValue wrapped_float_field = 17;
   */
  wrappedFloatField?: number;

  /**
   * @generated from field: google.protobuf.Int64Value wrapped_int64_field = 18;
   */
  wrappedInt64Field?: bigint;

  /**
   * @generated from field: google.protobuf.UInt64Value wrapped_uint64_field = 19;
   */
  wrappedUint64Field?: bigint;

  /**
   * @generated from field: google.protobuf.Int32Value wrapped_int32_field = 20;
   */
  wrappedInt32Field?: number;

  /**
   * @generated from field: google.protobuf.UInt32Value wrapped_uint32_field = 21;
   */
  wrappedUint32Field?: number;

  /**
   * @generated from field: google.protobuf.BoolValue wrapped_bool_field = 22;
   */
  wrappedBoolField?: boolean;

  /**
   * @generated from field: google.protobuf.StringValue wrapped_string_field = 23;
   */
  wrappedStringField?: string;

  /**
   * @generated from field: google.protobuf.BytesValue wrapped_bytes_field = 24;
   */
  wrappedBytesField?: Uint8Array;

  /**
   * @generated from field: repeated spec.JsonTypeEnum repeated_enum_field = 25;
   */
  repeatedEnumField: JsonTypeEnum[];

  /**
   * @generated from field: map<bool, spec.JsonTypeEnum> map_bool_enum_field = 26;
   */
  mapBoolEnumField: { [key: string]: JsonTypeEnum };
};

/**
 * @generated from message spec.JsonTypesMessage
 */
export type JsonTypesMessageJson = {
  /**
   * @generated from field: bool bool_field = 1 [json_name = "booleanFieldWithCustomName"];
   */
  booleanFieldWithCustomName?: boolean;

  /**
   * @generated from field: double double_field = 2;
   */
  doubleField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: bytes bytes_field = 3;
   */
  bytesField?: string;

  /**
   * @generated from field: int64 int64_field = 4;
   */
  int64Field?: string;

  /**
   * @generated from field: spec.JsonTypeEnum enum_field = 5;
   */
  enumField?: JsonTypeEnumJson;

  /**
   * @generated from field: spec.JsonTypesMessage message_field = 6;
   */
  messageField?: JsonTypesMessageJson;

  /**
   * @generated from field: google.protobuf.Any any_field = 7;
   */
  anyField?: AnyJson;

  /**
   * @generated from field: google.protobuf.Duration duration_field = 8;
   */
  durationField?: DurationJson;

  /**
   * @generated from field: google.protobuf.Empty empty_field = 9;
   */
  emptyField?: EmptyJson;

  /**
   * @generated from field: google.protobuf.FieldMask field_mask_field = 10;
   */
  fieldMaskField?: FieldMaskJson;

  /**
   * @generated from field: google.protobuf.Struct struct_field = 11;
   */
  structField?: StructJson;

  /**
   * @generated from field: google.protobuf.Value value_field = 12;
   */
  valueField?: ValueJson;

  /**
   * @generated from field: google.protobuf.ListValue list_value_field = 13;
   */
  listValueField?: ListValueJson;

  /**
   * @generated from field: google.protobuf.NullValue null_value_field = 14;
   */
  nullValueField?: NullValueJson;

  /**
   * @generated from field: google.protobuf.Timestamp timestamp_field = 15;
   */
  timestampField?: TimestampJson;

  /**
   * @generated from field: google.protobuf.DoubleValue wrapped_double_field = 16;
   */
  wrappedDoubleField?: DoubleValueJson;

  /**
   * @generated from field: google.protobuf.FloatValue wrapped_float_field = 17;
   */
  wrappedFloatField?: FloatValueJson;

  /**
   * @generated from field: google.protobuf.Int64Value wrapped_int64_field = 18;
   */
  wrappedInt64Field?: Int64ValueJson;

  /**
   * @generated from field: google.protobuf.UInt64Value wrapped_uint64_field = 19;
   */
  wrappedUint64Field?: UInt64ValueJson;

  /**
   * @generated from field: google.protobuf.Int32Value wrapped_int32_field = 20;
   */
  wrappedInt32Field?: Int32ValueJson;

  /**
   * @generated from field: google.protobuf.UInt32Value wrapped_uint32_field = 21;
   */
  wrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: google.protobuf.BoolValue wrapped_bool_field = 22;
   */
  wrappedBoolField?: BoolValueJson;

  /**
   * @generated from field: google.protobuf.StringValue wrapped_string_field = 23;
   */
  wrappedStringField?: StringValueJson;

  /**
   * @generated from field: google.protobuf.BytesValue wrapped_bytes_field = 24;
   */
  wrappedBytesField?: BytesValueJson;

  /**
   * @generated from field: repeated spec.JsonTypeEnum repeated_enum_field = 25;
   */
  repeatedEnumField?: JsonTypeEnumJson[];

  /**
   * @generated from field: map<bool, spec.JsonTypeEnum> map_bool_enum_field = 26;
   */
  mapBoolEnumField?: { [key: string]: JsonTypeEnumJson };
};

/**
 * Describes the message spec.JsonTypesMessage.
 * Use `create(JsonTypesMessageSchema)` to create a new message.
 */
export const JsonTypesMessageSchema: GenMessage<JsonTypesMessage, JsonTypesMessageJson> = /*@__PURE__*/
  messageDesc(file_extra_json_types, 0);

/**
 * @generated from enum spec.JsonTypeEnum
 */
export enum JsonTypeEnum {
  /**
   * @generated from enum value: JSON_TYPE_ENUM_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: JSON_TYPE_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: JSON_TYPE_ENUM_NO = 2;
   */
  NO = 2,
}

/**
 * @generated from enum spec.JsonTypeEnum
 */
export type JsonTypeEnumJson = "JSON_TYPE_ENUM_UNSPECIFIED" | "JSON_TYPE_ENUM_YES" | "JSON_TYPE_ENUM_NO";

/**
 * Describes the enum spec.JsonTypeEnum.
 */
export const JsonTypeEnumSchema: GenEnum<JsonTypeEnum, JsonTypeEnumJson> = /*@__PURE__*/
  enumDesc(file_extra_json_types, 0);
