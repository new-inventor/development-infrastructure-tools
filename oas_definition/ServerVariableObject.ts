import {SpecificationExtension} from "./SpecificationExtension";

export interface ServerVariableObject extends SpecificationExtension {
    enum?: string[];
    default: string;
    description?: string;
}
