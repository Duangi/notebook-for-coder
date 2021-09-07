import React from "react";

const style = {
  content: {
    color: "#333",
  },
  spanSize: {
    fontSize: "24px",
  },
};

export const Sub = (prop) => {
  return (
    <div style={style.content}>
      <span>我是父元素传递过来的数据：</span>
      <span style={style.spanSize}>{prop.value}</span>
    </div>
  );
};
