/**
 * deep merge newObj to target object
 * @template T
 * @param {T} targetObject target object
 * @param {T} newObj will be merged to target object
 * @returns {T}
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
