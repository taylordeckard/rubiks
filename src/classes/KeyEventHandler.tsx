import { EventHandler } from './EventHandler';

export class KeyEventHandler {

  private keysToStore = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

  constructor (private parent: EventHandler) {
    document.onkeydown = this.onKeyChange.bind(this, true);
    document.onkeyup = this.onKeyChange.bind(this, false);
  }

  private onKeyChange (isDown: boolean, event: KeyboardEvent) {
    if (event instanceof KeyboardEvent && this.keysToStore.includes(event.key)) {
      const activeKey = this.parent.keys.find(activeKey => activeKey.key === event.key);
      if (isDown && !activeKey) {
        this.parent.keys.push({
          key: event.key,
          stale: false,
        });
      } else if (!isDown) {
        if (activeKey) {
          const index = this.parent.keys.indexOf(activeKey);
          this.parent.keys.splice(index, 1);
        }
      }
    }
  }
}
