import "./index.css";
import { clientOnly } from "@solidjs/start";

const GameDeck = clientOnly(() => import("~/islands/game-deck"));

export default function Home() {
  return (
    <main>
      <p>Go to /game/any-id to see the app's functionality.</p>
    </main>
  );
}
