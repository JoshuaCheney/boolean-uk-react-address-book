import { useState } from "react";

function CreateContactForm(props) {
  // [TODO] Write form handlers here and POST requests here...

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [blocked, setBlocked] = useState(false);

  // console.log(newContact, newAddress);

  const handleFirstName = (event) => {
    console.log("inside handleFirstName", event.target.value);
    setFirstName(event.target.value);
  };

  const handleSurname = (event) => {
    console.log("inside handleSurname", event.target.value);
    setSurname(event.target.value);
  };

  const handleStreet = (event) => {
    console.log("inside handleStreet", event.target.value);
    setStreet(event.target.value);
  };

  const handleCity = (event) => {
    console.log("inside handleFirstName", event.target.value);
    setCity(event.target.value);
  };

  const handlePostCode = (event) => {
    console.log("inside handlePostCode", event.target.value);
    setPostCode(event.target.value);
  };

  const handleBlocked = (event) => {
    console.log("inside handleBlocked", event.target.checked);
    setBlocked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContactAddress = {
      street: street,
      city: city,
      postCode: postCode
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(newContactAddress)
    };

    fetch("http://localhost:3030/addresses", fetchOptions)
      .then((res) => res.json())
      .then((newAddress) => {
        console.log("new Address", newAddress);

        const contactToCreate = {
          firstName: firstName,
          lastName: surname,
          blockContact: blocked,
          addressId: newAddress.id
        };

        const fetchContacts = {
          method: "POST",
          headers: {
            "content-Type": "application/json"
          },
          body: JSON.stringify(contactToCreate)
        };

        fetch("http://localhost:3030/contacts", fetchContacts)
          .then((res) => res.json())
          .then((newCreatedContact) => {
            console.log("new created contact", newCreatedContact);

            const contactToAdd = {
              ...newCreatedContact,
              address: newAddress
            };
            props.setContacts([...props.contacts, contactToAdd]);
          });

        console.log("contact to create", contactToCreate);
      });
  };

  return (
    <form
      className="form-stack light-shadow center contact-form"
      onSubmit={handleSubmit}
    >
      <h1>Create Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input
        id="first-name-input"
        name="first-name-input"
        type="text"
        onChange={handleFirstName}
      />
      <label htmlFor="last-name-input">Last Name:</label>
      <input
        id="last-name-input"
        name="last-name-input"
        type="text"
        onChange={handleSurname}
      />
      <label htmlFor="street-input">Street:</label>
      <input
        id="street-input"
        name="street-input"
        type="text"
        onChange={handleStreet}
      />
      <label htmlFor="city-input">City:</label>
      <input
        id="city-input"
        name="city-input"
        type="text"
        onChange={handleCity}
      />
      <label htmlFor="post-code-input">Post Code:</label>
      <input
        id="post-code-input"
        name="post-code-input"
        type="text"
        onChange={handlePostCode}
      />
      <div className="checkbox-section">
        <input
          id="block-checkbox"
          name="block-checkbox"
          type="checkbox"
          onChange={handleBlocked}
        />
        <label htmlFor="block-checkbox">Block</label>
      </div>
      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateContactForm;
