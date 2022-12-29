import React from "react";
import { useState } from "react";
import InputRep from "./inputRep/inputRep";
import ViewRep from "./viewRep/viewRep";

export default function EnquireRep({ enquireId, userName }) {
  const [data, setData] = useState([]);
  return (
    <>
      <InputRep setData={setData} enquireNum={enquireId} userName={userName} />
      <ViewRep setData={setData} data={data} enquireNum={enquireId} />
    </>
  );
}
