type Status = "upcoming" | "open" | "closed";

export function getVotingStatus(start_time: string, end_time: string): Status {
  const currentTime = new Date();
  const startTime = new Date(start_time);
  const endTime = new Date(end_time);
  if (currentTime < startTime) {
    return "upcoming";
  } else if (currentTime >= startTime && currentTime <= endTime) {
    return "open";
  } else {
    return "closed";
  }
}