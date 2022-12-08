import React from "react";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    console.log("not found");
    window.location.href = "/";
  }, []);
  return <></>;
}
