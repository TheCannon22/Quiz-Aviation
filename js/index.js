/******************************************************************** Ici, il y aura toutes la section javascript pour faire marcher le quiz entier *****************************************************************************************/
/******************************************************************** Chaque section sera séparé en différente catégories dépendamment du quiz *********************************************************************************************/



/******************************************************************** Cette première section sera simple. Elle va contenir les audios du quiz. Dépendamment, si vous aviez une bonne ou une mauvaise réponse, l'un des deux sons va jouer*/

/* Les audios utilisés*/
/* Il y aura deux sons: l'un pour quand le joueur choisi la bonne réponse, l'autre quand le joueur choisi la mauvaise réponse*/
let audioQuiz = {
    /* Ceci est l'audio pour la bonne réponse*/
    bonneReponse: new Audio('Audio/bonneReponse.mp3'),
    /* Ceci est l'audio pour la mauvaise réponse*/
    mauvaiseReponse: new Audio('Audio/mauvaiseReponse.mp3'),
    /* Ceci est l'audio pour quand le quiz est officiellement terminé*/
    sonFin : new Audio("Audio/sonFin.mp3")
}

/**************************** Cette deuxième zone sert pour le curseur personnalisé : le curseur en mode carré et le thème de changement de couleur*************************/
//Variable servante à indiquer que le curseur personnalisée est null
let leCurseurAvion = null;

//On applique la fonction "controllerCurseur"
controlleCurseur();

/* Fonction servante à gérer les différentes caractéristiques de la souris et la gestion d'événements de celle-ci */
function controlleCurseur(){

    //On mentionne que leCurseurAvion se situe dans le document de classe ".souris"
    leCurseurAvion = document.querySelector(".souris");

    //Si, la fenêtre du hover a un match...
    if(window.matchMedia(" ( hover: hover ) ").matches){
        document.querySelector("body").style.cursor = "none";
        document.addEventListener("mousemove", deplacerCurseurAvion, true);

    }else{
        document.querySelector("body").style.cursor = "auto";

        leCurseurAvion.style.display = "none";

    }
}

/* Fonction servante pour faire déplacer le curseur au niveau de la page web*/
function deplacerCurseurAvion(event){
    /* On crée une variable du root et on précise dans quel document l'a trouvé*/
    let leRoot = document.querySelector(":root");

    /* On va changer au fur et à mesure la position de la souris lorsqu'elle est déplacée par l'utilisateur*/
    leRoot.style.setProperty("--mouse-x", event.clientX + "px");
    leRoot.style.setProperty("--mouse-y", event.clientY + "px");
}



/*Fonction servante à modifier le curseur lorsqu'il est en mouseover*/
function changementCurseur(event){
    /*Si elle est en mouseover, on crée une classe de survol sur l'élément donnée,sinon on l'enlève */
    if(event.type == "mouseover"){
        leCurseurAvion.classList.add("m-survol")
    }else{
        leCurseurAvion.classList.remove("m-survol");
    }
}

/**************************************************************************** Zone pour le changement de thème de couleur dépendamment de l'état du bouton de changement *******************************************/
/*Variable servante à identifier dans quel état se trouve le bouton*/
let etatDeLaCase; // - vérification de la valeur plus bas
//Variable de la case à cocher pour le choix du thème et son état enregistrée
let caseACocher = document.querySelector("#cc-boite");
/*On lui met un écouter pour que quand il est cliqué qu'il change de couleur*/
caseACocher.addEventListener("click", changementCouleur);

//On met l'état de la case dans le localStorage
etatDeLaCase = localStorage.getItem("etatDeLaCase");

/* Si l'état de la case n'est pas null...*/
if (etatDeLaCase != null) {

  /*L'état de la case sera à true et sera de type booléen, donc soit vrai ou soit faux*/
  etatDeLaCase == "true" ? (etatCase = true) : (etatCase = false);
  //On ajuste l'aspect de la case à cocher
  caseACocher.checked = etatCase;
  //On change immédiatement le thème de couleur 
  changementCouleur();
}


/* Fonction servante pour faire le changement des couleurs dépendamment de l'état du bouton*/
function changementCouleur(event) {
  //On recupère le sélecteur :root (qui sera appellé d'une mani;ere différente)
  let selecteurRoot = document.querySelector(":root");

  /*Si l'état de la case est coché...*/
  if (caseACocher.checked == true) {
        //On change les couleurs pour des couleurs plus tristes
        selecteurRoot.style.setProperty("--arriere-plan-intro", "#ffffff");
        selecteurRoot.style.setProperty("--texte-du-footer", "#4F6272 ");
        selecteurRoot.style.setProperty("--texte-des-mains", "#404E5C");

  }
  /*Sinon...*/ 
  else {
        //On met les couleurs de base de mon quiz
        selecteurRoot.style.setProperty("--arriere-plan-intro", "#cae9ff");
        selecteurRoot.style.setProperty("--texte-du-footer", "#1b4965");
        selecteurRoot.style.setProperty("--texte-des-mains", "#5fa8d3");
  }

  //On mémorise l'état de la case actuellement
  localStorage.setItem("etatDeLaCase", caseACocher.checked);
}

