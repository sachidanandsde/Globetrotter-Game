import { useState } from "react";
import QRCode from "react-qr-code";
import { challengeFriend } from "../utils/api";
import Button from "./ui/Button";

function ChallengeFriend() {
  const [friendUsername, setFriendUsername] = useState("");
  const [inviteLink, setInviteLink] = useState(null);

  const handleChallenge = async () => {
    try {
      const { data } = await challengeFriend("sachid123", friendUsername); // Use actual logged-in user
      setInviteLink(data.share_link);
    } catch (error) {
      console.error("Error challenging friend:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2>Challenge a Friend</h2>
      <input className="p-2 border rounded" type="text" placeholder="Friend's username" value={friendUsername} onChange={(e) => setFriendUsername(e.target.value)} />
      <Button className="mt-4" onClick={handleChallenge}>Generate Challenge</Button>
      {inviteLink && <QRCode value={inviteLink} className="mt-4" />}
    </div>
  );
}

export default ChallengeFriend;
