import React, { createContext, useContext, useState } from 'react';

const QuoteContext = createContext();

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};

export const QuoteProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quoteSubject, setQuoteSubject] = useState('General Inquiry');

  const openQuote = (subject = 'General Inquiry') => {
    setQuoteSubject(subject);
    setIsOpen(true);
  };

  const closeQuote = () => {
    setIsOpen(false);
  };

  return (
    <QuoteContext.Provider value={{ isOpen, openQuote, closeQuote, quoteSubject }}>
      {children}
    </QuoteContext.Provider>
  );
};
