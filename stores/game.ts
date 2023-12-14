import PartySocket from "partysocket";
import type { GameEvent } from "~/party/types";

export type StateShape =
  | {
      phase: "INIT";
    }
  | ({ socket: PartySocket; userId: string } & GameEvent["payload"]["state"]);

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
            this.state = {
              socket,
              userId,
              ...event.payload.state,
            };

            return resolve();
          }

          console.log("Unexpected event", event);
        };
      });
    },
  },
});
