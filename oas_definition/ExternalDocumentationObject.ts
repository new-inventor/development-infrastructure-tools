import {SpecificationExtension} from "./SpecificationExtension";

export interface ExternalDocumentationObject extends SpecificationExtension {
    description?: string;
    url: string;
}
