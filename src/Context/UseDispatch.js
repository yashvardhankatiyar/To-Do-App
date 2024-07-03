import { useContext } from "react";
import dispatchContext from "./dispatchContext";


function useDispatch(){
  return useContext(dispatchContext)
}

export default useDispatch;