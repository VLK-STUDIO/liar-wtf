import type * as Party from "partykit/server";
import { Game } from "~/party/game";
import type { PartyClientRequest, GameEvent } from "~/party/types";

export default class Server implements Party.Server {
  game: Game;

  constructor(readonly party: Party.Party) {
    this.game = new Game();
  }

  static async onBeforeConnect(request: Party.Request) {
    const name = Server.getNameFromRequest(request);

    if (!name) {
      return new Response("Missing name", { status: 400 });
    }

    return request;
  }

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    const name = Server.getNameFromRequest(ctx.request)!;

    await this.game.addPlayer(
      {
        id: conn.id,
        name,
      },
      (playerId: string, event: GameEvent) => {
        const connection = this.party.getConnection(playerId);

        if (!connection) {
          console.log(
            "A player tried to send an event to a player that is not connected"
          );
          return;
        }

        Server.sendEventToConnection(connection, event);
      }
    );
  }

  async onMessage(message: string, conn: Party.Connection) {
    const event = JSON.parse(message) as PartyClientRequest;

    if (event.type === "START_GAME") {
      if (this.game.state.phase !== "LOBBY") {
        console.log(
          "A player tried to start the game without being in the LOBBY phase"
        );
        return;
      }

      if (this.game.state.players.allIds.length < 2) {
        console.log("A player tried to start the game without enough players");
        return;
      }

      if (conn.id !== this.game.state.hostId) {
        console.log("A player tried to start the game without being the host");
        return;
      }

      await this.game.startGame();
    } else if (event.type === "CHOOSE_TRUTHTELLER") {
      if (this.game.state.phase !== "GUESSING_TRUTHTELLER") {
        console.log(
          "A player tried to choose a truthteller without being in the GUESSING_TRUTHTELLER phase"
        );
        return;
      }

      if (conn.id !== this.game.state.guesserId) {
        console.log(
          "A player tried to choose a truthteller without being the guesser"
        );
        return;
      }

      await this.game.guessTruthTeller(event.playerId);
    } else {
      console.warn("Unknown event", event);
    }
  }

  async onDisconnect(conn: Party.Connection) {
    this.game.removePlayer(conn.id);

    if (this.game.state.players.allIds.length === 0) {
      this.game = new Game();
    }
  }

  static sendEventToConnection(conn: Party.Connection, event: GameEvent) {
    conn.send(JSON.stringify(event));
  }

  static getNameFromRequest(request: Party.Request) {
    const requestUrl = new URL(request.url);

    const name = requestUrl.searchParams.get("name");

    if (!name) {
      return null;
    }

    return name;
  }
}

Server satisfies Party.Worker;
