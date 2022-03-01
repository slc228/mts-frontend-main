// eslint-disable-next-line import/prefer-default-export
export const handleProgrammeChange = (prevState, data) => {
  console.log(data);
  return {
    ...prevState,
    curProgramme: data.curProgramme,
  };
};

export const handleProgrammesChange = (prevState, data) => ({
  ...prevState,
  curProgramme: data.curProgramme,
  programmes: data.programmes,
});

export const handlePageTagChange = (prevState, data) => ({
  ...prevState,
  curPageTag: data.curPageTag,
});
