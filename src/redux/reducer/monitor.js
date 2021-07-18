// eslint-disable-next-line import/prefer-default-export
export const handleMonitorPathChange = (prevState, data) => {
  return {
    ...prevState,
    monitorPath: data.path,
  };
};
