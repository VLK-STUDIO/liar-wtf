export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      home: {
        seoTitle: "Home",
        header: {
          description:
            "A game of deception, deduction, and lying your guts out.",
        },
        createRoomLink: "Create a room",
        roomCodeInput: {
          label: "Room code",
          placeholder: "Enter a room code",
        },
      },
      game: {
        seoTitle: "Game {roomCode}",
        userNameForm: {
          header: {
            title: "Join Room",
            description: "Enter a name to start playing.",
          },
          nameInput: {
            label: "Name",
            placeholder: "Enter a name",
          },
          pendingJoin: "Joining room...",
        },
        toasts: {
          connectionError: {
            title: "Couldn't join game.",
            description:
              "Something went wrong while trying to join the room. Try again.",
          },
          playerDisconnected: {
            title: "A player has disconnected.",
            description: "{playerName} has lost connection",
          },
          playerReconnected: {
            title: "A player has reconnected.",
            description: "{playerName} has reconnected",
          },
        },
        lobby: {
          header: {
            title: "Room Lobby",
            description:
              "Have your friends join the room by entering the code {roomCode}.",
          },
          statusText: {
            waitingForMorePlayers: "Waiting for more players...",
            waitingForHostToStart: "Waiting for host to start the game...",
          },
          startGameCta: "Start game",
        },
        waitingForSuspectsScreen: {
          title: "You're the guesser!",
          description: "Waiting for other players to choose a topic...",
        },
        waitingForGuessScreen: {
          title: "{guesserName} is guessing who's saying the truth...",
          description: "Convince them you're the one who read about {topic}!",
        },
        choosingTopicScreen: {
          changeTopicCta: "Change topic",
        },
        scoreboard: {
          header: {
            guesserWon: {
              title: "{guesserName} has guessed correctly!",
              description:
                "{winnerName} has been awarded a point for convincing them.",
            },
            guesserLost: {
              title: "{winnerName} lied to {guesserName} and won!",
              description:
                "{winnerName} has been awarded two points for lying and winning.",
            },
          },
        },
        guessingScreen: {
          header: {
            title: 'The topic is "{topic}"',
            description: "Who do you think read about it?",
          },
          selectPlayerLabel: "Select player {playerName}",
          confirmCta: "Confirm choice",
        },
        gameOverScreen: {
          header: {
            title: "Game over!",
            description: "{winner} has won the game!",
          },
        },
        leaderboard: {
          pointsSuffix: "pts",
        },
      },
    },
  },
}));
