import type { GameEvent } from "~/party/types";

type GameState = {
  phase:
    | "LOBBY"
    | "CHOOSING_TOPIC"
    | "GUESSING_TRUTHTELLER"
    | "SHOWING_SCOREBOARD"
    | "GAME_OVER";
  hostId: string | null;
  guesserId: string | null;
  truthtellerId: string | null;
  players: {
    byId: Record<
      string,
      {
        name: string;
        score: number;
        topicId: string | null;
        disconnected?: boolean;
      }
    >;
    allIds: string[];
  };
  topics: Record<
    string,
    {
      id: string;
      title: string;
      summary: string;
    }
  >;
  currentPhaseEndsAt?: number;
};

type Notifier = (playerId: string, event: GameEvent) => void;

export class Game {
  static TIME_TO_CHOOSE_TOPIC = 30000;
  static TIME_TO_SHOW_SCOREBOARD = 10000;

  state: GameState = {
    phase: "LOBBY",
    hostId: null,
    guesserId: null,
    truthtellerId: null,
    players: {
      byId: {},
      allIds: [],
    },
    topics: {},
  };

  notifier?: Notifier;

  async addPlayer(player: { id: string; name: string }, notifier: Notifier) {
    this.notifier = notifier;

    if (this.state.players.byId[player.id]) {
      this.state.players.byId[player.id].disconnected = false;

      for (const playerId of this.state.players.allIds) {
        if (playerId === player.id) {
          continue;
        }

        this.notifier(playerId, {
          type: "PLAYER_RECONNECTED",
          payload: {
            playerName: this.state.players.byId[player.id].name,
          },
        });
      }

      this.notifier(player.id, {
        type: "STATE_UPDATE",
        payload: this.computeCurrentGameEventForPlayer(player.id),
      });

      return;
    }

    if (this.state.phase !== "LOBBY") {
      console.log("Player tried to join after game started");

      return;
    }

    this.state.players.byId[player.id] = {
      name: player.name,
      score: 0,
      topicId: null,
    };

    this.state.players.allIds.push(player.id);

    if (this.state.hostId === null) {
      this.state.hostId = player.id;
    }

    for (const playerId of this.state.players.allIds) {
      this.notifier(playerId, {
        type: "STATE_UPDATE",
        payload: {
          state: {
            phase: this.state.phase,
            hostId: this.state.hostId,
            players: this.state.players,
          },
        },
      });
    }
  }

  async removePlayer(disconnectedPlayerId: string) {
    if (this.state.phase === "LOBBY") {
      this.state.players.allIds = this.state.players.allIds.filter(
        (id) => id !== disconnectedPlayerId
      );

      delete this.state.players.byId[disconnectedPlayerId];

      if (this.state.hostId === disconnectedPlayerId) {
        this.state.hostId = this.state.players.allIds[0] || null;
      }

      for (const playerId of this.state.players.allIds) {
        this.notifier?.(playerId, {
          type: "STATE_UPDATE",
          payload: {
            state: {
              phase: this.state.phase,
              hostId: this.state.hostId!,
              players: this.state.players,
            },
          },
        });
      }

      return;
    }

    this.state.players.byId[disconnectedPlayerId].disconnected = true;

    for (const playerId of this.state.players.allIds) {
      if (playerId === disconnectedPlayerId) {
        continue;
      }

      this.notifier?.(playerId, {
        type: "PLAYER_DISCONNECTED",
        payload: {
          playerName: this.state.players.byId[disconnectedPlayerId].name,
        },
      });
    }
  }

  async startGame() {
    await this.startNewRound();
  }

