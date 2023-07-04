const initialState = '';
export const setFilter = (filter) => {
  return {
    type: 'FILTER',
    payload: {
      filter,
    },
  };
};

const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'FILTER':
      return action.payload;

    default:
      return state;
  }
};

export default filterReducer;

