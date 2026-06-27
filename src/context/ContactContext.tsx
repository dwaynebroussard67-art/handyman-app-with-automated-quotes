import { createContext, useContext, useState, ReactNode } from 'react';

interface ContactInfo {
  phone: string;
  email: string;
}

interface ContactContextType {
  contact: ContactInfo;
  updateContact: (info: ContactInfo) => void;
}

const ContactContext = createContext<ContactContextType>({
  contact: { phone: '', email: '' },
  updateContact: () => {},
});

export function ContactProvider({ children }: { children: ReactNode }) {
  const [contact, setContact] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('ryansuire_contact');
    return saved ? JSON.parse(saved) : { phone: '', email: '' };
  });

  const updateContact = (info: ContactInfo) => {
    setContact(info);
    localStorage.setItem('ryansuire_contact', JSON.stringify(info));
  };

  return (
    <ContactContext.Provider value={{ contact, updateContact }}>
      {children}
    </ContactContext.Provider>
  );
}

export const useContact = () => useContext(ContactContext);
