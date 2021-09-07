import React, { useState } from "react";
import { Sub } from "../components/Sub";

const style = {
  "sub-box": {
    width: "400px",
    height: "200px",
    backgroundColor: "darkgoldenrod",
    fontSize: "20px",
  },
};
function Todos() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <div style={style["sub-box"]}>
        <p>这是嵌套组件：</p>
        <Sub value={count} />
      </div>
    </div>
  );
}

export default Todos;
