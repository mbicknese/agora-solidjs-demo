import { useParams } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";

const GameDeck = clientOnly(() => import("~/islands/game-deck"));

export default function Game() {
  const { id } = useParams<{ id: string }>();
  return (
    <main>
      <GameDeck game={id} />
    </main>
  );
}
