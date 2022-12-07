import { createContext, useContext, useState } from "react";


const authContext = createContext();

const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      localStorage.setItem('isLoggedIn', true)
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 1000); // fake async
    },
    signout(cb) {
      localStorage.setItem('isLoggedIn', false)
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 1000);
    }
  };


export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}


function useProvideAuth() {
    const [user, setUser] = useState(false);
  
    const signin = (cb) => {
      return fakeAuth.signin(() => {
        setUser(true);
        cb();
      });
    };
  
    const signout = (cb) => {
      return fakeAuth.signout(() => {
        setUser(false);
        cb();
      });
    };
  
    return {
      user,
      signin,
      signout
    };
  }
  