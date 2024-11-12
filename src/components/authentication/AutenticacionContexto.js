import React, { useState, useEffect, useCallback } from 'react';
import { redirect } from 'react-router';
import config from '../../config';

let logoutTimer;

const AutenticacionContexto = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    
    const currentTime = new Date().getTime();   
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;    

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');  
    const storedExpirationDate = localStorage.getItem('expirationTime');
    
    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
        localStorage.removeItem('token');       
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
    };
};

export const AutenticadorContextoProvider = (props) => {
    const tokenData = retrieveStoredToken();
    
    let initialToken;
    if (tokenData) {
      initialToken = tokenData.token;
    }
  
    const [token, setToken] = useState(initialToken);
  
    const userIsLoggedIn = !!token;
    console.log(userIsLoggedIn);
  
    const logoutHandler = useCallback(() => {
      setToken(null);
      localStorage.removeItem('token');   
      localStorage.removeItem('expirationTime');        
  
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      redirect('/login');

    }, []);
  
    const loginHandler = (token, expirationTime) => {
      setToken(token);
      localStorage.setItem('token', token);      
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('webServiceUrl', config.webServiceUrl);

      const remainingTime = calculateRemainingTime(expirationTime);
  
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    };
  
    useEffect(() => {
      if (tokenData) {
        console.log(tokenData.duration);
        logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      }
    }, [tokenData, logoutHandler]);
  
    const contextValue = {
      token: token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    };
  
    return (
      <AutenticacionContexto.Provider value={contextValue}>
        {props.children}
      </AutenticacionContexto.Provider>
    );
};
  
  export default AutenticacionContexto;
  