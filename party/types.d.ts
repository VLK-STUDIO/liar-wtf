import { GameEvent } from "~/party/game";

export type GameEvent =
  | {
      type: "STATE_UPDATE";
      payload: {
        state:
          | {
              phase: "LOBBY";
              hostId: string;
              players: {
                byId: {
                  [id: string]: {
                    name: string;
                  };
                };
                allIds: string[];
              };
            }
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
              guesserName: string;
            }
          | {
              phase: "SHOWING_SCOREBOARD";
              winnerId: string;
              players: {
                byId: {
                  [id: string]: {
                    name: string;
                    score: number;
                    gainedPoints?: number;
                  };
                };
                allIds: string[];
              };
              hasGuesserWon: boolean;
              guesserId: string;
              truthTellerId: string;
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
            };
      };
    }
  | {
      type: "PLAYER_DISCONNECTED";
      payload: {
        playerName: string;
      };
    }
  | {
      type: "PLAYER_RECONNECTED";
      payload: {
        playerName: string;
      };
    };

export type PartyClientRequest =
  | {
      type: "START_GAME";
      options: {
        maxRounds: number;
      };
    }
  | {
      type: "CHOOSE_TRUTHTELLER";
      playerId: string;
    }
  | {
      type: "REQUEST_NEW_TOPIC";
    };
