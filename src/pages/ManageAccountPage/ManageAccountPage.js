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
  border: 2px solid var(--black);
  border-radius: 25px;
  margin-top: -50px;
  background: var(--white);
  padding: 15px;
`;

const ProfileDetailList = styled.ul`
  margin-bottom: 2rem;

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
  border-radius: 1rem;
  background: none;
  border: 2px solid var(--black);
  color: var(--black);
  cursor: pointer;
  user-select: none;

  &:hover {
    background: var(--black);
    color: var(--white);
  }
`;

const ManageAccountPage = () => {
  const userAccount = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [, navigate] = useLocation();

  const { name, lastName, displayEmail, password } = userAccount ?? {};

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
          <li title={displayEmail}>Email : {displayEmail}</li>
          <li title={passwordValue}>Password : {passwordValue}</li>
        </ProfileDetailList>
      );
    }
  };

  return (
    <ProfileSection>
      <ProfileContainer>
        {renderDetailList()}
        {userAccount ? (
          <AuthButton onClick={handleLogout}>Log out</AuthButton>
        ) : (
          <AuthButtonsContainer>
            <AuthButton onClick={() => navigate("/auth/login")}>
              Login
            </AuthButton>
            <AuthButton onClick={() => navigate("/auth/sign-up")}>
              Create Accuont
            </AuthButton>
          </AuthButtonsContainer>
        )}
      </ProfileContainer>
    </ProfileSection>
  );
};

export default ManageAccountPage;
