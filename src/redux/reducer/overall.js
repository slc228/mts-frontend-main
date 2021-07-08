// eslint-disable-next-line import/prefer-default-export
export const handleOverallPathChange = (prevState, data) => {
  return {
    ...prevState,
    overallPath: data.path,
  };
};
