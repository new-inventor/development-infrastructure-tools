import {
    JsonSchemaArrayValidation,
    JsonSchemaConstValidation,
    JsonSchemaEnumValidation,
    JsonSchemaNumericValidation, JsonSchemaObjectValidation,
    JsonSchemaStringValidation, JsonSchemaTypeValidation,
    JsonSubSchemaObject,
    StringSchemaFormat
} from "./JsonSchemaObject";
import {ExternalDocumentationObject} from "./ExternalDocumentationObject";
import {DiscriminatorObject} from "./DiscriminatorObject";
import {XmlObject} from "./XmlObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface SchemaStringValidation extends Omit<JsonSchemaStringValidation, 'format'> {
    format?: StringSchemaFormat | 'password' | 'binary' | string;
}

export interface SchemaNumericValidation extends Omit<JsonSchemaNumericValidation, 'format'> {
    format?: 'int32' | 'int64' | 'float' | 'double' | string;
}

export interface SchemaObjectBase extends JsonSubSchemaObject<SchemaObject>, SpecificationExtension  {
    discriminator?: DiscriminatorObject;
    xml?: XmlObject;
    externalDocs?: ExternalDocumentationObject;
    example?: unknown; //deprecated
}

export type JsonSchemaValidationObject =
    | JsonSchemaEnumValidation
    | JsonSchemaConstValidation
    | JsonSchemaTypeValidation
    | SchemaNumericValidation
    | SchemaStringValidation
    | JsonSchemaArrayValidation
    | JsonSchemaObjectValidation;

export type SchemaObject = SchemaObjectBase | SchemaObjectBase & JsonSchemaValidationObject;
