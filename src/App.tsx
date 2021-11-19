import React, { useRef, useState } from 'react';
import { Main } from './classes';
import { useAnimation, useRenderer } from './hooks';
import './App.css';

function App() {
  const [appRef, setAppRef] = useState<HTMLDivElement | null>(null);
  const main = useRef(new Main());
  useAnimation(main);
  useRenderer(appRef, main);

  return (
    <div className="App" ref={setAppRef} />
  );
}

export default App;
