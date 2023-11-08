import {ReferenceObject} from "./ReferenceObject";
import {EncodingObject} from "./EncodingObject";
import {SpecificationExtension} from "./SpecificationExtension";
import {SchemaObject} from "./SchemaObject";
import {ExampleObject} from "./ExampleObject";

export interface MediaTypeObject extends SpecificationExtension {
    schema?: SchemaObject;
    example?: unknown;
    examples?: Record<string, ExampleObject | ReferenceObject>;
    encoding?: Record<string, EncodingObject>;
}
