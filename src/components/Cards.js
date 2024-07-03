import React, { useContext } from 'react';
import './Cards.css'; // Import the CSS file
import { CiEdit } from "react-icons/ci";
import ThemeContext from '../Context/ThemeContext';
import useDispatch from '../Context/UseDispatch';

export default function Cards({ title, description, id, handleEdit }) {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch({
      type: 'DELETE',
      payload: id
    });
  };

  return (
    <div className={`Cardouter ${theme}`}>
      <button className='delete-button' onClick={handleDelete}>X</button>
      <button className='edit-button' onClick={handleEdit}><CiEdit /></button>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
