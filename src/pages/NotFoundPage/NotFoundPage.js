import FullPageHeight from "../../components/common/FullPageHeight/FullPageHeight";
import MessageBox from "../../components/common/MessageBox/MessageBox";
import { MdSearchOff } from "react-icons/md";

const NotFoundPage = ({ title }) => {
  return (
    <FullPageHeight centerElements>
      <MessageBox
        icon={<MdSearchOff />}
        title={title ?? "Page not found!"}></MessageBox>
    </FullPageHeight>
  );
};

export default NotFoundPage;
