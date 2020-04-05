export const formattedAmount = (value) => {
  const amount = parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  return amount
}