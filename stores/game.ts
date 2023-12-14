import PartySocket from "partysocket";
import type { GameEvent, PartyClientRequest } from "~/party/types";

export type StateShape =
  | {
      phase: "INIT";
    }
  | ({
      socket: PartySocket;
      userId: string;
      roomId: string;
    } & GameEvent["payload"]["state"]);

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      state: {
        phase: "INIT",
      } as StateShape,
    };
  },
  actions: {
    connect(roomId: string, username: string) {
      return new Promise<void>((resolve, reject) => {
        const userId = crypto.randomUUID();

        const socket = new PartySocket({
          host: "localhost:1999",
          room: roomId,
          id: userId,
          query: () => {
            return {
              name: username,
            };
          },
          maxRetries: 0,
        });

        socket.onclose = () => {
          reject();
        };

        socket.onmessage = (message: MessageEvent) => {
          const event = JSON.parse(message.data) as GameEvent;

          if (event.type === "STATE_UPDATE") {
            console.log("State update", event);

            this.state = {
              socket,
              userId,
              roomId,
              ...event.payload.state,
            };

            return resolve();
          }

          console.log("Unexpected event", event);
        };
      });
    },
    async startGame() {
      await this.socketFetch({
        type: "START_GAME",
      });
    },
    async chooseTruthteller(playerId: string) {
      await this.socketFetch({
        type: "CHOOSE_TRUTHTELLER",
        playerId,
      });
    },
    async socketFetch(request: PartyClientRequest) {
      if (this.state.phase === "INIT") return;

      console.log(this.state.userId);
      await $fetch(`http://localhost:1999/parties/main/${this.state.roomId}`, {
        method: "POST",
        body: request,
        headers: {
          "X-User-Id": this.state.userId,
        },
      });
    },
  },
});
