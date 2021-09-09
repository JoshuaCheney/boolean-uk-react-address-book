import { useEffect, useState } from "react";

function EditContactForm(props) {
  const { contact, setContact, contactToEdit } = props;

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (contactToEdit) {
      console.log("contact to edit is tracked && has changed");

      setFirstName(contactToEdit.firstName);
      setSurname(contactToEdit.lastName);
      setStreet(contactToEdit.address.street);
      setCity(contactToEdit.address.city);
      setPostCode(contactToEdit.address.postCode);
      setBlocked(contactToEdit.blockContact);
    }
  }, [contactToEdit]);

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

    const fetchPutOptions = {
      method: "PUT",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(newContactAddress)
    };

    fetch("http://localhost:3030/addresses", fetchPutOptions)
      .then((res) => res.json())
      .then((newAddress) => {
        console.log("new Address", newAddress)
      };

  return (
    <form
      className="form-stack light-shadow center contact-form"
      onSubmit={handleSubmit}
    >
      <h1>Edit Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input
        id="first-name-input"
        name="first-name-input"
        type="text"
        onChange={handleFirstName}
        value={firstName}
      />
      <label htmlFor="last-name-input">Last Name:</label>
      <input
        id="last-name-input"
        name="last-name-input"
        type="text"
        onChange={handleSurname}
        value={surname}
      />
      <label htmlFor="street-input">Street:</label>
      <input
        id="street-input"
        name="street-input"
        type="text"
        onChange={handleStreet}
        value={street}
      />
      <label htmlFor="city-input">City:</label>
      <input
        id="city-input"
        name="city-input"
        type="text"
        onChange={handleCity}
        value={city}
      />
      <label htmlFor="post-code-input">Post Code:</label>
      <input
        id="post-code-input"
        name="post-code-input"
        type="text"
        onChange={handlePostCode}
        value={postCode}
      />
      <div className="checkbox-section">
        <input
          id="block-checkbox"
          name="block-checkbox"
          type="checkbox"
          onChange={handleBlocked}
          checked={blocked}
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

export default EditContactForm;
