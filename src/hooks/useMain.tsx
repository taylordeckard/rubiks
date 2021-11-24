import { useMemo } from 'react';
import { Main } from '../classes';

export function useMain () {
  const main = useMemo(() => new Main(), []);
  return main;
}
