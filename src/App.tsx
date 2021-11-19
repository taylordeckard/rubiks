import React, { useRef, useState } from 'react';
import { Main } from './classes';
import { useAnimation, useRenderer } from './hooks';
import './App.css';

function App() {
  const [appRef, setAppRef] = useState<HTMLDivElement | null>(null);
  // const mousePosition = useRef({ x: 0, y: 0 });
  // const click = useRef({
  //   cubeX: 0,
  //   cubeY: 0,
  //   isDown: false,
  //   x: 0,
  //   y: 0,
  // });
  const main = useRef(new Main());
  useAnimation(main);
  useRenderer(appRef, main);

  return (
    <div className="App" ref={setAppRef} />
  );
}

export default App;
