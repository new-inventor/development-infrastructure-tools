import {fromNullObject, replacePlaceholders} from "./helpers";
import {create} from "./main/employee";
import {checkEnums} from "./parameter_validators";

const apiEntryPoints = {
  main: {
    url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
    enums: {
      port: ['8443', '443'],
    },
    defaults: {
      username: 'demo',
      port: '8443',
      basePath: 'v2',
    }
  },
  some: 'https://google.com',
}

const getAuthToken = () => {
  return 'sdfsdfsdf';
}

const createApi = (entryPointName: string, entryPointConfig: Record<string, string> = fromNullObject() as Record<string, string>) => {
  const normalizedConfig = fromNullObject(apiEntryPoints[entryPointName].defaults || fromNullObject(), entryPointConfig) as Record<string, string>;
  const normalizedUrl = typeof apiEntryPoints[entryPointName] === 'string' ? apiEntryPoints[entryPointName] : apiEntryPoints[entryPointName].url;
  const isEnumsValid = checkEnums(normalizedConfig, apiEntryPoints[entryPointName].enums);
  if(!isEnumsValid) {
    throw new Error('One ore more enums in server variables are invalid.')
  }
  const baseUrl = replacePlaceholders(normalizedUrl, normalizedConfig);
  return {
    baseUrl,
    main: {
      employee: create(baseUrl, getAuthToken),
    }
  }
}

console.log(
  'api',
  createApi('main', {
    username: 'some',
    port: '443',
    basePath: 'asd/qwe/qwe'
  }),
);
