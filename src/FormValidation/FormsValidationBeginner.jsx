import { useRef, useState } from "react";

export default function FormsValidationBeginner() {
  const nameField = useRef();
  const emailField = useRef();
  const messageField = useRef();
  const countryField = useRef();
  const accepteAllConditionField = useRef();
  const [errors, setErrors] = useState([]);
  const validateForm = () => {
    const nameValue = nameField.current.value;
    const emailValue = emailField.current.value;
    const messageValue = messageField.current.value;
    const countryValue = countryField.current.value;
    const accepteAllConditionValue = accepteAllConditionField.current.checked;
    let isFormValid = true;

    if (nameValue.trim() === "") {
      setErrors((prevState) => {
        return [...prevState, "Name is required"];
      });
      isFormValid = false;
    }
    if (emailValue.trim() === "") {
      setErrors((prevState) => {
        return [...prevState, "Email is required"];
      });
      isFormValid = false;
    }else if(!emailValue.match(/^\S+@\S+\.\S+$/)){
        setErrors((prevState) => {
          return [...prevState, "Email format is invalid"];
        });
        isFormValid = false;
    }
    if (messageValue.trim() === "") {
      setErrors((prevState) => {
        return [...prevState, "Message is required"];
      });
      isFormValid = false;
    }
    if (countryValue.trim() === "") {
        setErrors((prevState) => {
            return [...prevState, "Country is required"];
        });
        isFormValid = false;
      }
      if (!accepteAllConditionValue) {
        setErrors((prevState) => {
            return [...prevState, "You must accept the terms and conditions"];
        });
        isFormValid = false;
      }
    return isFormValid;
  };

  const handleSubmit = (e) => {
    setErrors([])
    if(!validateForm()){
        e.preventDefault()
    }
    
  };

  return (
    <div className={"container-fluid mx-auto my-5 w-75"}>
        {errors.length > 0 ? 
        <div className="alert alert-danger" role="alert">
            <strong>Error</strong>
            <ul>
                {errors.map((error,key)=>{
                    return <li key={key}>{error}</li>
                })}
            </ul>
        </div>
        :
        ''}
      <form onSubmit={handleSubmit}>
        <h1>Contact form</h1>
        <hr />
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            ref={nameField}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">
            Email adresse
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            ref={emailField}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            rows={4}
            ref={messageField}
          ></textarea>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="country">Country</label>
          <select ref={countryField} className="form-control" id="country">
            <option value="">Select Country</option>
            <option value="MA">Maroc</option>
            <option value="DZ">Algieré</option>
            <option value="TN">Tunise</option>
          </select>
        </div>
        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input me-2"
            ref={accepteAllConditionField}
            id="accepteAllCondition"
          />
          <label htmlFor="accepteAllCondition" className="form-check-label">
            Accepte All conditions
          </label>
        </div>

        <button type="submit" className="btn btn-primary form-control">
          Submit
        </button>
      </form>
    </div>
  );
}
