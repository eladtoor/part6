import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

export const AnecdoteList = () => {
  // const anecdotes = useSelector((state) =>
  //   state.anecdotes.sort((a, b) => b.votes - a.votes)
  // );

  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    if (!filter.filter)
      return state.anecdotes.sort((a, b) => b.votes - a.votes);
    else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(filter.filter)
      );
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  console.log('hello', anecdotes);
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

