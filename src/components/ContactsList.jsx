function ContactsList(props) {
  const {
    contacts,
    hideForm,
    setHideForm,
    hideEditForm,
    setHideEditForm,
    setContactToEdit
  } = props;

  return (
    <aside className="contacts-section light-shadow">
      <header>
        <h2>Contacts</h2>
        <button
          onClick={() => setHideForm(!hideForm)}
          className="button new-contact-btn"
        >
          {hideForm ? "Create" : "Cancel"}
        </button>
      </header>
      <ul>
        {contacts.map((contact, index) => {
          const { firstName, lastName, address } = contact;

          return (
            <li key={index}>
              <h3>
                {firstName} {lastName}
              </h3>
              <p>
                {address.street}, {address.postCode}
              </p>
              <button
                onClick={() => {
                  setHideEditForm(!hideEditForm);
                  setContactToEdit(contact);
                }}
                className="button new-contact-btn"
              >
                {hideEditForm ? "Edit" : "Cancel"}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ContactsList;
