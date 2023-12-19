export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
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
          description:
            "A game of deception, deduction, and lying your guts out.",
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
      rules: {
        seoTitle: "Rules",
      },
    },
    it: {
      layout: {
        seo: {
          description:
            "Un gioco nel browser di inganno, deduzione e bugie. Per 3 o più giocatori.",
          keywords:
            "gioco, browser, inganno, deduzione, bugie, divertimento, online, multiplayer, wikipedia, party, amici, among us, lupus in tabula",
        },
        footer: "Creato con amore e caffè da {author}",
      },
      home: {
        seoTitle: "Home",
        header: {
          description: "Un gioco di inganno, deduzione e bugie.",
        },
        createRoomLink: "Crea una partita",
        roomCodeInput: {
          label: "Codice partita",
          placeholder: "Inserisci un codice partita",
        },
        rules: {
          hint: "Non hai mai giocato prima?",
          link: "Leggi le regole",
        },
        joinRoomCta: "Unisciti alla partita",
      },
      game: {
        seoTitle: "Gioco {roomCode}",
        userNameForm: {
          header: {
            title: "Unisciti alla partita",
            description: "Inserisci un nome per iniziare a giocare.",
          },
          nameInput: {
            label: "Nome",
            placeholder: "Inserisci un nome",
          },
          submitCta: "Unisciti alla partita",
        },
        pendingJoin: "Accesso in corso...",
        toasts: {
          connectionError: {
            title: "Impossibile unirsi alla partita.",
            description:
              "Qualcosa è andato storto mentre si cercava di unirsi alla partita. Riprova.",
          },
          playerDisconnected: {
            title: "Un giocatore si è disconnesso.",
            description: "{playerName} ha perso la connessione",
          },
          playerReconnected: {
            title: "Un giocatore si è riconnesso.",
            description: "{playerName} si è riconnesso",
          },
        },
        lobby: {
          header: {
            title: "Lobby",
            description:
              "Fai entrare i tuoi amici alla partita inserendo il codice {roomCode}.",
          },
          statusText: {
            waitingForMorePlayers: "In attesa di altri giocatori...",
            waitingForHostToStart: "In attesa che l'host inizi la partita...",
          },
          startGameCta: "Inizia la partita",
        },
        waitingForSuspectsScreen: {
          title: "Sei il giocatore che deve indovinare!",
          description:
            "In attesa che gli altri giocatori scelgano un argomento...",
        },
        waitingForGuessScreen: {
          title: "{guesserName} sta indovinando chi sta dicendo la verità...",
          description:
            "Convincilo che sei tu quello che ha letto l'argomento {topic}!",
        },
        choosingTopicScreen: {
          changeTopicCta: "Cambia argomento",
        },
        scoreboard: {
          header: {
            guesserWon: {
              title: "{guesserName} ha indovinato correttamente!",
              description:
                "{winnerName} ha ricevuto un punto per averlo convinto.",
            },
            guesserLost: {
              title: "{winnerName} ha mentito a {guesserName} e ha vinto!",
              description:
                "{winnerName} ha ricevuto due punti per aver mentito e vinto.",
            },
          },
        },
        guessingScreen: {
          header: {
            title: 'L\'argomento è "{topic}"',
            description: "Chi pensi che lo abbia letto?",
          },
          selectPlayerLabel: "Seleziona il giocatore {playerName}",
          confirmCta: "Conferma scelta",
        },
        gameOverScreen: {
          header: {
            title: "Game over!",
            description: "{winner} ha vinto la partita!",
          },
        },
        leaderboard: {
          pointsSuffix: "pt",
        },
      },
      rules: {
        seoTitle: "Regole",
      },
    },
  },
}));
