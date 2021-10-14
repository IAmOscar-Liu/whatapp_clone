import React, { useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Contact } from '../types';

interface ContextProps {
  contacts: Array<Contact> | null;
  createContact: ((id: string, name: string) => void) | null;
}

const ContactsContext = createContext<ContextProps>({
  contacts: null,
  createContact: null,
});

export const useContacts = () => {
  return useContext(ContactsContext);
};

interface ProviderProps {
  children: JSX.Element;
}

export const ContactsProvider = ({ children }: ProviderProps) => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>("contacts", []);

  const createContact = (id: string, name: string) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  };

  const value = {
    contacts,
    createContact,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};
