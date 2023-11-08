import {ReferenceObject} from "./ReferenceObject";
import {MediaTypeObject} from "./MediaTypeObject";
import {ExampleObject} from "./ExampleObject";
import {SchemaObject} from "./SchemaObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface BaseParameterObject extends SpecificationExtension {
    name: string;
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
}

export interface QueryParameterObject extends BaseParameterObject {
    in: 'query';
}

export interface HeaderParameterObject extends BaseParameterObject {
    in: 'header';
}

export interface CookieParameterObject extends BaseParameterObject {
    in: 'cookie';
}

export interface PathParameterObject extends BaseParameterObject {
    in: 'path';
    required: true;
}

export interface ParameterWithScheme {
    content?: never;
    explode?: boolean;
    allowReserved?: boolean;
    schema: SchemaObject;
    example?: unknown;
    examples?: Record<string, ExampleObject | ReferenceObject>;
}

export interface PathParameterWithScheme extends ParameterWithScheme {
    style?: 'matrix' | 'label' | 'simple';
}

export interface QueryParameterWithScheme extends ParameterWithScheme {
    style?: 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
}

export interface HeaderParameterWithScheme extends ParameterWithScheme {
    style?: 'simple';
}

export interface CookieParameterWithScheme extends ParameterWithScheme {
    style?: 'form';
}

export interface ParameterWithContent {
    content: Record<string, MediaTypeObject>;
    style?: never;
    schema?: never;
}

export type ParameterObject =
    | (PathParameterObject & PathParameterWithScheme)
    | (PathParameterObject & ParameterWithContent)
    | (QueryParameterObject & QueryParameterWithScheme)
    | (QueryParameterObject & ParameterWithContent)
    | (HeaderParameterObject & HeaderParameterWithScheme)
    | (HeaderParameterObject & ParameterWithContent)
    | (CookieParameterObject & CookieParameterWithScheme)
    | (CookieParameterObject & ParameterWithContent);
