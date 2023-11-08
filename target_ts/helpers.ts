export const fromNullObject = (...objects: unknown[]): unknown => {
  // noinspection TypeScriptValidateTypes
  return Object.assign(Object.create(null), ...objects);
}

export const replacePlaceholders = (str: string, variables: Record<string, string>) => {
  let resultStr = str;
  for(const varName in variables) {
    resultStr = resultStr.replaceAll(`{${varName}}`, variables[varName]);
  }
  return resultStr;
}
