const validatePhoneNumber = (phone: string): boolean => {
  const regex = /^010\d{8}$/;
  return regex.test(phone);
};

export default validatePhoneNumber;
