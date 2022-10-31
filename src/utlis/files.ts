export const getFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size >= 1024 && size < 1048576) {
    return `${(size / 1024).toFixed(3)} KB`;
  } else if (size >= 1048576) {
    return `${(size / 1048576).toFixed(3)} MB`;
  }
};
