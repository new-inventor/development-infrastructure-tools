import {ReferenceObject} from "./ReferenceObject";
import {ExampleObject} from "./ExampleObject";
import {SchemaObject} from "./SchemaObject";

export interface HeaderObject {
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    style?: 'simple';
    explode?: boolean;
    allowReserved?: boolean;
    schema: SchemaObject;
    example?: unknown;
    examples?: Record<string, ExampleObject | ReferenceObject>;
}
