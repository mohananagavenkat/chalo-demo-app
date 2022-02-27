import { createContext, useEffect, useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';

export function RoutesContextProvider(props) {
  const [routes, setRoutes] = useState(() => reactLocalStorage.getObject('routes', []));
  useEffect(() => {
    reactLocalStorage.setObject('routes', routes)
  }, [routes])
  return <RoutesContext.Provider value={{ routes, setRoutes }} {...props} ></RoutesContext.Provider>
}


export const RoutesContext = createContext();