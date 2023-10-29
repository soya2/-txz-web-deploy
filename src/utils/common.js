/**
 * deep merge newObj to target object
 * @param {Object} targetObject target object
 * @param {Object} newObj will be merged to target object
 * @returns {Object}
 */
export function deepMerge(targetObject, newObj) {
  const mergedObject = {...targetObject};
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (Array.isArray(newObj[key])) {
        mergedObject[key] = newObj[key];
      } else if (
        newObj[key] instanceof Object &&
        newObj[key] !== null &&
        targetObject[key] instanceof Object &&
        targetObject[key] !== null
      ) {
        mergedObject[key] = deepMerge(targetObject[key], newObj[key]);
      } else {
        mergedObject[key] = newObj[key];
      }
    }
  }
  return mergedObject;
}
