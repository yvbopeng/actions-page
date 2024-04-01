export function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

export function isString(str) {
  return typeof str === 'string'
}