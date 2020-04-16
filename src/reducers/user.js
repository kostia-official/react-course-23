export const user = (
  state = {
    data: {},
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case 'GET_USER_START':
      return { ...state, isLoading: true };
    case 'GET_USER_SUCCESS':
      return { ...state, data: action.payload.user, isLoading: false };
    default:
      return state;
  }
};
