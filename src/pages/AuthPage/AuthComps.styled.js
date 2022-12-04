import styled from "styled-components";
import {
  boxshadow,
  flexbox,
} from "../../styles/extendableStyles/ExtendableStyles.styled";

const FormContainer = styled.div`
  height: calc(100vh - 100px);
  ${flexbox({ dir: "column" })}

  & > #form-title {
    margin: -150px 0 20px;
  }

  @media (max-height: 615px) {
    > * {
      margin-bottom: -100px;
    }
  }
`;

const AuthForm = styled.form`
  width: clamp(1.5rem, 90%, 25.5rem);
  min-height: 300px;
  border: 1px solid var(--black);
  border-radius: 1px;

  & > .inputs-field {
    height: 10rem;
    ${flexbox({ dir: "column", justify: "space-evenly" })}
  }

  & .switch-auth-action-link-container {
    text-align: center;
    margin: 33px 0;
    font-size: 17.5px;
    font-weight: 600;
    > a {
      transition: var(--color-transition);
      color: var(--gray);

      :hover {
        color: var(--black);
      }
    }
  }
`;

const Input = styled.input`
  height: 3rem;
  width: clamp(10rem, 90%, 30rem);
  padding: 15px;
  border: 1px solid var(--black);
  font-size: 17.5px;
  border-radius: 2px;
  ${boxshadow("focus")}
`;

const authButtonStyle = {
  width: "90%",
  borderRadius: "2px",
  padding: "10px 0",
  margin: "20px auto 0",
  fontSize: "17.5px",
};

export { FormContainer, AuthForm, Input, authButtonStyle };
