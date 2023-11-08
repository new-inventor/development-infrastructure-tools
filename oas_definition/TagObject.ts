import {ExternalDocumentationObject} from "./ExternalDocumentationObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface TagObject extends SpecificationExtension {
    name: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
}