/******************************************************* La troisième partie sert pour le départ du quiz **************************************************/

/* Variable servante à indiquer le document où se situe le quiz en soi qui est dans le deuxième main*/

let zonePrincipaleQuiz =  document.querySelector(".quiz-en-soi");

/************************************************************************************************* Zone servante pour toutes les variables de l'introduction du quiz en soi ************************************************************************************************************/

/* Variable servante à indiquer où se situe la div pour faire l'animation de départ du titre*/
let introDebut = document.querySelector(".animation-titre-depart");

//Quand que l'animation de l'introduction de début de quiz termine, on affiche les consignes de départ du quiz expliquant au joueur les règles du jeu
introDebut.addEventListener("animationend", afficherLesConsignesDepart);

/* Fonction servante à afficher au joueur par où cliquez pour qu'après il commence le quiz*/

function afficherLesConsignesDepart(event){
    /* Si le nom de l'animation est "Rotation-intro" ... */
    if(event.animationName == "saut-intro"){
        //On crée une variable dans le premier footer de ma page qui se situe dans le premier main de mon quiz
        let footerPrincipale = document.querySelector("footer");
        //On ajoute du text à ce footer pour indiquer au joueur où appuyer pour débuter le quiz
        footerPrincipale.innerText = "Cliquez ici pour débuter le quiz et testez vos connaissances sur l'aviation";

        //On ajoute un addEventListener pour que quand le joueur click sur le footer principale du premier main, qu'il se transfert vers le début du quiz
        footerPrincipale.addEventListener("click", debutQuiz);
    }
}

//Fonction servante pour faire vraiment débuter le quiz 
function debutQuiz(){
    // Quand le quiz aura commencer, tous les éléments du main de l'introduction vont disparaître pour que des nouveaux éléments s'affichent
    document.querySelector("main.introduction").remove();

    // On enlève l'écouteur qui gère la fonction pour débuter le quiz
    window.removeEventListener("click", debutQuiz);

    //Dans la zone principale du quiz, on met le display de la page en mode flex
    zonePrincipaleQuiz.style.display = "flex";

    // On veut afficher la première question du quiz immédiatement
    afficherChaqueQuestionUneAlaFois();
}

/********************************************************** La quatrième partie est la zone des variables pour le deuxième main, donc la zone des questions en soi ********************/
/* Variable servante à placer toutes les questions dans la section du deuxième main de ma page*/
let sectionDesQuestions = document.querySelector("section");

/* Variable servante à placer les titres des questions dans le deuxième main*/
let titreQuestion = document.querySelector(".titre-page-question");

/* Variable servante à placer les différents choix d'options pour le joueur dans le deuxième main*/
let lesOptionsDeReponses = document.querySelector(".options-questions");

// Fonction servante à afficher une question à la fois après que le joueur ait répondu à la question précédente
function afficherChaqueQuestionUneAlaFois(){
    // Variable servante à prendre le tableau de toutes les questions du quiz qui vont être posées
    let boiteQuestions = lesQuestionsDuQuiz[questionRendue];

    //Mettre le titre dans la question principale posée
    titreQuestion.innerText = boiteQuestions.question;

    //On vide le contenu des choix de réponses pour que le text s'écrit lui-même
    lesOptionsDeReponses.innerHTML = "";

    //On crée une variable servante à juste donner un choix d'options pour le joueur
    let unChoix;

    //On précise que l'index des questions est à 0, que l'index est toujours plus petit que la longueur le tableau avec tous les choix de réponses et que l'index peut augmenter
    for (let i = 0; i< boiteQuestions.choix.length; i++){
        //On crée un élément dans le document qui va être une div pour chaque choix de réponse
        unChoix = document.createElement("div");
        //On ajoute une classe à ce choix qui va être nommée "choix"
        unChoix.classList.add("choix");

        //On intègre la valeur des différents choix de réponses
        unChoix.innerText = boiteQuestions.choix[i];

        //On change le curseur dependament de si le curseur est sur le choix de réponse ou non
        unChoix.addEventListener("mouseover",changementCurseur);
        unChoix.addEventListener("mouseout",changementCurseur);

        //On affecte uniquement l'index de chaque choix de réponse
        unChoix.indexChoix = i;

        //On met un écouter de "mousedown" pour faire vérifier si notre réponse est bonne ou non
        unChoix.addEventListener("mousedown", verifierReponse);

        //On affiche tous les choix possibles pour que le joueur réponde à la question
        lesOptionsDeReponses.append(unChoix);

    }

    //On crée une deuxième variable de footer qui sera le footer dans le deuxième main de la page
    let footerSecondaire = document.querySelector("footer");
    //On ajoute du text à ce footer pour indiquer au joueur que c'est moi Alexander Rankov qui a crée le quiz et en quelle année
    footerSecondaire.innerText = "Projet fait par Alexander Rankov TIM-Hiver 2023";

    //Dans chaque setion, dépendamment de la question rendue, on fait jouer chacune des animations des sections qui sont dans le CSS
    sectionDesQuestions.style.animation = `animation-${questionRendue}-section 1.5s ease-in forwards`
}




