import React, { useState } from "react";

interface LocalCounterProps {
  counta: number;
}

export default function LocalCounter({ counta }: LocalCounterProps) {
  const [count, setCount] = useState(counta);

  return (
    <>
      <h1>LocalCounter</h1>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
