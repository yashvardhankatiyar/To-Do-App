import themeContext from "../Context/ThemeContext";
import useDispatch from "../Context/UseDispatch";
import "./Inputtext.css";
import { useState, useEffect, useContext, useRef } from 'react';

export default function Inputtext({ isEdit, Ecard, SetisEdit, SetEcard }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const theme = useContext(themeContext);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  //useRef is also used to store a value even after re-render of components.

  useEffect(() => {
    if (isEdit && Ecard) {
      setTitle(Ecard.title);
      setDesc(Ecard.description);
    } else {
      setTitle('');
      setDesc('');
    }

    titleRef.current.focus();
  }, [isEdit, Ecard]);

  function handletitleChange(e) {
    setTitle(e.target.value);
  }

  function handledescChange(e) {
    setDesc(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (title === '' || desc === '') {
      alert('You can\'t leave it empty');
    } else {
      const data = {
        id: isEdit ? Ecard.id : new Date().getTime(),
        title: title,
        description: desc
      };
      dispatch({
        type: isEdit ? 'UPDATE' : 'ADD',
        payload: data
      });
      setTitle('');
      setDesc('');
      SetisEdit(false);
      SetEcard(null);
      titleRef.current.focus();
    }
  }

  function handleTitleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      descRef.current.focus();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`inputdiv ${theme}`}>
          <input
            ref={titleRef}
            type="text"
            className='title'
            placeholder="title"
            onChange={handletitleChange}
            value={title}
            onKeyPress={handleTitleKeyPress}
          />
          <input
            ref={descRef}
            type="text"
            className='description'
            placeholder="description"
            onChange={handledescChange}
            value={desc}
          />
          <button type="submit">{isEdit ? "Update" : "Add"}</button>
        </div>
      </form>
    </>
  );
}
