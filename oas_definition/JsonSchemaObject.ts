export type AnyJsonType =
    | null
    | boolean
    | string
    | number
    | { [key: string]: AnyJsonType }
    | AnyJsonType[];

export type JsonValueType = 'null' | 'boolean' | 'number' | 'string' | 'object' | 'array' | 'integer'
export type JsonValueTypes = JsonValueType[];
export type JsonValueTypeRest<T extends JsonValueType> = Exclude<JsonValueType, T>;
export type JsonValueTypesRest<T extends JsonValueType> = JsonValueTypeRest<T>[];
export type JsonValueTypesFixed<T extends JsonValueType> =
    | [T, ...JsonValueTypesRest<T>]
    | [JsonValueTypeRest<T>, T, ...JsonValueTypesRest<T>]
    | [JsonValueTypeRest<T>, JsonValueTypeRest<T>, T, ...JsonValueTypesRest<T>]
    | [JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, T, ...JsonValueTypesRest<T>]
    | [JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, T, ...JsonValueTypesRest<T>]
    | [JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, T, ...JsonValueTypesRest<T>]
    | [JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, JsonValueTypeRest<T>, T, ...JsonValueTypesRest<T>]

export interface JsonSchemaValidationMetadata {
    title?: string;
    description?: string;
    default?: AnyJsonType;
    deprecated?: boolean;
    readOnly?: boolean;
    writeOnly?: boolean;
    examples?: AnyJsonType[];
}

export interface JsonSchemaEnumValidation extends JsonSchemaValidationMetadata {
    type?: never;
    enum: AnyJsonType[];
    const?: never;
}
export interface JsonSchemaConstValidation extends JsonSchemaValidationMetadata {
    type?: never;
    enum?: never;
    const: AnyJsonType;
}
export interface JsonSchemaTypeValidation extends JsonSchemaValidationMetadata {
    type: JsonValueType | JsonValueTypes;
    enum?: never;
    const?: never;
}

export interface JsonSchemaNumericValidation extends JsonSchemaTypeValidation {
    type: 'number' | 'integer' | JsonValueTypesFixed<'number' | 'integer'>;
    multiplyOf?: number; // > 0
    maximum?: number; // <= x
    exclusiveMaximum?: number; // <x
    minimum?: number;// >= x
    exclusiveMinimum?: number; // > x
}

export type StringSchemaFormat = 'date-time' | 'date' | 'full-date' | 'time' | 'full-time' | 'duration' | 'email' | 'idn-email' | 'hostname' | 'idn-hostname' | 'ipv4' | 'ipv6' | 'uri' | 'uri-reference' | 'iri' | 'iri-reference' | 'uuid' | 'uri-template' | 'json-pointer' | 'relative-json-pointer' | 'regex';
export interface JsonSchemaStringValidation extends JsonSchemaTypeValidation {
    type: 'string' | JsonValueTypesFixed<'string'>;
    format?: StringSchemaFormat,
    contentEncoding?: 'base64' | 'base32' | 'base32hex' | 'base16';
    contentMediaType?: string;
    contentSchema?: JsonSubSchema;
    minLength?: number; // >=0; >= l
    maxLength?: number; // >=0; <= l
    pattern?: string; // ecma-262
}

export interface JsonSchemaArrayValidation extends JsonSchemaTypeValidation {
    type: 'array' | JsonValueTypesFixed<'array'>;
    maxItems?: number;// >=0; <= l
    minItems?: number;// >=0; >= l
    uniqueItems?: boolean;
    maxContains?: number;// >=0;
    minContains?: number;// >=0;
}

export interface JsonSchemaObjectValidation extends JsonSchemaTypeValidation {
    type: 'object' | JsonValueTypesFixed<'object'>;
    maxProperties?: number;// >=0; <= l
    minProperties?: number;// >=0; >= l
    required?: string[];
    dependentRequired?: Record<string, string[]>;
}

export type JsonSchemaValidation =
    | JsonSchemaEnumValidation
    | JsonSchemaConstValidation
    | JsonSchemaTypeValidation
    | JsonSchemaNumericValidation
    | JsonSchemaStringValidation
    | JsonSchemaArrayValidation
    | JsonSchemaObjectValidation;


export interface JsonSubSchemaObject<T> {
    $id?: string;
    $anchor?: string;
    $dynamicAnchor?: string;
    $ref?: string;
    $dynamicRef?: string;
    $defs?: {
        [key: string]: T;
    }
    $comment?: string;
    allOf?: T[];
    oneOf?: T[];
    anyOf?: T[];
    not?: T;
    if?: T;
    then?: T;
    else?: T;
    dependentSchemas?: Record<string, T>;
    items?: T;
    prefixItems?: T[];
    contains?: T;
    properties?: Record<string, T>;
    patternProperties?: Record<string, T>;
    additionalProperties?: T;
    propertyNames?: T;
    unevaluatedItems?: T;
    unevaluatedProperties?: T;
}

export type JsonSubSchema = JsonSubSchemaObject<JsonSubSchema> | boolean | (JsonSubSchemaObject<JsonSubSchema> & JsonSchemaValidation);

export type JsonRootSchemaObject = {
    $schema?: string;
    $vocabulary?: Record<string, boolean>;
} & (JsonSubSchemaObject<JsonSubSchema> | (JsonSubSchemaObject<JsonSubSchema> & JsonSchemaValidation)) | boolean;
