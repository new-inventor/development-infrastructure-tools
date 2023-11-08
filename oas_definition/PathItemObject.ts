import {ServerObject} from "./ServerObject";
import {ReferenceObject} from "./ReferenceObject";
import {OperationObject} from "./OperationObject";
import {ParameterObject} from "./ParameterObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface PathItemObject extends SpecificationExtension {
    $ref?: string;
    summary?: string;
    description?: string;
    get?: OperationObject;
    put?: OperationObject;
    post?: OperationObject;
    delete?: OperationObject;
    options?: OperationObject;
    head?: OperationObject;
    patch?: OperationObject;
    trace?: OperationObject;
    servers?: ServerObject[];
    parameters?: ParameterObject | ReferenceObject;
}
