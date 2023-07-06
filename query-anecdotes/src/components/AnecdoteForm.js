import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';
const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
    onError: (error) => {
      console.log(error.message);
      dispatch({
        type: 'SET',
        payload: 'too short anecdote, must have length 5 or more',
      });
    },
  });
  // const { error } = useMutation({
  //   onError: (error) => {
  //     dispatch({ type: 'SET', payload: error.message });
  //   },
  // });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: 'SET', payload: `Added '${content}'` });
    setTimeout(() => {
      dispatch({ type: 'REST' });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
