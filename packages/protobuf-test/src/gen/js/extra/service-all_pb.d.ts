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

// @generated by protoc-gen-es v2.2.0 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/service-all.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenFile, GenService } from "@bufbuild/protobuf/codegenv1";
import type { Int32ValueSchema, StringValueSchema } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/service-all.proto.
 */
export declare const file_extra_service_all: GenFile;

/**
 * @generated from service spec.ServiceAll
 */
export declare const ServiceAll: GenService<{
  /**
   * @generated from rpc spec.ServiceAll.Unary
   */
  unary: {
    methodKind: "unary";
    input: typeof StringValueSchema;
    output: typeof Int32ValueSchema;
  },
  /**
   * @generated from rpc spec.ServiceAll.ServerStream
   */
  serverStream: {
    methodKind: "server_streaming";
    input: typeof StringValueSchema;
    output: typeof Int32ValueSchema;
  },
  /**
   * @generated from rpc spec.ServiceAll.ClientStream
   */
  clientStream: {
    methodKind: "client_streaming";
    input: typeof StringValueSchema;
    output: typeof Int32ValueSchema;
  },
  /**
   * @generated from rpc spec.ServiceAll.Bidi
   * @deprecated
   */
  bidi: {
    methodKind: "bidi_streaming";
    input: typeof StringValueSchema;
    output: typeof Int32ValueSchema;
  },
}>;
