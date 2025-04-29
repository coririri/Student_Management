export const dateTimeToDateAndZeroTimes = (dateTimeString: Date): string => {
  // 월 이름과 숫자 매핑
  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const monthEng = dateTimeString.toString().split(" ")[1] as
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec";

  const utcDate = new Date(
    Date.UTC(
      Number(dateTimeString.toString().split(" ")[3]),
      Number(monthMap[monthEng]),
      Number(dateTimeString.toString().split(" ")[2])
    )
  ); // UTC로 설정

  // 연, 월, 일 추출
  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(utcDate.getDate()).padStart(2, "0");

  // 원하는 형식으로 문자열 생성
  const formattedDateTime = `${year}-${month}-${day} 18:32:03`;

  return formattedDateTime; // 예: "2024-09-03 09:42:32"
};
