import { startTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "wouter";
import { authButtonStyle, Input } from "./AuthComps.styled";
import Button from "../../components/common/Button/Button";
import { setFormValue } from "../../redux/authFormValues/authFormSlice";

const LoginForm = ({ handleSubmit }) => {
  const formValues = useSelector((state) => state.authForm.login);

  const dispatch = useDispatch();

  const handleInputChange = ({ target: { value } }, inpName) =>
    startTransition(() => {
      dispatch(setFormValue({ actionKey: "login", propKey: inpName, value }));
    });

  const handleSubmitButtonClick = (e) => handleSubmit(e, "login", formValues);

  return (
    <>
      <fieldset className="inputs-field">
        <Input
          type="email"
          value={formValues["email"]}
          onChange={(e) => handleInputChange(e, "email")}
          placeholder="Email"
        />
        <Input
          type="password"
          value={formValues["password"]}
          onChange={(e) => handleInputChange(e, "password")}
          placeholder="Password"
          autoComplete="true"
        />
      </fieldset>
      <Button
        style={authButtonStyle}
        onClick={handleSubmitButtonClick}
        type="submit"
      >
        Login
      </Button>
      <div className="switch-auth-action-link-container">
        <Link href="/sign-up" className="create-acc-link">
          Create Account
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
