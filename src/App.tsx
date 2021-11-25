import React, { useContext, useState } from 'react';
import { Main } from './classes';
import { useAnimation, useRenderer } from './hooks';
import { MobileControls } from './components';
import { MainContext, mainSingleton } from './MainContext';
import './App.css';

function App() {
  const [appRef, setAppRef] = useState<HTMLDivElement | null>(null);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const main: Main = useContext(MainContext);
  useAnimation();
  useRenderer(appRef);
  main.dispatcher.addEventListener('onSelectionChange', (event) => {
    setShowMobileControls(event.hasSelection);
  });

  return (
    <MainContext.Provider value={mainSingleton}>
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
    </MainContext.Provider>
  );
}

export default App;
