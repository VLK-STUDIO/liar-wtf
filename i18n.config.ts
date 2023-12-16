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
    it: {
      home: {
        seoTitle: "Home",
        header: {
          description: "Un gioco di inganno, deduzione e bugie.",
        },
        createRoomLink: "Crea una stanza",
        roomCodeInput: {
          label: "Codice stanza",
          placeholder: "Inserisci un codice stanza",
        },
      },
      game: {
        seoTitle: "Gioco {roomCode}",
        userNameForm: {
          header: {
            title: "Unisciti alla stanza",
            description: "Inserisci un nome per iniziare a giocare.",
          },
          nameInput: {
            label: "Nome",
            placeholder: "Inserisci un nome",
          },
          pendingJoin: "Unendoti alla stanza...",
        },
        toasts: {
          connectionError: {
            title: "Impossibile unirsi alla stanza.",
            description:
              "Qualcosa è andato storto mentre si cercava di unirsi alla stanza. Riprova.",
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
              "Fai entrare i tuoi amici nella stanza inserendo il codice {roomCode}.",
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
    },
  },
}));
