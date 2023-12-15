import PartySocket from "partysocket";
import type { GameEvent, PartyClientRequest } from "~/party/types";

const PARTYKIT_HOST =
  import.meta.env.VITE_PARTYKIT_HOST || "http://localhost:1999";

export type StateShape =
  | {
      phase: "INIT";
    }
  | ({
      socket: PartySocket;
      userId: string;
      roomId: string;
    } & Extract<GameEvent, { type: "STATE_UPDATE" }>["payload"]["state"]);

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
        const userId = this.getUserId();

        const socket = new PartySocket({
          host: PARTYKIT_HOST,
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
    registerToPlayerConnectionEvents(
      callback: (
        event:
          | {
              type: "PLAYER_RECONNECTED";
              payload: {
                playerName: string;
              };
            }
          | {
              type: "PLAYER_DISCONNECTED";
              payload: {
                playerName: string;
              };
            }
      ) => void
    ) {
      if (this.state.phase === "INIT") return;

      function handleMessage(e: MessageEvent) {
        const event = JSON.parse(e.data) as GameEvent;

        if (
          event.type === "PLAYER_RECONNECTED" ||
          event.type === "PLAYER_DISCONNECTED"
        ) {
          console.log("Player connection event", event);

          callback(event);
        }
      }

      this.state.socket.addEventListener("message", handleMessage);

      return () => {
        if (!("socket" in this.state)) return;

        this.state.socket.removeEventListener("message", handleMessage);
      };
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
    async requestNewTopic() {
      if (this.state.phase !== "CHOOSING_TOPIC") return;

      const response = await this.socketFetch({
        type: "REQUEST_NEW_TOPIC",
      });

      console.log("New topic", response.newTopic);

      this.state.topic = response.newTopic;
    },
    getUserId() {
      const storedId = localStorage.getItem("userId");

      if (storedId) {
        return storedId;
      }

      const userId = crypto.randomUUID();

      localStorage.setItem("userId", userId);

      return userId;
    },
    async socketFetch(request: PartyClientRequest) {
      if (this.state.phase === "INIT") return;

      console.log({ host: PARTYKIT_HOST, roomId: this.state.roomId });

      const json: any = await $fetch(
        `${PARTYKIT_HOST}/parties/main/${this.state.roomId}`,
        {
          method: "POST",
          body: request,
          headers: {
            "X-User-Id": this.state.userId,
          },
        }
      );

      return json;
    },
  },
});
