import {OAuthFlowObject} from "./OAuthFlowObject";
import {SpecificationExtension} from "./SpecificationExtension";

export interface OAuthFlowsObject extends SpecificationExtension {
    implicit?: OAuthFlowObject;
    password?: OAuthFlowObject;
    clientCredentials?: OAuthFlowObject;
    authorizationCode?: OAuthFlowObject;
}
