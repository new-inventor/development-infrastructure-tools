import {ExternalDocumentationObject} from "./ExternalDocumentationObject";
import {ReferenceObject} from "./ReferenceObject";
import {ServerObject} from "./ServerObject";
import {ParameterObject} from "./ParameterObject";
import {RequestBodyObject} from "./RequestBodyObject";
import {ResponsesObject} from "./ResponsesObject";
import {CallbackObject} from "./CallbackObject";
import {SecurityRequirementObject} from "./SecurityRequirementObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface OperationObject extends SpecificationExtension {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
    operationId?: string; // Case-sensitive
    parameters?: (ParameterObject | ReferenceObject)[];
    requestBody?: RequestBodyObject | ReferenceObject;
    responses?: ResponsesObject;
    callbacks?: Record<string, CallbackObject | ReferenceObject>;
    deprecated?: boolean;
    security?: SecurityRequirementObject[];
    servers?: ServerObject[];
}
