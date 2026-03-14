export const formatDateToString = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const isAtLeast16 = (dateString) => {
  if (!dateString) return false;
  const [day, month, year] = dateString.split('.');
  const birthday = new Date(year, month - 1, day);

  const today = new Date();
  const sixteenYearsAgo = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );

  return birthday <= sixteenYearsAgo;
};

export const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/;

  if (!regex.test(date)) return false;

  const [day, month, year] = date.split('.').map(Number);
  const d = new Date(year, month - 1, day);

  return (
    d.getFullYear() === year &&
    d.getMonth() === month - 1 &&
    d.getDate() === day
  );
};

export const formatValue = (date) => {
  let value = date.replace(/\D/g, '');
  if (value.length > 8) value = value.slice(0, 8);

  let formatted = value;

  if (value.length > 4) {
    formatted = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4)}`;
  } else if (value.length > 2) {
    formatted = `${value.slice(0, 2)}.${value.slice(2)}`;
  }
  return formatted;
};
