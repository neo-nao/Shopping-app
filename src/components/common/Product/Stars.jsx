import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import styled from "styled-components";

const StarsContainer = styled.div`
  height: 16px;

  & > * {
    margin: 0 2px;

    @media (max-width: 350px) {
      margin: 0;
    }
  }
`;

const Stars = ({ filledStars }) => {
  const renderStars = () => {
    const starIcons = [];
    let prevValue = 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) starIcons.push(<BsStarFill key={i} />);
      else if (prevValue < filledStars && i > filledStars)
        starIcons.push(<BsStarHalf key={i} />);
      else if (i > filledStars) starIcons.push(<BsStar key={i} />);

      prevValue = i;
    }
    return starIcons;
  };

  return <StarsContainer>{renderStars()}</StarsContainer>;
};

export default Stars;
