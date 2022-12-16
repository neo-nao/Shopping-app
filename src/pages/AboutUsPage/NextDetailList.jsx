import { NextDetailListContainer } from "../../styles/Elements/AboutUsElements";
import { MdMail, MdLocationOn, MdDateRange } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const NextDetailList = ({ id }) => {
  return (
    <NextDetailListContainer id={id}>
      <ul className="next-detail-list">
        <li>
          <FaPhoneAlt /> Num : +1 1002200
        </li>
        <li>
          <MdMail /> Email : next@shoe.co
        </li>
        <li>
          <MdLocationOn /> Address : London, UK
        </li>
        <li>
          <MdDateRange /> Since : 2022/12/14
        </li>
      </ul>
    </NextDetailListContainer>
  );
};

export default NextDetailList;
