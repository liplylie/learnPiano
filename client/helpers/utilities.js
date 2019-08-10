export const rem = size => {
  if (size.indexOf) {
    size = parseInt(size);
  }

  return `${size / 16}rem`;
};
