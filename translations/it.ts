import type { en } from "~/translations/en";

export const it = {
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
          "Fai entrare i tuoi amici alla partita inserendo il codice {roomCode} o inviando loro il link a questa pagina.",
      },
      statusText: {
        waitingForMorePlayers: "In attesa di altri giocatori...",
        waitingForHostToStart: "In attesa che l'host inizi la partita...",
      },
      startGameCta: "Inizia la partita",
    },
    waitingForSuspectsScreen: {
      title: "Sei il giocatore che deve indovinare!",
      description: "In attesa che gli altri giocatori scelgano un argomento...",
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
          description: "{winnerName} ha ricevuto un punto per averlo convinto.",
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
} satisfies typeof en;
