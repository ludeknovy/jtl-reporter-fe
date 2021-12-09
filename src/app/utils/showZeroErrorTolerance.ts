export const showZeroErrorWarning = (errorRate, errorCount) => {
  if (errorRate > 0) {
    return true;
  } else {
    if (errorCount === null || errorCount === undefined) {
      return 'unknown';
    }
    return errorCount && errorCount > 0;
  }
};

