import {PathItemObject} from "./PathItemObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface PathsObject extends SpecificationExtension {
    [key: `/${string}`]: PathItemObject;
}
