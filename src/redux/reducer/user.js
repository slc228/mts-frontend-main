// eslint-disable-next-line import/prefer-default-export
export const handleAuthChange = (prevState) => ({
  ...prevState,
  userName: localStorage.getItem('userName'),
  userType: localStorage.getItem('userType'),
  userJurisdiction: localStorage.getItem('userJurisdiction'),
  userEventLimiter: localStorage.getItem('userEventLimiter'),
  userSensitiveLimiter: localStorage.getItem('userSensitiveLimiter'),
});
