// eslint-disable-next-line import/prefer-default-export
export const handleBriefingPathChange = (prevState, data) => ({
  ...prevState,
  briefingPath: data.path,
});
