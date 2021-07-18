import { actionTypes } from './actions';
import { handleAuthChange } from './reducer/user';
import { handleProgrammeChange, handleProgrammesChange, handlePageTagChange } from './reducer/programme';
import { handleOverallPathChange } from "./reducer/overall";
import { handleMonitorPathChange } from "./reducer/monitor";

const initialState = {
  userName: undefined,
  userType: undefined,
  curProgramme: undefined,
  overallPath: '',
  monitorPath: '',
  programmes: [],
  curPageTag: 'info',
};

export default (prevState = initialState, actions) => {
  let newState;
  const { type, data } = actions;
  switch (type) {
    case actionTypes.ON_AUTH_CHANGE:
      newState = handleAuthChange(prevState, data);
      break;
    case actionTypes.ON_PROGRAMME_CHANGE:
      newState = handleProgrammeChange(prevState, data);
      break;
    case actionTypes.ON_OVERALL_PATH_CHANGE:
      newState = handleOverallPathChange(prevState, data);
      break;
    case actionTypes.ON_PROGRAMMES_CHANGE:
      newState = handleProgrammesChange(prevState, data);
      break;
    case actionTypes.ON_PAGETAG_CHANGE:
      newState = handlePageTagChange(prevState, data);
      break;
    case actionTypes.ON_MONITOR_PATH_CHANGE:
      newState = handleMonitorPathChange(prevState, data);
      break;
    default:
      newState = { ...prevState };
      break;
  }
  return newState;
};
