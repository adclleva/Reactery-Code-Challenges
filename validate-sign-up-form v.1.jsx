import { useReducer } from "react";

import styled from "styled-components";

const formReducer = (state, action) => {
  switch (action.type) {
    case "firstNameValue":
      return {
        ...state,
        firstName: {
          ...state.firstName,
          value: action.payload,
        },
      };
    case "lastNameValue":
      return {
        ...state,
        lastName: {
          ...state.lastName,
          value: action.payload,
        },
      };
    case "emailValue":
      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload,
        },
      };
    case "passwordValue":
      return {
        ...state,
        password: {
          ...state.password,
          value: action.payload,
        },
      };
    case "confirmPasswordValue":
      return {
        ...state,
        confirmPassword: {
          ...state.confirmPassword,
          value: action.payload,
        },
      };

    case "firstNameError":
      return {
        ...state,
        firstName: {
          ...state.firstName,
          error: action.payload,
        },
      };
    case "lastNameError":
      return {
        ...state,
        lastName: {
          ...state.lastName,
          error: action.payload,
        },
      };
    case "emailError":
      return {
        ...state,
        email: {
          ...state.email,
          error: action.payload,
        },
      };
    case "passwordError":
      return {
        ...state,
        password: {
          ...state?.password,
          error: action.payload,
        },
      };
    case "confirmPasswordError":
      return {
        ...state,
        confirmPassword: {
          ...state.confirmPassword,
          error: action.payload,
        },
      };
  }
};

const isEmailValid = (email) => {
  const validationRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  return validationRegex.test(email);
};

const validateForm = (formState, dispatch) => {
  if (formState.firstName.value.length === 0) {
    dispatch({ type: "firstNameError", payload: true });
  }

  if (formState.lastName.value.length === 0) {
    dispatch({ type: "lastNameError", payload: true });
  }

  if (!isEmailValid(formState.email.value)) {
    console.log("hit");
    dispatch({ type: "emailError", payload: true });
  }

  if (formState.password.value.length < 8) {
    dispatch({ type: "passwordError", payload: true });
  }

  if (formState.confirmPassword.value.length < 8) {
    dispatch({ type: "confirmPasswordError", payload: true });
  }
};

const initialFormState = {
  firstName: {
    value: "",
    error: false,
  },
  lastName: {
    value: "",
    error: false,
  },
  email: {
    value: "",
    error: false,
  },
  password: {
    value: "",
    error: false,
  },
  confirmPassword: {
    value: "",
    error: false,
  },
};

const SignUpForm = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  console.log({ formState });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted successfully");
    validateForm(formState, dispatch);
  };

  const handleInputChange = (e) => {
    dispatch({ type: `${e.target.name}Value`, payload: e.target.value });
    e.target.name;
    e.target.value;
  };

  return (
    <Wrapper>
      <div>{formState.firstName.value}</div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="first-name-id"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formState.firstName.value}
          onChange={handleInputChange}
        />
        {formState.firstName.error && (
          <p data-testid="first-name-error-id" className="error">
            First name cannot be empty
          </p>
        )}
        <input
          data-testid="last-name-id"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName.value}
          onChange={handleInputChange}
        />
        {formState.lastName.error && (
          <p data-testid="last-name-error-id" className="error">
            Last name cannot be empty
          </p>
        )}
        <input
          data-testid="email-id"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formState.email.value}
          onChange={handleInputChange}
        />
        {formState.email.error && (
          <p data-testid="email-error-id" className="error">
            Invalid email address
          </p>
        )}
        <input
          data-testid="password-id"
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password.value}
          onChange={handleInputChange}
        />
        {formState.password.error && (
          <p data-testid="password-error-id" className="error">
            Password must be greater than 7 characters
          </p>
        )}
        <input
          data-testid="confirm-password-id"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formState.confirmPassword.value}
          onChange={handleInputChange}
        />
        {formState.confirmPassword.error && (
          <p data-testid="confirm-password-error-id" className="error">
            Passwords do not match
          </p>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </Wrapper>
  );
};

export default SignUpForm;

const Wrapper = styled.div`
  margin-top: 24px;
  font-family: sans-serif;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 8px 12px;
    font-size: 18px;
    margin-bottom: 6px;
    width: clamp(200px, 40%, 400px);
  }

  button {
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    margin-top: 24px;

    &:hover {
      opacity: 0.8;
    }
  }

  .error {
    margin: 0 0 24px 0;
    color: red;
  }
`;
