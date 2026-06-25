import { type Application, Graphics } from "pixi.js";

import { CIRCLE_ORIGIN, PLAYER_COLOR } from "../constants";
import type { DrawCircle, ImmutableCommands } from "../render-commands";

const graphicsById = new Map<string, Graphics>();

const renderCircle = (
  app: Readonly<Application>,
  command: DrawCircle,
): void => {
  const existingGraphic = graphicsById.get(command.id);

  const graphic =
    existingGraphic ??
    ((): Graphics => {
      const freshGraphic = new Graphics();

      freshGraphic
        .circle(CIRCLE_ORIGIN, CIRCLE_ORIGIN, command.radius)
        .fill(PLAYER_COLOR);

      app.stage.addChild(freshGraphic);

      graphicsById.set(command.id, freshGraphic);

      return freshGraphic;
    })();

  graphic.position.set(command.posX, command.posY);
};

/**
 * Impure interpreter: walks the immutable cons-list, processing
 * each render command as a side effect on the Pixi Application.
 * The discriminated union (`cons` | `nil`) is narrowed by the
 * nil-guard, so `commands.head` and `commands.tail` are
 * accessible on the `cons` branch. Recursion replaces what was
 * previously a `commands.forEach` loop over a `ReadonlyArray`.
 *
 * @param app - The Pixi Application instance.
 * @param commands - Immutable cons-list of render commands.
 */
export const runCommands = (
  app: Readonly<Application>,
  commands: ImmutableCommands,
): void => {
  if (commands.type === "nil") {
    return;
  }

  const command = commands.head;
  switch (command.type) {
    case "drawCircle": {
      renderCircle(app, command);
      break;
    }
    default: {
      break;
    }
  }

  runCommands(app, commands.tail);
};
