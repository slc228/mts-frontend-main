export const actionTypes = {
  TEST: Symbol('test'),
  ON_AUTH_CHANGE: Symbol('on_auth_change'),
  ON_PROGRAMME_CHANGE: Symbol('on_programme_change'),
  ON_OVERALL_PATH_CHANGE: Symbol('on_overall_path_change'),
  ON_PROGRAMMES_CHANGE: Symbol('on_programmes_change'),
  ON_PAGETAG_CHANGE: Symbol('on_pagetag_change'),
  ON_MONITOR_PATH_CHANGE: Symbol('on_monitor_path_change'),
  ON_BRIEFING_PATH_CHANGE: Symbol('on_briefing_path_change'),
  ON_BRIEFINGGEN_PATH_CHANGE: Symbol('on_briefinggen_path_change'),
};

export const actions = {
  test: (data) => ({ type: actionTypes.TEST, data }),
  onAuthChange: (data) => ({ type: actionTypes.ON_AUTH_CHANGE, data }),
  onProgrammeChange: (data) => ({ type: actionTypes.ON_PROGRAMME_CHANGE, data }),
  onOverallPathChange: (data) => ({ type: actionTypes.ON_OVERALL_PATH_CHANGE, data }),
  onProgrammesChange: (data) => ({ type: actionTypes.ON_PROGRAMMES_CHANGE, data }),
  onPageTagChange: (data) => ({ type: actionTypes.ON_PAGETAG_CHANGE, data }),
  onMonitorPathChange: (data) => ({ type: actionTypes.ON_MONITOR_PATH_CHANGE, data }),
  onBriefingPathChange: (data) => ({ type: actionTypes.ON_BRIEFING_PATH_CHANGE, data }),
  onBriefingGenPathChange: (data) => ({ type: actionTypes.ON_BRIEFINGGEN_PATH_CHANGE, data }),
};
