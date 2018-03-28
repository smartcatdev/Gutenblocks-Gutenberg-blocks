export const resizeArray = (arr, size, fill = undefined) => {
  if (size <= arr.length) {
    return arr.slice(0, size)
  }
  let clone = [...arr]
  for (let ctr = arr.length; ctr < size; ctr++) {
    clone[ctr] = { ...fill }
  }
  return clone
}