  async startNewRound() {
    this.state.phase = "CHOOSING_TOPIC";
    this.state.guesserId = this.getNextGuesserId();
    this.state.topics = await this.fetchTopicsForPlayers();
    this.state.truthtellerId = this.getNextTruthTellerId();
    this.state.currentPhaseEndsAt = Date.now() + Game.TIME_TO_CHOOSE_TOPIC;

    for (const playerId of this.state.players.allIds) {
      this.notifier?.(playerId, {
        type: "STATE_UPDATE",
        payload: {
          state: {
            phase: this.state.phase,
            phaseEndsAt: this.state.currentPhaseEndsAt,
            topic:
              playerId === this.state.guesserId
                ? null
                : this.state.topics[playerId],
          },
        },
      });
    }

    setTimeout(() => {
      this.startGuessingTruthTeller();
    }, Game.TIME_TO_CHOOSE_TOPIC);
  }

  async guessTruthTeller(guessId: string) {
    if (this.state.phase !== "GUESSING_TRUTHTELLER") {
      throw new Error("Invalid phase");
    }

    const isGuesserCorrect = guessId === this.state.truthtellerId;

    if (isGuesserCorrect) {
      this.state.players.byId[this.state.guesserId!].score += 1;
    }

    this.state.players.byId[guessId!].score +=
      this.state.truthtellerId === guessId ? 1 : 2;

    this.state.phase = "SHOWING_SCOREBOARD";
    this.state.currentPhaseEndsAt = Date.now() + Game.TIME_TO_SHOW_SCOREBOARD;

    for (const playerId of this.state.players.allIds) {
      this.notifier?.(playerId, {
        type: "STATE_UPDATE",
        payload: {
          state: {
            phase: this.state.phase,
            phaseEndsAt: this.state.currentPhaseEndsAt,
            winnerId: guessId,
            hasGuesserWon: isGuesserCorrect,
            players: {
              byId: {
                ...this.state.players.byId,
                [this.state.guesserId!]: {
                  ...this.state.players.byId[this.state.guesserId!],
                  gainedPoints: isGuesserCorrect ? 1 : 0,
                },
                [guessId]: {
                  ...this.state.players.byId[guessId],
                  gainedPoints: isGuesserCorrect ? 1 : 2,
                },
              },
              allIds: this.state.players.allIds,
            },
            guesserId: this.state.guesserId!,
            truthTellerId: this.state.truthtellerId!,
          },
        },
      });
    }

    setTimeout(() => {
      if (
        this.state.players.allIds.indexOf(this.state.guesserId!) ===
        this.state.players.allIds.length - 1
      ) {
        this.endGame();
        return;
      }

      this.startNewRound();
    }, Game.TIME_TO_SHOW_SCOREBOARD);
  }

  async changePlayerTopic(playerId: string) {
    if (this.state.phase !== "CHOOSING_TOPIC") {
      console.log("Player tried to change topic while not in the right phase");
      return;
    }

    const topic = await Game.fetchRandomTopic();

    this.state.topics[playerId] = topic;

    return topic;
  }

  private async endGame() {
    this.state.phase = "GAME_OVER";

    for (const playerId of this.state.players.allIds) {
      this.notifier?.(playerId, {
        type: "STATE_UPDATE",
        payload: {
          state: {
            phase: "GAME_OVER",
            players: this.state.players,
          },
        },
      });
    }
  }

  private async startGuessingTruthTeller() {
    this.state.phase = "GUESSING_TRUTHTELLER";

    this.notifier?.(this.state.guesserId!, {
      type: "STATE_UPDATE",
      payload: {
        state: {
          phase: this.state.phase,
          chosenTopicTitle: this.state.topics[this.state.truthtellerId!].title,
          suspects: {
            byId: Object.fromEntries(
              this.state.players.allIds
                .filter((id) => id !== this.state.guesserId)
                .map((id) => [
                  id,
                  {
                    name: this.state.players.byId[id].name,
                  },
                ])
            ),
            allIds: this.state.players.allIds.filter(
              (id) => id !== this.state.guesserId
            ),
          },
        },
      },
    });

    for (const playerId of this.state.players.allIds) {
      if (playerId === this.state.guesserId) {
        continue;
      }

      this.notifier?.(playerId, {
        type: "STATE_UPDATE",
        payload: {
          state: {
            phase: "WAITING_FOR_GUESS",
            chosenTopicTitle:
              this.state.topics[this.state.truthtellerId!].title,
            guesserName: this.state.players.byId[this.state.guesserId!].name,
          },
        },
      });
    }
  }

