import { useRef, useState, useEffect } from "react";
import "./FormValidation.css";

export default function FormValidation() {
  const nameField = useRef();
  const emailField = useRef();
  const messageField = useRef();
  const accepteAllConditionField = useRef();
  const [error, setError] = useState({});
  const [isFormSent, setIsFormSent] = useState(false);

  const validateForm = () => {
    const nameValue = nameField.current.value;
    const emailValue = emailField.current.value;
    const messageValue = messageField.current.value;
    const accepteAllConditionValue = accepteAllConditionField.current.checked;
    let isFormValide = true;

    const newErrors = {};

    if (nameValue.trim() === "") {
      newErrors.name = "Field is required";
      isFormValide = false;
    }
    if (emailValue.trim() === "") {
      newErrors.email = "Field is required";
      isFormValide = false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      newErrors.email = "Email is invalid";
      isFormValide = false;
    }
    if (messageValue.trim() === "") {
      newErrors.message = "Message is required";
      isFormValide = false;
    }
    if (!accepteAllConditionValue) {
      newErrors.accepteAllCondition = "Accepting all conditions is required";
      isFormValide = false;
    }
    setError(newErrors);
    return isFormValide;
  };
  const handleChange = () => {
   validateForm();
  }
  // useEffect(() => {
  //   console.log(error);
  // }, [error]);
  const restForm = () => {
    nameField.current.value = "";
    emailField.current.value = "";
    messageField.current.value = "";
    accepteAllConditionField.current.checked = false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsFormSent(true);
      restForm();
    } else {
      setIsFormSent(false);
    }
  };

  const displayError = (fieldName) => {
    const field = document.querySelector(`#${fieldName}`);
    if (error[fieldName]) {
      field.style.border = "1px solid red";
      return <div className="error">{error[fieldName]}</div>;
    }
    return null;
  };

  const dispalyErrors = () => {
    return Object.entries(error).map(([field, message], key) => (
      <li key={key}>
        {field}: {message}
      </li>
    ));
  };

  return (
    <div className={"container-fluid mx-auto w-75 my-5"}>
      {Object.keys(error).length > 0 ? (
        <div className="alert alert-danger" role="alert">
          <strong>Errors</strong>
          <ul>{dispalyErrors()}</ul>
        </div>
      ) : (
        ""
      )}
      {isFormSent ? (
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-3"> Message sent successfully!!</h1>
            <hr className="my-2" />
            <p className="lead">thanks for message</p>
            <p>More info</p>
            <p className="lead">
              <a href="." className="btn btn-primary btn-lg" role="button">
                Return to contact page
              </a>
            </p>
          </div>
        </div>
      ) : (
        <>
          <h1>Contact Form</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                ref={nameField}
                placeholder="Enter Name"
                onChange={handleChange}
              />
              {displayError("name")}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control border-red"
                id="email"
                ref={emailField}
                placeholder="Enter Email"
                onChange={handleChange}
              />
              {displayError("email")}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                ref={messageField}
              ></textarea>
              {displayError("message")}
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="accepteAllCondition"
                ref={accepteAllConditionField}
                onChange={handleChange}
              />
              <label htmlFor="accepteAllCondition" className="form-check-label">
                Accept all conditions
              </label>
              {displayError("accepteAllCondition")}
            </div>
            <button type="submit" className="btn btn-primary form-control">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
