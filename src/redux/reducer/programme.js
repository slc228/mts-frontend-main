// eslint-disable-next-line import/prefer-default-export
export const handleProgrammeChange = (prevState, data) => {
  return {
    ...prevState,
    curProgramme: data.curProgramme,
  };
};

export const handleProgrammesChange = (prevState, data) => {
  return {
    ...prevState,
    curProgramme: data.curProgramme,
    programmes: data.programmes
  };
};

export const handlePageTagChange = (prevState, data) => {
  return {
    ...prevState,
    curPageTag: data.curPageTag,
  };
};
