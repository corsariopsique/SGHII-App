import React, { useState, useEffect, useCallback } from 'react';
import { redirect } from 'react-router';
import config from '../../config';

let logoutTimer;

const AutenticacionContexto = React.createContext({
    token: '',
    role: '',
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
    const storedRole = localStorage.getItem('role');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    
    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
        localStorage.removeItem('token');       
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('webServiceUrl');        
        return null;
    }

    return {
        token: storedToken,
        role: storedRole,
        duration: remainingTime,
    };
};

export const AutenticadorContextoProvider = (props) => {
    const tokenData = retrieveStoredToken();
    
    let initialToken;
    let initialRole;

    if (tokenData) {
      initialToken = tokenData.token;
      initialRole = tokenData.role;
    }
  
    const [token, setToken] = useState(initialToken);
    const [role, setRole] = useState(initialRole);
  
    const userIsLoggedIn = !!token;
    console.log(userIsLoggedIn);
  
    const logoutHandler = useCallback(() => {

      setToken(null);
      setRole(null);
      localStorage.removeItem('token');   
      localStorage.removeItem('expirationTime');      
      localStorage.removeItem('role');      
      localStorage.removeItem('webServiceUrl');      

  
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      redirect('/login');

    }, []);
  
    const loginHandler = (token, role, expirationTime) => {
      setToken(token);
      setRole(role);      
      localStorage.setItem('token', token);      
      localStorage.setItem('role', role);      
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('webServiceUrl', config.webServiceUrl);

      const remainingTime = calculateRemainingTime(expirationTime);
  
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    };
  
    useEffect(() => {
      if (tokenData) {
        console.log(tokenData.duration);
        console.log(tokenData.role);
        logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      }
    }, [tokenData, logoutHandler]);
  
    const contextValue = {
      token: token,
      role: role,
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
  