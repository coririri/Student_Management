export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, ""); // 숫자만 남기기

  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else {
    return phone; // 잘못된 길이일 경우 원본 그대로 반환
  }
};
