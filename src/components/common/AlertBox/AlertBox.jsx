import { useState } from "react";
import { useMemo } from "react";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { hideAlert } from "../../../redux/alert/alertSlice";
import {
  flexbox,
  placeCenter,
} from "../../../styles/extendableStyles/ExtendableStyles.styled";
import { actionAfterAnimation } from "../../../utils/appUtils";

const AlertContainer = styled.div`
  transition: all 0.5s ease;
  width: clamp(200px, 95%, 500px);
  height: 300px;
  background-color: var(--white);
  position: fixed;
  ${placeCenter()}
  transform: translate(-50%, -35%) scale(0.75);
  opacity: 0;
  padding: 10px;
  border: 1px solid var(--black);
  border-radius: 10px;
  z-index: 50;
  animation: popupAnimation 0.5s ease;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  -ms-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  &.alert-opened {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: unset;
  padding: 20px;
  ${flexbox()}
  position:absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;

  & .close-icon-line {
    width: 75%;
    height: 4px;
    position: absolute;
    background-color: #000;

    :first-child {
      transform: rotate(-45deg);
    }
    :last-child {
      transform: rotate(45deg);
    }
  }
`;

const animationDelay = 1000;

const AlertBox = () => {
  const [DOMShowing, setDOMShowing] = useState(false);
  const alert = useSelector((state) => state.alert);

  const { isShowing, title, paragraph, removable, onRemove } = alert;

  const dispatch = useDispatch();

  const alertRef = useRef();

  const handleCloseAlert = () => {
    dispatch(hideAlert());
    onRemove && onRemove();
  };

  useEffect(() => {
    isShowing
      ? setDOMShowing(isShowing)
      : alertRef.current &&
        actionAfterAnimation(
          () => {
            setDOMShowing(isShowing);
          },
          {
            element: alertRef.current,
            animation: `
        transform: translate(-50%,-35%)  scale(.75);
        opacity:0;
        `,
            duration: animationDelay,
          }
        );
  }, [isShowing]);

  useEffect(() => {
    alertRef.current &&
      isShowing === true &&
      setTimeout(() => {
        alertRef.current.classList.add("alert-opened");
      }, 20);
    alertRef.current &&
      isShowing === false &&
      alertRef.current.target.classList.add("hide-alert");
  }, [DOMShowing]);

  const renderAlertBox = useMemo(() => {
    return DOMShowing ? (
      <AlertContainer ref={alertRef}>
        {removable && (
          <CloseButton onClick={handleCloseAlert}>
            <span className="close-icon-line"></span>
            <span className="close-icon-line"></span>
          </CloseButton>
        )}
        <section style={{ marginTop: "25px" }}>
          <h1 style={{ padding: "1.5rem" }}>{title}</h1>
        </section>
        <section>
          <p
            style={{
              padding: "10px 1.5rem",
              fontSize: "17.5px",
              lineHeight: "30px",
              whiteSpace: "break-spaces",
              overflowWrap: "break-word",
            }}>
            {paragraph}
          </p>
        </section>
      </AlertContainer>
    ) : (
      ""
    );
  }, [DOMShowing]);

  return renderAlertBox;
};

export default AlertBox;
