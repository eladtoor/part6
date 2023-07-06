import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addNewAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addNewAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(addNewAnecdote(newAnecdote));
  };
};

export const voteAnecdoteAsync = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    const anecdoteToChange = anecdotes.find((a) => a.id === id);
    await anecdoteService.voteAnecdote(id, {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    });
    dispatch(voteAnecdote(id));
  };
};

export default anecdoteSlice.reducer;
