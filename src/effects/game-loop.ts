import { initDevtools } from "@pixi/devtools";
import type { Application } from "pixi.js";

import { NO_MOVEMENT, PLAYER_SPEED } from "../constants";
import { initialState, movePlayer } from "../domain";
import { view } from "../view";
import { keys } from "./input";
import { runCommands } from "./pixi-interpreter";

/**
 * Run the main game loop: read input, update state, render.
 *
 * @param app - The Pixi Application instance.
 */
export const startGameLoop = async (app: Application): Promise<void> => {
  const game = {
    state: initialState,
  };

  await initDevtools({ app });

  app.ticker.add(() => {
    const dx =
      (keys.has("ArrowRight") ? PLAYER_SPEED : NO_MOVEMENT) -
      (keys.has("ArrowLeft") ? PLAYER_SPEED : NO_MOVEMENT);

    const dy =
      (keys.has("ArrowDown") ? PLAYER_SPEED : NO_MOVEMENT) -
      (keys.has("ArrowUp") ? PLAYER_SPEED : NO_MOVEMENT);

    game.state = movePlayer(game.state, dx, dy);

    const commands = view(game.state);

    runCommands(app, commands);
  });
};
