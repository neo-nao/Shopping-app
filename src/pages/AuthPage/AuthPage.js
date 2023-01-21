import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncUserFetch,
  createUserAccountPending,
} from "../../redux/user/userSlice";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { firstLetterUpperCase } from "../../utils/appUtils";
import { hideAlert, showAlert } from "../../redux/alert/alertSlice";
import { FormContainer, AuthForm } from "./AuthComps.styled";

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

const AuthPage = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const {
    user: { user },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      !localStorage.getItem("user-token") &&
        localStorage.setItem("user-token", user.userToken);
      navigate("/");
      dispatch(hideAlert());
    }
  }, [user]);

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
        errors.length === 0 &&
          dispatch(
            asyncUserFetch({
              email,
              password,
            })
          );
        break;
      }
      case "signup": {
        errors.length === 0 &&
          dispatch(
            createUserAccountPending({
              ...formValues,
              displayEmail: email,
              email: email.toLowerCase(),
            })
          );

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
      <Routes>
        <Route
          path="/login"
          element={
            <AuthForm onSubmit={(e) => handleSubmit(e, "login")}>
              <LoginForm handleSubmit={handleSubmit} />
            </AuthForm>
          }
        />
        <Route
          path="/sign-up"
          element={
            <AuthForm onSubmit={(e) => handleSubmit(e, "signup")}>
              <SignupForm handleSubmit={handleSubmit} />
            </AuthForm>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </FormContainer>
  );
};

export default AuthPage;
