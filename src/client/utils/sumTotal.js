export const sumTotal = (array, key, initial = 0) => {
  const total = array.reduce((total, amount) => {
    return Number(total) + Number(amount[key])
  }, initial)
  return total;
}