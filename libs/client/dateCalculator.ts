export function dateCalculator(input: Date) {
  if (input === undefined) return "";
  const current = new Date();
  const date = new Date(input);
  const yearGap = current.getFullYear() - date.getFullYear();
  const monthGap = current.getMonth() - date.getMonth();
  const dayGap = current.getDate() - date.getDate();
  const hourGap = current.getHours() - date.getHours();
  const minGap = current.getMinutes() - date.getMinutes();

  if (yearGap > 0) return yearGap + "년 전";
  else if (monthGap > 0) return monthGap + "달 전";
  else if (dayGap > 0) {
    const weekGap = Math.floor(dayGap / 7);
    if (weekGap >= 1) return weekGap + "주 전";
    else return dayGap + "일 전";
  } else if (hourGap > 0) return hourGap + "시간 전";
  else if (minGap > 0) return minGap + "분 전";
  else return "방금 전";
}
