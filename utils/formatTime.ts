const formatTime = (timestamp: string) => {
  const dateObject = new Date(timestamp);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const month = months[dateObject.getUTCMonth()];

  const day = dateObject.getUTCDate();
  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  }

  const year = dateObject.getUTCFullYear();

  let hours = dateObject.getUTCHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const minutes = String(dateObject.getUTCMinutes()).padStart(2, "0");

  const formattedDate = `${month} ${day}${suffix} ${year}, ${hours}:${minutes} ${ampm} UTC`;

  return formattedDate;
};

export default formatTime;
