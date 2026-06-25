import { PLAYER_INITIAL_X, PLAYER_INITIAL_Y } from "./constants";

type Position = Readonly<{
  posX: number;
  posY: number;
}>;

export type GameState = Readonly<{
  player: Position;
}>;

export const initialState: GameState = {
  player: {
    posX: PLAYER_INITIAL_X,
    posY: PLAYER_INITIAL_Y,
  },
};

/**
 * Update the player position by (dx, dy).
 *
 * @param state - Current game state.
 * @param dx - Horizontal delta.
 * @param dy - Vertical delta.
 * @returns A new GameState with updated player position.
 */
export const movePlayer = (
  state: Readonly<GameState>,
  dx: number,
  dy: number,
): GameState => ({
  ...state,
  player: {
    posX: state.player.posX + dx,
    posY: state.player.posY + dy,
  },
});
