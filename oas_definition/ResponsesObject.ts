import {ReferenceObject} from "./ReferenceObject";
import {HTTPStatusCodesStr} from "./HTTPStatusCodes";
import {ResponseObject} from "./ResponseObject";
import {SpecificationExtension} from "./SpecificationExtension";

export type ResponsesObject = {
    [Prop in HTTPStatusCodesStr]?: ResponseObject | ReferenceObject;
} & {
    default?: ResponseObject | ReferenceObject;
} & SpecificationExtension
