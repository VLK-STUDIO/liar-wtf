import type { en } from "~/translations/en";

export const fr = {
  layout: {
    seo: {
      description:
        "Un jeu de navigateur basé sur la tromperie, la déduction et le mensonge effronté. Pour 3 joueurs ou plus.",
      keywords:
        "jeu, navigateur, tromperie, déduction, mensonge, amusement, en ligne, multijoueur, wikipedia, fête, amis, among us, lupus in tabula",
    },
    footer: "Fait avec amour et café chez {author}",
  },
  home: {
    seoTitle: "Accueil",
    header: {
      description: "Un jeu de tromperie, déduction et mensonge effronté.",
    },
    createRoomLink: "Créer une salle",
    roomCodeInput: {
      label: "Code de la salle",
      placeholder: "Entrez un code de salle",
    },
    rules: {
      hint: "Jamais joué auparavant ?",
      link: "Lire les règles",
    },
    joinRoomCta: "Rejoindre la salle",
  },
  game: {
    seoTitle: "Jeu {roomCode}",
    userNameForm: {
      header: {
        title: "Rejoindre la salle",
        description: "Entrez un nom pour commencer à jouer.",
      },
      nameInput: {
        label: "Nom",
        placeholder: "Entrez un nom",
      },
      submitCta: "Rejoindre le jeu",
    },
    pendingJoin: "Rejoindre la salle...",
    toasts: {
      connectionError: {
        title: "Impossible de rejoindre le jeu.",
        description:
          "Un problème est survenu en essayant de rejoindre la salle. Réessayez.",
      },
      playerDisconnected: {
        title: "Un joueur s'est déconnecté.",
        description: "{playerName} a perdu la connexion",
      },
      playerReconnected: {
        title: "Un joueur s'est reconnecté.",
        description: "{playerName} s'est reconnecté",
      },
    },
    lobby: {
      header: {
        title: "Lobby de la salle",
        description:
          "Invitez vos amis à rejoindre la salle en entrant le code {roomCode} ou en leur envoyant le lien vers cette page.",
      },
      statusText: {
        waitingForMorePlayers: "En attente de plus de joueurs...",
        waitingForHostToStart: "En attente que l'hôte démarre le jeu...",
      },
      startGameCta: "Démarrer le jeu",
    },
    waitingForSuspectsScreen: {
      title: "Vous êtes le devineur !",
      description: "En attente que les autres joueurs choisissent un sujet...",
    },
    waitingForGuessScreen: {
      title: "{guesserName} essaie de deviner qui dit la vérité...",
      description:
        "Convainquez-les que c'est vous qui avez lu à propos de {topic} !",
    },
    choosingTopicScreen: {
      changeTopicCta: "Changer de sujet",
    },
    scoreboard: {
      header: {
        guesserWon: {
          title: "{guesserName} a bien deviné !",
          description: "{winnerName} a reçu un point pour l'avoir convaincu.",
        },
        guesserLost: {
          title: "{winnerName} a menti à {guesserName} et a gagné !",
          description:
            "{winnerName} a reçu deux points pour avoir menti et gagné.",
        },
      },
    },
    guessingScreen: {
      header: {
        title: 'Le sujet est "{topic}"',
        description: "Qui pensez-vous a lu à ce sujet ?",
      },
      selectPlayerLabel: "Sélectionner le joueur {playerName}",
      confirmCta: "Confirmer le choix",
    },
    gameOverScreen: {
      header: {
        title: "Fin du jeu !",
        description: "{winner} a remporté la partie !",
      },
    },
    leaderboard: {
      pointsSuffix: "pts",
      you: "Vous",
    },
  },
  rules: {
    seoTitle: "Règles",
    homeLink: "Retour à l'accueil",
  },
  error: {
    title: "Oups ! Quelque chose s'est mal passé.",
    description: "Apparemment, cette page n'a pas pu être chargée.",
    homeLink: "Retour à l'accueil",
  },
} satisfies typeof en;
