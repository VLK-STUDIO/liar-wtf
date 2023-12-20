export const en = {
  layout: {
    seo: {
      description:
        "A browser game of deception, deduction, and lying your guts out. For 3 or more players.",
      keywords:
        "game, browser, deception, deduction, lying, fun, online, multiplayer, wikipedia, party, friends, among us, lupus in tabula",
    },
    footer: "Made with love and coffee at {author}",
  },
  home: {
    seoTitle: "Home",
    header: {
      description: "A game of deception, deduction, and lying your guts out.",
    },
    createRoomLink: "Create a room",
    roomCodeInput: {
      label: "Room code",
      placeholder: "Enter a room code",
    },
    rules: {
      hint: "Never played before?",
      link: "Read the rules",
    },
    joinRoomCta: "Join room",
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
      submitCta: "Join game",
    },
    pendingJoin: "Joining room...",
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
          "Have your friends join the room by entering the code {roomCode} or send them the link to this page.",
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
      you: "You",
    },
  },
  rules: {
    seoTitle: "Rules",
    homeLink: "Back to home",
  },
};
