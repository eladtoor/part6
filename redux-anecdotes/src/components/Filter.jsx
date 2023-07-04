import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-field value is in variable event.target.valu
    dispatch(setFilter(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;

