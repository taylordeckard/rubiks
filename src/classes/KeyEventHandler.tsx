import { EventHandler } from './EventHandler';

export class KeyEventHandler {

  private keysToStore = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

  constructor (private parent: EventHandler) {
    parent.addDocumentEventListener('onkeyup', this.onKeyChange.bind(this, true));
  }

  private onKeyChange (
    isDown: boolean,
    event: Event | KeyboardEvent | MouseEvent | TouchEvent,
  ) {
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
    }
  }
}
