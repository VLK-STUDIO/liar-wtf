import { GameEvent } from "~/party/game";

export type GameEvent =
  | {
      type: "INIT";
      payload: {
        players: {
          id: string;
          name: string;
        }[];
        hostId: string;
      };
    }
  | {
      type: "PLAYER_JOINED";
      payload: {
        player: {
          id: string;
          name: string;
        };
      };
    }
  | {
      type: "PLAYER_LEFT";
      payload: {
        playerId: string;
      };
    }
  | {
      type: "CHOOSING_TOPIC_PHASE_STARTED";
      payload: {
        topic: {
          id: string;
          title: string;
          summary: string;
        } | null;
        phaseEndsAt: number;
        guesserId: string;
      };
    }
  | {
      type: "GUESSING_TRUTHTELLER_PHASE_STARTED";
      payload: {
        topicTitle: string;
      };
    }
  | {
      type: "SHOWING_SCOREBOARD_PHASE_STARTED";
      payload: {
        winnerId: string;
        playerScores: Record<string, number>;
        hasGuesserWon: boolean;
      };
    }
  | {
      type: "GAME_OVER";
      payload: {
        playerScores: Record<string, number>;
      };
    };

export type PartyClientRequest =
  | {
      type: "START_GAME";
      response: {};
    }
  | {
      type: "CHOOSE_TRUTHTELLER";
      playerId: string;
    };
