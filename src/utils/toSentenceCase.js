function toSentenceCase(str) {
  return str
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
}

export { toSentenceCase };
