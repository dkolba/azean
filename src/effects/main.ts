import { bootstrap } from "./bootstrap";
import { startGameLoop } from "./game-loop";
import { initKeyboard } from "./input";

initKeyboard();

const app = await bootstrap();
await startGameLoop(app);
