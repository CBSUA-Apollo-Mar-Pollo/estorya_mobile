import { formatDistanceToNowStrict } from "date-fns";
import { format, isSameMonth } from "date-fns";
import locale from "date-fns/locale/en-US";

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token, count, options) {
  options = options || {};

  const result = formatDistanceLocale[token].replace(
    "{{count}}",
    count.toString()
  );

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result;
    }
  }

  return result;
}

export function formatTimeToNow(date) {
  const now = new Date();

  if (isSameMonth(date, now)) {
    // If the date is in the same month, use the standard distance formatting
    return formatDistanceToNowStrict(date, {
      addSuffix: true,
      locale: {
        ...locale,
        formatDistance,
      },
    });
  } else {
    // If more than a month has passed, format the date to display the month it was created
    return format(date, "MMMM d, yyyy");
  }
}
