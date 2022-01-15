/**
 * Given a Comunica response, transforms it into an array of values: 
 * strings for singular responses and objects for multiple keys.
 * 
 * @param response 
 * @returns 
 */
export const bindingsToObjects = async (response) => {
  const bindings = await response.bindings()

  const result = []
  for (const binding of bindings) {
      let item = {}

      for (const variable of response.variables) {
          if (response.variables.length === 1) item = binding.get(variable)?.value
          else item[variable.substr(1)] = binding.get(variable)?.value
      }

      result.push(item)
  }

  return result
}