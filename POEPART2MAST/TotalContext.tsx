import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context
interface TotalContextType {
  total: number;
  setTotal: (newTotal: number) => void;
}

// Create the context with undefined as the default value
const TotalContext = createContext<TotalContextType | undefined>(undefined);

// Custom hook to use the Total context
export const useTotal = (): TotalContextType => {
  const context = useContext(TotalContext);
  if (!context) {
    throw new Error('useTotal must be used within a TotalProvider');
  }
  return context;
};

// The TotalProvider component will wrap the app and provide the context value
export const TotalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [total, setTotal] = useState<number>(0);

  return (
    <TotalContext.Provider value={{ total, setTotal }}>
      {children}
    </TotalContext.Provider>
  );
};
