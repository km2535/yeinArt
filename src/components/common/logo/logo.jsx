import React, { useEffect, useRef } from "react";

const Logo = ({ props }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasWidth = props.width;
    const canvasHeight = props.height;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext("2d");
    drawingTitle(ctx);
    drawingBody(ctx);
    // 기본 로고 보이기
    function drawingTitle(ctx, x, y) {
      ctx.fillStyle = "#fff";
      ctx.lineWidth = "1";
      ctx.beginPath();
      ctx.rect(0, 0, canvasWidth / 4, canvasHeight / 3);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#000000";
      ctx.font = `${props.width / 5.5}px Verdana`;
      ctx.fillText("예", `${props.width / 30}`, `${props.height / 3.6}`);

      ctx.beginPath();
      if (x || y) {
        ctx.arc(
          props.width / 13 + x / 10,
          props.height / 8.5 + y / 4,
          5,
          0,
          Math.PI * 2,
          false
        );
      } else {
        ctx.arc(props.width / 11.5, props.height / 7, 5, 0, Math.PI * 2, false);
      }
      ctx.fill();

      ctx.fillStyle = "#FED501";
      ctx.beginPath();
      ctx.rect(canvasWidth / 4, 0, canvasWidth / 4, canvasHeight / 3);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.font = `${props.width / 5.5}px Verdana`;
      ctx.fillText("인", `${props.width / 3.5}`, `${props.height / 3.6}`);

      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.rect(canvasWidth / 2, 0, canvasWidth / 4, canvasHeight / 3);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#000000";
      ctx.font = `${props.width / 5.5}px Verdana`;
      ctx.fillText("아", `${props.width / 1.9}`, `${props.height / 3.6}`);

      ctx.beginPath();
      if (x || y) {
        ctx.arc(
          props.width / 1.75 + x / 6.5,
          props.height / 8.5 + y / 4,
          5,
          0,
          Math.PI * 2,
          false
        );
      } else {
        ctx.arc(props.width / 1.7, props.height / 7, 5, 0, Math.PI * 2, false);
      }
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.rect(
        canvasWidth / 2 + canvasWidth / 4,
        0,
        canvasWidth / 4,
        canvasHeight / 3
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#000000";
      ctx.font = `${props.width / 5.5}px Verdana`;
      ctx.fillText("트", `${props.width / 1.3}`, `${props.height / 3.6}`);
    }

    function drawingBody(ctx) {
      ctx.lineWidth = "1";
      ctx.beginPath();
      ctx.fillStyle = "#D30F13";
      ctx.rect(1, canvasHeight / 3, canvasWidth / 8, canvasHeight / 2.5);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#D30F13";
      ctx.rect(
        1,
        canvasHeight / 1.356,
        canvasWidth / 8,
        canvasHeight / 4 + 1.5
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.rect(
        canvasWidth / 7.7,
        canvasHeight / 3,
        canvasWidth / 8.5,
        canvasHeight / 2.5
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.rect(
        canvasWidth / 7.7,
        canvasHeight / 1.356,
        canvasWidth / 8.5,
        canvasHeight / 4 + 1.5
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#2C59C0";
      ctx.rect(
        canvasWidth / 4,
        canvasHeight / 3,
        canvasWidth / 4,
        canvasHeight / 6
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.rect(
        canvasWidth / 4,
        canvasHeight / 2,
        canvasWidth / 4,
        canvasHeight / 2 - 1
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.rect(
        canvasWidth / 2 + 1,
        canvasHeight / 3,
        canvasWidth / 2.7,
        canvasHeight / 4.55
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.rect(
        canvasWidth / 2 + 1,
        canvasHeight / 1.8,
        canvasWidth / 2.7,
        canvasHeight / 4.55
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#2C59C0";
      ctx.rect(
        canvasWidth / 2 + 1,
        canvasHeight / 1.29,
        canvasWidth / 2.7,
        canvasHeight / 4.55
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#FED501";
      ctx.rect(
        canvasWidth / 1.14,
        canvasHeight / 3,
        canvasWidth / 8.3,
        canvasHeight / 3
      );
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.rect(
        canvasWidth / 1.14,
        canvasHeight / 3 + canvasHeight / 3,
        canvasWidth / 8.3,
        canvasHeight / 3.05
      );
      ctx.stroke();
      ctx.fill();
    }
    canvas.onmousemove = (event) => {
      // 마우스 이벤트 적용시키기
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const x = (event.clientX - ctx.canvas.offsetLeft) / 4;
      const y = (event.clientY - ctx.canvas.offsetTop) / 3;
      //console.log(x, y);
      drawingTitle(ctx, x, y);
      drawingBody(ctx);
    };
  });

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Logo;
