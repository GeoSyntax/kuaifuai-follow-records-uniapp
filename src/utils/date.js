function pad(value) {
  return String(value).padStart(2, "0");
}

export function formatShortDate(value) {
  if (!value) return "未安排";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未安排";
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatFullDate(value) {
  if (!value) return "未安排";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未安排";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function getDefaultNextDateParts(value) {
  const date = value ? new Date(value) : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  if (Number.isNaN(date.getTime())) {
    return {
      date: "",
      time: "",
    };
  }

  return {
    date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
  };
}

export function combineDateTime(date, time) {
  if (!date || !time) return "";
  return `${date}T${time}:00`;
}
