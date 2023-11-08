import {MediaTypeObject} from "./MediaTypeObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface RequestBodyObject extends SpecificationExtension {
    description?: string;
    content: Record<string, MediaTypeObject>;
    required?: boolean;
}
