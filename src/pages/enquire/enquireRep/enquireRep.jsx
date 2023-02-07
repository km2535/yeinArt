import React, { useEffect, useState } from "react";
import InputRep from "./inputRep/inputRep";
import ViewRepList from "./viewRep/viewRepList.jsx/viewRepList";

export default function EnquireRep({ enquireId, userName, fbuser }) {
  const [reply, setReply] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    fbuser?.isAdmin && setUser("관리자");
    fbuser?.isAdmin || setUser(userName);
  }, [fbuser?.isAdmin, userName]);

  return (
    <>
      <InputRep ID={enquireId} user={user} SetReadReply={setReply} />
      <ViewRepList FK_ID={enquireId} setReply={setReply} reply={reply} />
    </>
  );
}
