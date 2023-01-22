import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import MessageBox from "../../components/common/MessageBox/MessageBox";
import { MdSearchOff } from "react-icons/md";

const NotFoundPage = () => {
  return (
    <FullPageHeight centerElements>
      <MessageBox icon={<MdSearchOff />} title="Page not found!"></MessageBox>
    </FullPageHeight>
  );
};

export default NotFoundPage;
