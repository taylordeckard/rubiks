import { EventHandler } from './EventHandler';

export class KeyEventHandler {

  private keysToStore = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

  constructor (private parent: EventHandler) {
    document.addEventListener('keydown', this.onKeyChange.bind(this, true));
    document.addEventListener('keyup', this.onKeyChange.bind(this, false));
  }

  private onKeyChange (isDown: boolean, event: KeyboardEvent) {
    if (event instanceof KeyboardEvent && this.keysToStore.includes(event.key)) {
      const activeKey = this.parent.keys.find(activeKey => activeKey.key === event.key);
      if (isDown && !activeKey) {
        this.parent.keys.push(
          {
            key: event.key,
            stale: false,
          },
        );
      }
      if (!isDown && activeKey) {
        const idx = this.parent.keys.indexOf(activeKey);
        this.parent.keys.splice(idx, 1);
      }
    }
  }
}
