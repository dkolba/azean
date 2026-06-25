import { Application } from "pixi.js";

/**
 * Create and initialize the Pixi Application, appending its canvas to the DOM.
 *
 * @returns The initialized Pixi Application.
 */
export const bootstrap = async (): Promise<Application> => {
  const app = new Application();
  await app.init({
    background: "#1099bb",
    /* eslint-disable-next-line unicorn/prefer-global-this */
    resizeTo: window,
  });

  const container = document.querySelector("#pixi-container");
  if (!container) {
    throw new Error("Could not find #pixi-container");
  }

  container.append(app.canvas);
  return app;
};
