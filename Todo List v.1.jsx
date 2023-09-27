import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name cannot be empty";
    if (!formData.lastName) newErrors.lastName = "Last name cannot be empty";

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address";

    if (formData.password.length < 8) newErrors.password = "Password must be greater than 7 characters";

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          data-testid="firstName"
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div>
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          data-testid="lastName"
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          data-testid="email"
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          data-testid="password"
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          data-testid="confirmPassword"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default App;
