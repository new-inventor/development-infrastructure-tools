import {PathItemObject} from "./PathItemObject";
import {ReferenceObject} from "./ReferenceObject";
import {SpecificationExtension} from "./SpecificationExtension";

export type CallbackObject = Record<string, PathItemObject | ReferenceObject> & SpecificationExtension;
