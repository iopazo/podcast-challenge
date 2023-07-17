'use client';
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from 'react';
import { AppReducer, initialState } from './AppReducer';
import EntryInterface from '@/interfaces/EntryInterface';

type InitialStateType = {
  stored: boolean;
  entries: EntryInterface[];
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => {} });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const jsonState = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state') || '')
      : null;
    if (jsonState) {
      dispatch({
        type: 'init_stored',
        value: JSON.parse(localStorage.getItem('state') || ''),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('state', JSON.stringify(state));
    }
  }, [state]);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
