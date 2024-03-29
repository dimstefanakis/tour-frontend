export default function getFormattedDate(date: Date) {
  // Add leading zeros to date and month
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`.split("T")[0];
}
