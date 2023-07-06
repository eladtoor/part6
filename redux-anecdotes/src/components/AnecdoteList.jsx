import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdoteAsync } from '../reducers/anecdoteReducer';
import { setNotificationAsync } from '../reducers/notificationReducer';

export const AnecdoteList = () => {
  // const anecdotes = useSelector((state) =>
  //   state.anecdotes.sort((a, b) => b.votes - a.votes)
  // );

  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    if (!filter) {
      const arrayForSort = [...state.anecdotes];
      arrayForSort.sort((a, b) => b.votes - a.votes);
      return arrayForSort;
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(filter)
      );
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdoteAsync(id));
    const votedAnecdote = anecdotes.find((a) => a.id === id);
    dispatch(setNotificationAsync(`you voted '${votedAnecdote.content}'`, 5));
  };

  return (
    <div>
      {' '}
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