/***************************************************************************** Variables servante pour indiquer le nombre de questions au départ et le nombre de bonnes réponses au départ */
/*On commence le quiz avec aucune question, puis plus tard, ça change*/

//Variable servante à indiquer au joueur qu'il est toujours à la première question du quiz
let questionRendue = 0;

//Variable servante à indiquer au joueur qu'il n'a aucune bonne réponse au départ du quiz
let bonneReponseIdentifiee = 0;


//Fonction servante à faire vérifier si la réponse dont le joueur a choisi est bonne ou mauvaise
function verifierReponse(event){
    //On désactive tous les choix de réponses
    lesOptionsDeReponses.classList.toggle("desactiver");

    //Variable servante à indiquer quelle réponse le joueur a choisi
    let reponseChoisie = event.target.indexChoix;

    //Variable servante à indiquer la bonne réponse au joueur
    let vraieReponse = lesQuestionsDuQuiz[questionRendue].vraieReponse;

    //Si, la réponse choisie est la bonne réponse...
    if(reponseChoisie == vraieReponse){
        //On ajoute une classe sur l'élément en soi qui sera la classe "bonne-reponse"
        event.target.classList.add("bonne-reponse");

        //On fait jouer le son de bonne réponse
        audioQuiz.bonneReponse.play();

        //On augmente de 1, le nombre de bonnes réponses identifiées
        bonneReponseIdentifiee++;
    }
    //Sinon...
    else{
        //On ajoute une classe sur l'élément touché qui sera la classe "mauvaise-reponse"
        event.target.classList.add("mauvaise-reponse");
        //On fait jouer le son de la mauvaise réponse
        audioQuiz.mauvaiseReponse.play();
    }

    //On passe à la prochaine question qui suit
    event.target.addEventListener("animationend", passerALaQuestionSuivante);
}

//Cette fonction sert à passer d'une question à l'autre pour que le joueur puisse répondre à toutes les questions
function passerALaQuestionSuivante(event){
    //On désactive tous les choix de réponses
    lesOptionsDeReponses.classList.toggle("desactiver");

    //On ajoute 1 à la variable "questionRendue", donc on passe à la prochaine question
    questionRendue++;

    //Si, la question rendue est plus petite que la longueur de toutes les questions dans le code javaScript "questionsQuiz.js"...
    if(questionRendue < lesQuestionsDuQuiz.length){
        //On affiche une autre question
        afficherChaqueQuestionUneAlaFois();
    }
    //Sinon...
    else{
        //On affiche la fin du quiz en soi
        affichageFinDeQuiz();
    }
}



/*********************************************************************** Zone pour toutes les informations en lien avec la fin du quiz ******************************************/
/* variable servante pour le meilleur résultat et l'appeler "leMeilleurScore" */
let meilleurResultat = localStorage.getItem("leMeilleurScore") || 0;
//Variable servante à indiquer où se situe le main de fin de quiz
let finDuQuiz = document.querySelector(".fin-quiz");

//Variable servante à indiquer où se situe le span pour faire apparaître l'icône de fin de quiz
let btnRedemarrageJeu = document.querySelector(".fin-quiz .btn-redemarrage");

//On ajoute un écouteur au bouton de recommencer, dont chaque fois qu'on le clique, on recommence le jeux en entier
btnRedemarrageJeu.addEventListener("click", recommencerJeu);

