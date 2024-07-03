import './Header.css'
import themeContext from '../Context/ThemeContext.js'
import { useContext } from 'react'

export default function Header(){
  const theme = useContext(themeContext);
  return(
    <>
    <h3 className={`header ${theme}`}>TODO LIST APP</h3>
    </>
  );
}