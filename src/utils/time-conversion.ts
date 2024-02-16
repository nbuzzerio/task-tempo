// Convert HH:mm:ss to total seconds
export const hhmmssToSeconds = (time: string) => {
  let parts = time.split(":");
  if (parts.length === 1) parts = ["00", "00", ...parts];
  if (parts.length === 2) parts = ["00", ...parts];
  return Number(parts[0]) * 3600 + Number(parts[1]) * 60 + Number(parts[2]);
};

// Convert total seconds to HH:mm:ss
export const secondsToHhmmss = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
