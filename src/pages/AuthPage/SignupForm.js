import { startTransition, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import { setFormValue } from "../../redux/authFormValues/authFormSlice";
import { Input, authButtonStyle } from "./AuthComps.styled";

const stepInputs = [
  {
    step: 1,
    inputs: [
      {
        id: 1,
        type: "text",
        placeholder: "Name",
        inputName: "name",
      },
      {
        id: 2,
        type: "text",
        placeholder: "Last name",
        inputName: "lastName",
      },
    ],
  },
  {
    step: 2,
    inputs: [
      {
        id: 3,
        type: "email",
        placeholder: "Email",
        inputName: "email",
      },
      {
        id: 4,
        type: "password",
        placeholder: "Password",
        inputName: "password",
      },
    ],
  },
];

const SignupForm = ({ handleSubmit }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const formValues = useSelector((state) => state.authForm.signup);

  const dispatch = useDispatch();

  const isLastStep = useMemo(
    () => (stepIndex === stepInputs.length - 1 ? true : false),
    [stepIndex]
  );

  const handleClick = (e) => {
    if (isLastStep) {
      handleSubmit(e, "signup", formValues);
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleFormValues = ({ target: { value } }, inpName) =>
    startTransition(() => {
      dispatch(setFormValue({ actionKey: "signup", propKey: inpName, value }));
    });

  return (
    <>
      <fieldset className="inputs-field">
        {stepInputs[stepIndex].inputs.map(
          ({ id, type, placeholder, inputName }) => (
            <Input
              key={id}
              type={type}
              value={formValues[inputName]}
              onChange={(e) => handleFormValues(e, inputName)}
              placeholder={placeholder}
              autoComplete="true"
            />
          )
        )}
      </fieldset>
      <Button style={authButtonStyle} onClick={handleClick} type="button">
        {isLastStep ? "Sign up" : "Next step"}
      </Button>
      <div className="switch-auth-action-link-container">
        <Link to="/auth/login" className="create-acc-link">
          Log in
        </Link>
      </div>
    </>
  );
};

export default SignupForm;
