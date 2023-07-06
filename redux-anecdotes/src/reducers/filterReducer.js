import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

// export const setFilter = (filter) => {
//   return {
//     type: 'FILTER',
//     payload: {
//       filter,
//     },
//   };
// };

// const filterReducer = (state = initialState, action) => {
//   console.log('state now: ', state);
//   console.log('action', action);
//   switch (action.type) {
//     case 'FILTER':
//       return action.payload;

//     default:
//       return state;
//   }
// };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;

