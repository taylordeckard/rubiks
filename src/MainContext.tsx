import { createContext } from 'react';
import { Main } from './classes';

export const mainSingleton = new Main();
export const MainContext = createContext(mainSingleton);

