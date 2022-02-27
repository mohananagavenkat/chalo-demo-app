import { createContext, useState } from 'react';
import data from '../data/stops.json';

const initialSteps = data;

export function StopsContextProvider(props) {
  const [stops, setSteps] = useState(initialSteps);
  return <StopsContext.Provider value={{ stops, setSteps }} {...props} ></StopsContext.Provider>
}


export const StopsContext = createContext({});