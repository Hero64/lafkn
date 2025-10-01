const getStacks = () => {
  const originalPrepareStackTrace = Error.prepareStackTrace;

  Error.prepareStackTrace = (_, stack) => stack;

  const err = new Error();

  const stacks = err.stack as unknown as any[];
  Error.prepareStackTrace = originalPrepareStackTrace;

  return stacks;
};

export const getCallerFileName = (fileIndex = 5): string => {
  const stacks = getStacks();
  return stacks[fileIndex].getFileName();
};
