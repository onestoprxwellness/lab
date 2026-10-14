export const toInternationalPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, '');
};