  private async fetchTopicsForPlayers() {
    const playerIdsWithoutGuesser = this.state.players.allIds.filter(
      (playerId) => playerId !== this.state.guesserId
    );

    let result: Record<string, any> = {};

    for (const playerId of playerIdsWithoutGuesser) {
      result[playerId] = await Game.fetchRandomTopic();
    }

    return result;
  }

  private getNextGuesserId() {
    if (!this.state.guesserId) {
      return this.state.players.allIds[0];
    }

    const guesserIndex = this.state.players.allIds.indexOf(
      this.state.guesserId
    );

    return this.state.players.allIds[guesserIndex + 1];
  }

  private getNextTruthTellerId() {
    const playersWithoutGuesser = this.state.players.allIds.filter(
      (playerId) => playerId !== this.state.guesserId
    );

    const index = Math.floor(Math.random() * playersWithoutGuesser.length);

    return playersWithoutGuesser[index];
  }

  private computeCurrentGameEventForPlayer(
    playerId: string
  ): Extract<GameEvent, { type: "STATE_UPDATE" }>["payload"] {
    if (this.state.phase === "LOBBY") {
      return {
        state: {
          phase: this.state.phase,
          hostId: this.state.hostId!,
          players: this.state.players,
        },
      };
    }

    if (this.state.phase === "CHOOSING_TOPIC") {
      return {
        state: {
          phase: this.state.phase,
          phaseEndsAt: this.state.currentPhaseEndsAt!,
          topic:
            playerId === this.state.guesserId
              ? null
              : this.state.topics[playerId],
        },
      };
    }

    if (this.state.phase === "GUESSING_TRUTHTELLER") {
      if (playerId === this.state.guesserId) {
        return {
          state: {
            phase: this.state.phase,
            chosenTopicTitle:
              this.state.topics[this.state.truthtellerId!].title,
            suspects: {
              byId: Object.fromEntries(
                this.state.players.allIds
                  .filter((id) => id !== this.state.guesserId)
                  .map((id) => [
                    id,
                    {
                      name: this.state.players.byId[id].name,
                    },
                  ])
              ),
              allIds: this.state.players.allIds.filter(
                (id) => id !== this.state.guesserId
              ),
            },
          },
        };
      }

      return {
        state: {
          phase: "WAITING_FOR_GUESS",
          chosenTopicTitle: this.state.topics[this.state.truthtellerId!].title,
          guesserName: this.state.players.byId[this.state.guesserId!].name,
        },
      };
    }

    if (this.state.phase === "SHOWING_SCOREBOARD") {
      return {
        state: {
          phase: this.state.phase,
          phaseEndsAt: this.state.currentPhaseEndsAt!,
          winnerId: this.state.truthtellerId!,
          hasGuesserWon: false,
          players: {
            byId: {
              ...this.state.players.byId,
              [this.state.guesserId!]: {
                ...this.state.players.byId[this.state.guesserId!],
                gainedPoints: 0,
              },
              [this.state.truthtellerId!]: {
                ...this.state.players.byId[this.state.truthtellerId!],
                gainedPoints: 2,
              },
            },
            allIds: this.state.players.allIds,
          },
          guesserId: this.state.guesserId!,
          truthTellerId: this.state.truthtellerId!,
        },
      };
    }

    if (this.state.phase === "GAME_OVER") {
      return {
        state: {
          phase: "GAME_OVER",
          players: this.state.players,
        },
      };
    }

    throw new Error("Invalid phase while computing game event for player");
  }

  static async fetchRandomTopic() {
    const response = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/random/summary"
    );

    const data = await response.json();

    return {
      id: data.id,
      title: data.title,
      summary: data.extract,
    };
  }
}
