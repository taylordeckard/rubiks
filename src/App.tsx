import React, { useState } from 'react';
import { Main } from './classes';
import { useAnimation, useMain, useRenderer } from './hooks';
import { MobileControls } from './components';
import './App.css';

function App() {
  const [appRef, setAppRef] = useState<HTMLDivElement | null>(null);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const main: Main = useMain();
  useAnimation(main);
  useRenderer(appRef, main);
  main.dispatcher.addEventListener('onSelectionChange', (event) => {
    setShowMobileControls(event.hasSelection);
  });

  return (
    <>
      <MobileControls
        show={showMobileControls}
        onClickCW={() => main?.eventHandler.keys.push({
          key: 'ArrowRight',
          stale: false,
        })}
        onClickCCW={() => main?.eventHandler.keys.push({
          key: 'ArrowLeft',
          stale: false,
        })}
      />
      <div className="App" ref={setAppRef} />
    </>
  );
}

export default App;
