//takes SQL formatted date and converts it to readable date
export const dateFixer = (SqlDate) => {
  let humanDate;
  if (SqlDate !== null) {
    const date = new Date(SqlDate);
    humanDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
  }

  return humanDate
}
