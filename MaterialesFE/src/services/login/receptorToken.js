import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();
import PropTypes from 'prop-types';
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true); 
      };
      
  
    const logout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };
  