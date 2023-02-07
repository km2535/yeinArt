import React, { useContext, useState } from "react";
import { createContext } from "react";

const EnquireContext = createContext();

export default function EnquireContextProvider({ children }) {
  const [enquire, setEnquire] = useState(false);
  const [boards, setBoards] = useState([]);
  return (
    <>
      <EnquireContext.Provider
        value={{ enquire, setEnquire, boards, setBoards }}
      >
        {children}
      </EnquireContext.Provider>
    </>
  );
}
export function useEnquireContext() {
  return useContext(EnquireContext);
}
