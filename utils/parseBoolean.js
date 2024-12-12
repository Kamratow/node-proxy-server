exports.parseBoolean = (stringToParse) => {
  const bools = {
    true: true,
    false: false,
  };

  return typeof bools[stringToParse] === "boolean"
    ? bools[stringToParse]
    : undefined;
};
