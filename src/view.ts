import type { GameState } from "./domain";
import type { ImmutableCommands } from "./render-commands";

/**
 * Pure function: GameState → ImmutableCommands (cons-list).
 * Each render command is wrapped in a `cons` cell; the last cell
 * is `nil`. The cons-list satisfies the "Immutable" enforcement
 * because it has no methods, unlike `ReadonlyArray` which is
 * capped at "ReadonlyDeep" by the `is-immutable-type` library.
 *
 * @param state - Current game state.
 * @returns An immutable cons-list of render commands.
 */
export const view = (state: GameState): ImmutableCommands => ({
  head: {
    id: "player",
    posX: state.player.posX,
    posY: state.player.posY,
    radius: 20,
    type: "drawCircle",
  },
  tail: {
    type: "nil",
  },
  type: "cons",
});
