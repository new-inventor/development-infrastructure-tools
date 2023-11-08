import {PathItemObject} from "./PathItemObject";
import {ReferenceObject} from "./ReferenceObject";
import {ParameterObject} from "./ParameterObject";
import {RequestBodyObject} from "./RequestBodyObject";
import {ResponseObject} from "./ResponseObject";
import {ExampleObject} from "./ExampleObject";
import {LinkObject} from "./LinkObject";
import {HeaderObject} from "./HeaderObject";
import {CallbackObject} from "./CallbackObject";
import {SpecificationExtension} from "./SpecificationExtension";
import {SecuritySchemeObject} from "./SecuritySchemeObject";
import {SchemaObject} from "./SchemaObject";

export interface ComponentsObject extends SpecificationExtension {
    schemas?: Record<string, SchemaObject>;
    responses?: Record<string, ResponseObject | ReferenceObject>;
    parameters?: Record<string, ParameterObject | ReferenceObject>;
    examples?: Record<string, ExampleObject | ReferenceObject>;
    requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
    headers?: Record<string, HeaderObject | ReferenceObject>;
    securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
    links?: Record<string, LinkObject | ReferenceObject>;
    callbacks?: Record<string, CallbackObject | ReferenceObject>;
    pathItems?: Record<string, PathItemObject | ReferenceObject>;
}
