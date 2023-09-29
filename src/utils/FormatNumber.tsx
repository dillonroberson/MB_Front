export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("de-DE").format(number)
}
