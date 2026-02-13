export const downloadCalendarInvite = () => {
  const event = {
    title: "Valentine's Date 2026 💘",
    description: "The legendary date we agreed to!",
    location: "To be decided...",
    startTime: "20260214T190000",
    endTime: "20260214T220000",
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    `DTSTART:${event.startTime}`,
    `DTEND:${event.endTime}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\n");

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'valentine_2026.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
