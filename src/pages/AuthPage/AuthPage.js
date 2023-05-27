import { useEffect } from "react";
import { Route, useLocation, Switch } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { firstLetterUpperCase } from "../../utils/appUtils";
import { hideAlert, showAlert } from "../../redux/alert/alertSlice";
import { FormContainer, AuthForm } from "./AuthComps.styled";
import {
  createAccount,
  login,
  clearLoginStatus,
} from "../../redux/user/userSlice";

const validateValues = (valueObject) => {
  const errorProperties = [];
  for (const key in valueObject) {
    const property = valueObject[key];
    if (!property || property === "") {
      errorProperties.push({
        [key]: firstLetterUpperCase(key) + " cannot be empty",
      });
    } else {
      if (property.search(/\s/gi) > -1) {
        errorProperties.push({
          [key]: firstLetterUpperCase(key) + " cannot contain empty spaces",
        });
      }
      if (key === "password" && property.length < 8) {
        errorProperties.push({
          [key]:
            firstLetterUpperCase(key) + " must contain at least 8 characters",
        });
      }
      if (
        key === "email" &&
        !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          property
        )
      ) {
        errorProperties.push({
          [key]: "Email is not valid",
        });
      }
    }
  }

  return errorProperties;
};

const AuthPage = ({ navigate }) => {
  const [pathname] = useLocation();

  const { user, loginStatus } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(hideAlert()), 300);
    if (user && loginStatus === "success") {
      navigate("/");
    } else if (loginStatus === "fail") {
      setTimeout(
        () =>
          dispatch(
            showAlert({
              title: "Invalid credentials !",
              paragraph:
                "User with this credentials was not found please correct your inputs and try again.",
              removable: true,
              onRemove: () => dispatch(clearLoginStatus()),
            })
          ),
        850
      );
    }
  }, [loginStatus]);

  useEffect(() => {
    return () => {
      dispatch(hideAlert());
      dispatch(clearLoginStatus());
    };
  }, []);

  const handleSubmit = (event, action, formValues) => {
    event.preventDefault();

    dispatch(
      showAlert({
        title: "Loading...",
        paragraph: "Please wait until the process is done",
        removable: false,
      })
    );

    const { email, password } = formValues;

    const errors = validateValues({ email, password });

    errors.length > 0 &&
      dispatch(
        showAlert({
          title: "Error",
          paragraph: errors.map((error) => {
            const key = Object.keys(error);
            return `- ${error[key[0]]}\n`;
          }),
        })
      );

    switch (action) {
      case "login": {
        !errors.length && dispatch(login({ email, password }));

        break;
      }
      case "signup": {
        !errors.length && dispatch(createAccount(formValues));

        break;
      }
      default:
        console.error("form submit action is invalid!");
    }
  };

  const renderTitle = () => {
    return pathname.endsWith("login") || pathname.endsWith("login/")
      ? "Log in"
      : (pathname.endsWith("sign-up") && "Sign up") ||
          (pathname.endsWith("sign-up/") && "Sign up");
  };

  return (
    <FormContainer>
      <h1 id="form-title">{renderTitle()}</h1>
      <Switch>
        <Route path="/login">
          <AuthForm onSubmit={(e) => handleSubmit(e, "login")}>
            <LoginForm handleSubmit={handleSubmit} />
          </AuthForm>
        </Route>
        <Route path="/sign-up">
          <AuthForm onSubmit={(e) => handleSubmit(e, "signup")}>
            <SignupForm handleSubmit={handleSubmit} />
          </AuthForm>
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </FormContainer>
  );
};

export default AuthPage;
