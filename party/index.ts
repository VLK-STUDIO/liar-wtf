import { Game } from "~/party/game";
import type * as Party from "partykit/server";
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

  async onRequest(req: Party.Request) {
    if (req.method === "OPTIONS") {
      return new Response("OK", {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "POST",
        },
      });
    }

    if (req.method !== "POST") {
      return new Response("Invalid method", { status: 405 });
    }

    const userId = req.headers.get("X-User-Id");

    if (!userId) {
      return new Response("Missing user id", { status: 400 });
    }

    const body: PartyClientRequest = await req.json();

    if (body.type === "START_GAME") {
      if (this.game.state.phase !== "LOBBY") {
        console.log(
          "A player tried to start the game without being in the LOBBY phase"
        );
        return new Response("Invalid phase", { status: 400 });
      }

      if (this.game.state.players.allIds.length < 2) {
        console.log("A player tried to start the game without enough players");
        return new Response("Invalid phase", { status: 400 });
      }

      if (userId !== this.game.state.hostId) {
        console.log("A player tried to start the game without being the host");
        return new Response("Invalid phase", { status: 400 });
      }

      await this.game.startGame();

      return new Response("OK");
    }

    if (body.type === "CHOOSE_TRUTHTELLER") {
      if (this.game.state.phase !== "GUESSING_TRUTHTELLER") {
        console.log(
          "A player tried to choose a truthteller without being in the GUESSING_TRUTHTELLER phase"
        );
        return new Response("Invalid phase", { status: 400 });
      }

      if (userId !== this.game.state.guesserId) {
        console.log(
          "A player tried to choose a truthteller without being the guesser"
        );
        return new Response("Invalid phase", { status: 400 });
      }

      await this.game.guessTruthTeller(body.playerId);

      return new Response("OK");
    }

    return new Response("Unknown event", { status: 400 });
  }

  async onClose(conn: Party.Connection) {
    await this.game.removePlayer(conn.id);
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
