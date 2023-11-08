import {SpecificationExtension} from "./SpecificationExtension";

export interface DiscriminatorObject extends SpecificationExtension {
    propertyName: string;
    mapping?: Record<string, string>;
}
