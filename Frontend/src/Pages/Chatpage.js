import { Box } from "@mui/material";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { useSelector } from "react-redux";
import AccountAvatar from "../components/Authentication/AccountAvatar"; // Import the AccountAvatar component
const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const user = useSelector((state) => state.user);
  const containerStyles = {
    height: "fit-content",
    maragin: "0 auto",
    backgroundColor: "whitesmoke",
    borderRadius: "7px",
    paddingRight: "15px",
    paddingBottom: "2px",
    paddingTop: "2px", // Center items vertically
  };

  return (
    <div style={{ width: "100%" }}>
      {console.log(user)}
      <AccountAvatar sx={containerStyles} />

      {user && <SideDrawer />}
      <Box d="flex" flexDirection="row">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
