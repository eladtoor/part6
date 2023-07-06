import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, voteAnecdote } from './requests';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const updatedAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 });
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return `Error: ${result.error}`;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: 'SET', payload: `You voted "${anecdote.content}"` });
    setTimeout(() => {
      dispatch({ type: 'REST' });
    }, 5000);
    console.log('vote');
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
