function flattenJson(obj: any): any {
    if (obj === null || obj === undefined) {
        return {};
    }

    const flattened: any = {};
  
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        const nested = flattenJson(obj[key]);
        Object.keys(nested).forEach(nestedKey => {
          flattened[`${nestedKey}`] = nested[nestedKey];
        });
      } else {
        flattened[key] = obj[key];
      }
    });
  
    return flattened;
  }
 
export { flattenJson }