export function isValidName(name) {
  return /^[a-zA-Z ]{2,30}$/.test(name);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidMobile(mobile) {
  return /^[6-9]\d{9}$/.test(mobile); // India 10 digit
}

export function isValidDate(date) {
  return !isNaN(Date.parse(date));
}

export function isValidNumber(n) {
  return !isNaN(n) && n > 0;
}
