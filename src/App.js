import './App.css';
import Header from './components/Header';
import Inputtext from './components/Inputtext';
import { items } from './data/data.js';
import Card from './components/Cards';
import { useReducer, useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import themeContext from './Context/ThemeContext.js';
import dispatchContext from './Context/dispatchContext.js';


function App() {
  const [Ecard, SetEcard] = useState(null);
  const [isEdit, SetisEdit] = useState(false);
  const [theme, setTheme] = useState('lightTheme');
  
  function newcardReducer(newcard, action) {
    switch (action.type) {
      case 'ADD':
        return [...newcard, action.payload];
      case 'DELETE':
        return newcard.filter(card => card.id !== action.payload);
      case 'UPDATE':
        return newcard.map(card =>
          card.id === action.payload.id ? action.payload : card
        );
      default:
        return newcard;
    }
  }

  const [newcard, dispatch] = useReducer(newcardReducer, items);

  const cardDetails = newcard.map((c) => (
    <Card
      key={c.id} // Use unique id as key
      id={c.id}
      title={c.title}
      description={c.description}
      dispatch={dispatch}
      handleEdit={() => {
        SetisEdit(true);
        SetEcard(c);
      }}
    />
  ));

  return (
    <themeContext.Provider value={theme}>
      <dispatchContext.Provider value = {dispatch}>
      <div className={`bigContainer ${theme}`}>
        <Header />
        <MdDarkMode className="darkbutt" onClick={() => setTheme(prev => (prev === 'lightTheme' ? 'darkTheme' : 'lightTheme'))} />
        <Inputtext isEdit={isEdit} Ecard={Ecard} SetisEdit={SetisEdit} SetEcard={SetEcard} />
        <div className='container'>
          {cardDetails}
        </div>
      </div>
      </dispatchContext.Provider>
    </themeContext.Provider>
  );
}

export default App;
