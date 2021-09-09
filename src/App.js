import { useEffect, useState } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import EditContactForm from "./components/EditContactForm";
import "./styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [hideEditForm, setHideEditForm] = useState(true);

  const [contactToEdit, setContactToEdit] = useState([]);
  console.log("contact to edit", contactToEdit);
  // [TODO] Write a useEffect to fetch contacts here...

  useEffect(() => {
    const url = `http://localhost:3030/contacts`;
    console.log("URL", url);

    fetch(url)
      .then((res) => res.json())
      .then((serverContacts) => {
        console.log("inside contacts", serverContacts);

        setContacts(serverContacts);
      });
  }, []);

  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
        hideEditForm={hideEditForm}
        setHideEditForm={setHideEditForm}
        setContactToEdit={setContactToEdit}
      />
      <main>
        {!hideForm && (
          <CreateContactForm contacts={contacts} setContacts={setContacts} />
        )}
        {!hideEditForm && (
          <EditContactForm
            contactToEdit={contactToEdit}
            contacts={contacts}
            setContacts={setContacts}
          />
        )}
      </main>
    </>
  );
}
