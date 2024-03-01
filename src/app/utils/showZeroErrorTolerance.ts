export const getValidationResults = (zeroErrorToleranceEnabled: boolean, errorRate, errorCount, duration, minTestDuration) => {
  return {
    zeroErrorToleranceValidation: zeroErrorToleranceEnabled ? showZeroErrorValidation(errorRate, errorCount) : false,
    minTestDurationValidation: minTestDuration > 0 ? duration <= minTestDuration : false,
  }
};

const showZeroErrorValidation = (errorRate, errorCount) => {
  if (errorRate > 0) {
    return true;
  } else {
    if (errorCount === null || errorCount === undefined) {
      return false
    }
    return errorCount && errorCount > 0;
  }
}
