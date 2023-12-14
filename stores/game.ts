import PartySocket from "partysocket";
import type { GameEvent } from "~/party/types";

export type StateShape =
  | {
      phase: "INIT";
    }
  | (
      | ({ socket: PartySocket; userId: string } & {
          phase: "LOBBY";
          hostId: string;
          players: {
            byId: {
              [id: string]: {
                name: string;
                score: number;
              };
            };
            allIds: string[];
          };
        })
      | {
          phase: "CHOOSING_TOPIC";
          topic: {
            id: string;
            title: string;
            summary: string;
          } | null;
          phaseEndsAt: number;
        }
      | {
          phase: "GUESSING_TRUTHTELLER";

          chosenTopicTitle: string;
          suspects: {
            byId: {
              [id: string]: {
                name: string;
              };
            };
            allIds: string[];
          };
        }
      | {
          phase: "WAITING_FOR_GUESS";
          chosenTopicTitle: string;
        }
      | {
          phase: "SHOWING_SCOREBOARD";
          winnerId: string;
          players: {
            byId: {
              [id: string]: {
                name: string;
                score: number;
              };
            };
            allIds: string[];
          };
          hasGuesserWon: boolean;
          phaseEndsAt: number;
        }
      | {
          phase: "GAME_OVER";
          players: {
            byId: {
              [id: string]: {
                name: string;
                score: number;
              };
            };
            allIds: string[];
          };
        }
    );

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

          if (event.type === "INIT") {
            if (this.state.phase !== "INIT") {
              return;
            }

            this.state = {
              phase: "LOBBY",
              socket,
              userId,
              hostId: event.payload.hostId,
              players: {
                byId: Object.fromEntries(
                  event.payload.players.map((player) => [
                    player.id,
                    {
                      name: player.name,
                      score: 0,
                    },
                  ])
                ),
                allIds: event.payload.players.map((player) => player.id),
              },
            };

            return resolve();
          }

          if (event.type === "PLAYER_JOINED") {
            if (this.state.phase !== "LOBBY") {
              return;
            }

            this.state.players.byId[event.payload.player.id] = {
              name: event.payload.player.name,
              score: 0,
            };

            this.state.players.allIds.push(event.payload.player.id);

            return;
          }

          if (event.type === "PLAYER_LEFT") {
            if (this.state.phase !== "LOBBY") {
              return;
            }

            delete this.state.players.byId[event.payload.playerId];

            this.state.players.allIds = this.state.players.allIds.filter(
              (id) => id !== event.payload.playerId
            );

            return;
          }

          console.log("Unexpected event", event);
        };
      });
    },
  },
});
