import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "wouter";
import styled from "styled-components";
import { logout } from "../../redux/user/userSlice";
import { flexbox } from "../../styles/extendableStyles/ExtendableStyles.styled";

const ProfileSection = styled.section`
  width: 100%;
  height: calc(100vh - 6.25rem);
  min-height: 35rem;
  ${flexbox()}
`;

const ProfileContainer = styled.div`
  width: clamp(200px, 90%, 40rem);
  height: fit-content;
  border-radius: 25px;
  margin-top: -50px;
  background: var(--white);
  padding: 15px;

  & .seperator {
    margin: auto;
    height: 1px;
    background: var(--black);
    animation: open 1s ease forwards;

    @keyframes open {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
  }
`;

const ProfileDetailList = styled.ul`
  margin-bottom: 20px;
  border: 2px solid var(--black);
  padding: 15px;

  & > li {
    padding: 1rem 0;
    font-size: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & > li:not(:last-child) {
    border-bottom: 2px dashed var(--gray);
  }
`;

const AuthButtonsContainer = styled.div`
  height: 8.75rem;
  ${flexbox({ dir: "column", justify: "space-between" })}
`;

const AuthButton = styled.button`
  transition: all 0.1s linear;
  width: 100%;
  font-size: 22.5px;
  font-weight: bolder;
  font-family: var(--primary-font);
  padding: 1rem 0;
  background: none;
  color: var(--black);
  cursor: pointer;
  user-select: none;

  &:hover {
    background: var(--black);
    color: var(--white);
  }

  &.login-button {
    animation: showLoginButton 1s ease forwards;
  }
  &.signup-button {
    animation: showSignupButton 1s ease forwards;
  }
  &.logout-button {
    margin-top: 20px;
  }

  @keyframes showLoginButton {
    from {
      opacity: 0;
      transform: translateY(20%);
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes showSignupButton {
    from {
      opacity: 0;
      transform: translateY(-20%);
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ManageAccountPage = () => {
  const userAccount = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [, navigate] = useLocation();

  const { name, lastName, email, password } = userAccount ?? {};

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    dispatch(logout());
    navigate("/");
  };

  const hidePassword = (length) => {
    let res = "";

    for (let i = 0; i < length; i++) {
      res += "*";
    }

    return res;
  };

  const renderDetailList = () => {
    if (userAccount) {
      const passwordValue = password.replace(
        password.slice(0, password.length - 3),
        hidePassword(password.slice(0, password.length - 3).length)
      );

      return (
        <ProfileDetailList>
          <li title={name}>Name : {name}</li>
          <li title={lastName}>Last name : {lastName}</li>
          <li title={email}>Email : {email}</li>
          <li title={passwordValue}>Password : {passwordValue}</li>
          <AuthButton className="logout-button" onClick={handleLogout}>
            Log out
          </AuthButton>
        </ProfileDetailList>
      );
    }
  };

  return (
    <ProfileSection>
      <ProfileContainer>
        {renderDetailList()}
        {!userAccount && (
          <AuthButtonsContainer>
            <AuthButton
              className="login-button"
              onClick={() => navigate("/auth/login")}>
              Login
            </AuthButton>
            <hr className="seperator" />
            <AuthButton
              className="signup-button"
              onClick={() => navigate("/auth/sign-up")}>
              Create Accuont
            </AuthButton>
          </AuthButtonsContainer>
        )}
      </ProfileContainer>
    </ProfileSection>
  );
};

export default ManageAccountPage;
