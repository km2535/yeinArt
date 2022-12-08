import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./addContents.module.css";
export default function MoveControl({
  imgId,
  value,
  moveRoot,
  styleOption,
  buttonName,
  doNotMove,
  deleteHandler,
}) {
  const [root, setRoot] = useState("/");
  useEffect(() => {
    setRoot(moveRoot);
  }, [moveRoot]);
  const [top, left] = styleOption;
  return (
    <>
      {doNotMove ? (
        <button
          type="button"
          style={{ top: top.top, left: left.left }}
          className={styles.btn}
          onClick={deleteHandler}
        >
          {buttonName}
        </button>
      ) : (
        <Link to={`${root}`} state={{ imgId, value }}>
          <button
            type="button"
            style={{ top: top.top, left: left.left }}
            className={styles.btn}
          >
            {buttonName}
          </button>
        </Link>
      )}
    </>
  );
}
