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
      return Server.createResponse({ error: "Missing name" }, 400);
    }

    return request;
  }

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    const name = Server.getNameFromRequest(ctx.request)!;
    const locale = Server.getLocaleFromRequest(ctx.request)!;

    await this.game.addPlayer(
      {
        id: conn.id,
        name,
        locale,
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
      return Server.createResponse({ success: true });
    }

    if (req.method !== "POST") {
      return Server.createResponse({ error: "Invalid method" }, 400);
    }

    const userId = req.headers.get("X-User-Id");

    if (!userId) {
      return Server.createResponse({ error: "Missing user id" }, 400);
    }

    const body: PartyClientRequest = await req.json();

    if (body.type === "START_GAME") {
      if (this.game.state.phase !== "LOBBY") {
        console.log(
          "A player tried to start the game without being in the LOBBY phase"
        );
        return Server.createResponse({ error: "Invalid phase" }, 400);
      }

      if (this.game.state.players.allIds.length < 2) {
        console.log("A player tried to start the game without enough players");
        return Server.createResponse({ error: "Not enough players" }, 400);
      }

      if (userId !== this.game.state.hostId) {
        console.log("A player tried to start the game without being the host");
        return Server.createResponse({ error: "Unauthorized" }, 401);
      }

      await this.game.startGame();

      return Server.createResponse({ success: true });
    }

    if (body.type === "CHOOSE_TRUTHTELLER") {
      if (this.game.state.phase !== "GUESSING_TRUTHTELLER") {
        console.log(
          "A player tried to choose a truthteller without being in the GUESSING_TRUTHTELLER phase"
        );
        return Server.createResponse({ error: "Invalid phase" }, 400);
      }

      if (userId !== this.game.state.guesserId) {
        console.log(
          "A player tried to choose a truthteller without being the guesser"
        );
        return Server.createResponse({ error: "Unauthorized" }, 401);
      }

      await this.game.guessTruthTeller(body.playerId);

      return Server.createResponse({ success: true });
    }

    if (body.type === "REQUEST_NEW_TOPIC") {
      if (this.game.state.phase !== "CHOOSING_TOPIC") {
        console.log(
          "A player tried to request a new topic without being in the CHOOSING_TOPIC phase"
        );
        return Server.createResponse({ error: "Invalid phase" }, 400);
      }

      const newTopic = await this.game.changePlayerTopic(userId);

      return Server.createResponse({ newTopic });
    }

    return Server.createResponse({ error: "Invalid request" }, 400);
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

  static getLocaleFromRequest(request: Party.Request) {
    const requestUrl = new URL(request.url);

    const locale = requestUrl.searchParams.get("locale");

    if (!locale) {
      return null;
    }

    return locale;
  }

  static createResponse(body: any, status = 200) {
    return new Response(JSON.stringify(body), {
      status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST",
        "Content-Type": "application/json",
      },
    });
  }
}

Server satisfies Party.Worker;
