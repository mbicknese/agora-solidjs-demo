import "./index.css";
import { clientOnly } from "@solidjs/start";

const GameDeck = clientOnly(() => import("~/islands/game-deck"));

export default function Home() {
  return (
    <main>
      <GameDeck />
    </main>
  );
}
