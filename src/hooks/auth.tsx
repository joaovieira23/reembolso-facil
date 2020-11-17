import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import { useToast } from './toast';

interface AuthState {
  login: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  login: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const { addToast } = useToast();

  const [data, setData] = useState<AuthState>(() => {
    const login = localStorage.getItem('@Reembolso:login');

    if (login) {
      return { login };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.get(`http://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/User/Authenticate/${email}/${password}`);

    const { Login, Senha, Id, ...rest } = response.data;

    if (response.data !== "") {
      localStorage.setItem('@Reembolso:login', Login);
      localStorage.setItem('@Reembolso:pass', Senha);
      localStorage.setItem('@Reembolso:id', Id);
      setData(rest);
    } else {
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description:
          'Houve um erro durante o login, cheque suas credenciais.',
      });
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Reembolso:login');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ login: data.login, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
