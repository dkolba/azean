export const keys = new Set<string>();

/** Track pressed keys via Set<string> on keydown/keyup events. */
export const initKeyboard = (): void => {
  addEventListener("keydown", (event) => {
    keys.add(event.key);
  });

  addEventListener("keyup", (event) => {
    keys.delete(event.key);
  });
};
