import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const object = { content, votes: 0 };
  const newAnecdote = await axios.post(baseUrl, object);
  return newAnecdote.data;
};

const voteAnecdote = async (id, newObject) => {
  const changedAnecdote = await axios.put(`${baseUrl}/${id}`, newObject);
  return changedAnecdote.data;
};

const anecdotes = { getAll, createAnecdote, voteAnecdote };
export default anecdotes;