//Fonction servante à afficher la fin du quiz officielle
function affichageFinDeQuiz(){

    /* On enlève tout ce qui est présent dans la zone principale du quiz*/
    zonePrincipaleQuiz.style.display = "none";

    //Variable servante à créer un nouveau élément de type div dans celui-ci
    let sectionResultatFinal = document.createElement("section");

    //Le meilleur resultat sera calculer à partir du nombre de bonneReponseIdentifiee pour afficher le meilleur resultat
    meilleurResultat = Math.max(meilleurResultat, bonneReponseIdentifiee);
    //On met le nom "leMeilleureScore" avec le meilleur resultat dans le localStorage
    localStorage.setItem("leMeilleurScore", meilleurResultat);

    //On ajoute du text au joueur indiquant c'est quoi son score final sur 10 et afficher le texte du meilleur résultat
    sectionResultatFinal.innerText = "votre score est de " + bonneReponseIdentifiee + "/" + lesQuestionsDuQuiz.length + "\n" + "Meilleur resultat" + meilleurResultat + "/" + lesQuestionsDuQuiz.length;

    //On ajoute une classe à la section du resultat final qui sera appelé "resultat-final"
    sectionResultatFinal.classList.add("resultat-final");

    //On met la variable de bouton recommencer avant la section du résultat final
    btnRedemarrageJeu.before(sectionResultatFinal);

    //On met le document de la section du quiz final en display flex
    finDuQuiz.style.display = "flex";

    //On fait jouer le son de fin de quiz
    audioQuiz.sonFin.play();

    // Le bouton "recommencer" est affiché à la fin de l'animation du résultat du quiz
    sectionResultatFinal.addEventListener('animationend', afficherBtnRedemmarage);

    /*Variable servante à créer un message personnalisé dépendamment du résultat du joueur*/
    let messageAuHasard = document.createElement("div");
    

    /* On ajoute à cette variable une classe du nom de "messageHasard"*/
    messageAuHasard.classList.add("messageHasard");

    /* Zone pour tous les messages qui seront affichés en fonction du résultat du joueur*/
    /* Premier message*/
    if(bonneReponseIdentifiee <= 1){
        messageAuHasard.innerText = "Ok! J'imagine tu n'as jamais voyagé?";
    }
    /* Deuxième message*/
    if(bonneReponseIdentifiee == 2){
        messageAuHasard.innerText = "Ça pouvait être pire.";
    }
    /* Troisième messsage*/
    if(bonneReponseIdentifiee == 3){
        messageAuHasard.innerText = "Tu avances bien.";
    }    
    /* Quatrième message*/
    if(bonneReponseIdentifiee == 4){
        messageAuHasard.innerText = "Presque à la moitié des bonnes réponses.";
    }    
    /* Cinquième message*/
    if(bonneReponseIdentifiee == 5){
        messageAuHasard.innerText = "C'est moyen comme résultat.";
    }   
    /* Sixième message*/
    if(bonneReponseIdentifiee == 6){
        messageAuHasard.innerText = "Tu passes ton examen.";
    }   
    /* Septième message*/
    if(bonneReponseIdentifiee == 7){
        messageAuHasard.innerText = "Bien.";
    }  
    /* Huitième message*/
    if(bonneReponseIdentifiee == 8){
        messageAuHasard.innerText = "Très bien!";
    }
    /* Neuivème message*/
    if(bonneReponseIdentifiee == 9){
        messageAuHasard.innerText = "Presque parfait! Bravo!";
    }
    /* Dixième message*/
    if(bonneReponseIdentifiee == 10){
        messageAuHasard.innerText = "Je suis convaincu que tu es pilote!";
    }

    /* On ajoute le message dépendant du résultat après le bouton de recommencement*/
    finDuQuiz.appendChild(messageAuHasard);
}

//Fonction servante à faire afficher le bouton de recommecement à la fin du quiz
function afficherBtnRedemmarage() {
    //On met l'opacité du bouton de recommencement à 1 pour le faire apparaitre
    btnRedemarrageJeu.style.opacity = "1";
}


//Fonction servante à faire recommencer le jeu en entier
function recommencerJeu(){
    //On remet toutes les variables à 0
    //On revient à la toute première question du quiz
    questionRendue = 0;

    //On remet que le nombre de bonnes réponses du joueur et égal à 0
    bonneReponseIdentifiee = 0;

    //On enlève le document servant à afficher le résultat final au joueur 
    document.querySelector(".resultat-final").remove();

    //On remet la zone principale du quiz en display flex
    zonePrincipaleQuiz.style.display = "flex";

    //On met le bouton de recommencement avec sa opacité initiale, donc 0
    btnRedemarrageJeu.style.opacity = "0";

    //On fait jouer le son de fin 
    audioQuiz.sonFin.pause();

    //On met que la fin du quiz est en display none
    finDuQuiz.style.display = "none";

    //On affiche la première question du quiz
    afficherChaqueQuestionUneAlaFois();

    /*Variable servante à créer un message personnalisé dépendamment du résultat du joueur*/
    let messageAuHasard = document.createElement("div");
    
    /*On enlève la classe "messageHasard"*/
    messageAuHasard.classList.remove("messageHasard");

    /* Pendant que la longeur des enfants de message hasard est plus grande que 0*/
    while(messageAuHasard.children.length > 0){
        /*On enlève la classe "messageHasard"*/
        messageAuHasard.classList.remove("messageHasard");
    }
}

































/*///////////////////////////////////////////////////////////////////////
                        LES VARIABLES ET GESTIONNAIRES D'ÉVÉNEMENT
///////////////////////////////////////////////////////////////////////*/



