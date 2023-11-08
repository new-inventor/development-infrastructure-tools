import {ServerVariableObject} from "./ServerVariableObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface ServerObject extends SpecificationExtension {
    url: string;
    description?: string;
    variables?: Record<string, ServerVariableObject>;
}
