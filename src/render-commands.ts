export type DrawCircle = Readonly<{
  type: "drawCircle";
  id: string;
  posX: number;
  posY: number;
  radius: number;
}>;

type RenderCommand = DrawCircle;

/*
 * Commands are represented as an immutable singly-linked list (cons-list)
 * rather than a `ReadonlyArray`. The eslint-plugin-functional with
 * `prefer-immutable-types` enforcement set to "Immutable" relies on the
 * `is-immutable-type` library, which caps any type with methods (like
 * `concat`, `map`, `forEach` on arrays) at "ReadonlyDeep" — one level
 * below "Immutable". A cons-list has no methods, only readonly data
 * properties, so each branch is structurally "Immutable".
 *
 * `cons` holds the current command and a recursive reference to the
 * rest of the list. `nil` terminates the list.
 */
export type ImmutableCommands =
  | Readonly<{
      type: "cons";
      head: RenderCommand;
      tail: ImmutableCommands;
    }>
  | Readonly<{
      type: "nil";
    }>;
