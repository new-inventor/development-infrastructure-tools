import {ServerObject} from "./ServerObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface LinkObject extends SpecificationExtension {
    operationRef?: string;
    operationId?: string;
    parameters?: Record<string, string>;
    requestBody?: unknown | string;
    description?: string;
    server?: ServerObject;
}
