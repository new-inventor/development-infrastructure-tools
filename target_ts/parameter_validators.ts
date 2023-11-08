export const validateServerParamsEnum = (values: string[]) => (value: string) => {
  return values.includes(value);
}



export const checkEnums = (entryPointConfig: Record<string, string>, enums: Record<string, string[]>) => {
  for(const field in enums) {
    if(!enums[field].includes(entryPointConfig[field])) {
      return false;
    }
  }
  return true;
}
