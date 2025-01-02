export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const isNotEmpty = (value) => {
  return value.trim() !== '';
};

export const isFutureDate = (date) => {
  const today = new Date();
  return new Date(date) > today;
};

export const isNotPastDate = (date) => {
  const today = new Date();
  return new Date(date) >= today;
};

export const isValidDateFormat = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
  return dateRegex.test(date);
};

export const isValidCompanyName = (companyName) => {
  return companyName.trim().length >= 3;
};

export const isValidCommunicationMethod = (method) => {
  const validMethods = ['LinkedIn Post', 'LinkedIn Message', 'Email', 'Phone Call', 'Other'];
  return validMethods.includes(method);
};

export const isValidComment = (comment) => {
  return comment.length <= 500; 
};

export const areValidEmails = (emails) => {
  return emails.every((email) => isValidEmail(email));
};

export const areValidPhoneNumbers = (phoneNumbers) => {
  return phoneNumbers.every((phone) => isValidPhoneNumber(phone));
};
