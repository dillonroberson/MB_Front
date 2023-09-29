export const convertTimestampTodate = (timestamp: number) => {
  return new Date(timestamp);
}

export const typeDate = (date: Date) => {
  return date.toLocaleString('en-GB',{hour12: false})
}