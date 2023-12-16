import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import AccountAvatar from "./Authentication/AccountAvatar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function randomID(len) {
  let result = "";
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

// Function to get URL parameters
function getUrlParams(url = window.location.href) {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

// Main App component
export default function App() {
  const id = useSelector((state) => state.user.id);
  const [hasRefreshed, setHasRefreshed] = useState(false);
  // Get roomID from URL parameters or generate a random one
  const roomID = "El7a2ni";

  // Function to handle the meeting
  const myMeeting = async (element) => {
    // Generate Kit Token
    const appID = 335578988;
    const serverSecret = "b9a23c721aabe604881e22967b033778";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      `${id}`,
      "user"
    );

    // Create an instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      showTextChat: true,
      showScreenSharingButton: true,
      showPreJoinView: true,
    });
  };

  useEffect(() => {
    // Refresh the page and navigate to it only on the first load
    if (hasRefreshed==="false") {
      setHasRefreshed(true);
      window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    }
  }, [hasRefreshed]);

  // Render the component
  return (
    <div>
      <AccountAvatar />
      <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
}
