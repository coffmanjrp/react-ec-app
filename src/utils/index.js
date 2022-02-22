import HTMLReactParser from 'html-react-parser';

// Converts date to  string
export const dateToString = (date) => {
  return `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${(
    '00' + date.getDate()
  ).slice(-2)}`;
};

// Converts time to  string
export const dateTimeToString = (date) => {
  return `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${(
    '00' + date.getDate()
  ).slice(-2)} ${('00' + date.getHours()).slice(-2)}:${(
    '00' + date.getMinutes()
  ).slice(-2)}:${('00' + date.getSeconds()).slice(-2)}`;
};

// Get random id
export const generateRandomID = () => {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const N = 16;
  const id = Array.from(crypto.getRandomValues(new Uint8Array(N)))
    .map((n) => S[n % S.length])
    .join('');

  return id;
};

// Converts newline text to <br /> html tag.
export const returnCodeToBr = (text) => {
  if (text === '') {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br />'));
  }
};

export const termToQuery = (text) => {
  return text.replace(/["'/]/g, '').replace(/\s/g, '_').toLowerCase();
};
