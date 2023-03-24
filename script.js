// Cibler la balise canvas où se déroulera le jeu
const canvas = document.querySelector('#canvas');
// Cibler la partie supérieurre où on affichera le score
const scoreSpan = document.querySelector('.score');
// Cibler le bouton qui servira à (re)démarrer la partie
const button = document.querySelector('.replay');

// Définir le score à 0
let score = 0;
// Définir la définition sur 2D
const context = canvas.getContext('2d');

// Insérer les images et sons que l'on voudra lors du jeu
const background = new Image();
background.src = 'src/sand.jpg';

const souris = new Image();
souris.src = 'src/souris.png';

// Définir l'unité de mesure afin de calibrer les déplacements
const unit = 30;

// Définir l'emplacement de facon aléatoire de la souris
let mouse = {
    x:Math.floor(Math.random()*19)*unit,
    y:Math.floor(Math.random()*19)*unit
}

// Définir le tableau répresentant le serpent
const snake = [];
// Positionner le premier élément réprésentant la tete au centre
snake[0] = {
    x:10*unit,
    y:10*unit
}

let direction = null;

// Gérer la direction du snake et éviter les "marches arrières"
document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft' && direction != 'Right'){
        direction = 'Left';
    }
    else if (event.key == "ArrowUp" && direction != 'Down'){
        direction = 'Up';
    }
    else if (event.key == "ArrowRight" && direction != 'Left'){
        direction = 'Right';
    }
    else if (event.key == "ArrowDown" && direction != 'Up'){
        direction = 'Down';
    }
})

// Définir s'il y a une collision du snake sur lui-même
const collision = ( newHead , snake) => {
    // Récupérer le corps du snake sans sa tête, qui est le premier index du tableau
    let body = snake.slice(1);
    // Si la position de la tête correspond à la position d'une partie du snake, alors collision
    for (let i = 0; i < body.length; i++) {
        if ( newHead.x === body[i].x && newHead.y === body[i].y) {
            return true;
        }
    }
    // Sinon pas de collision et le jeu continue
    return false;
}

// Créer le canvas
function draw(){
    context.drawImage(background, 0, 0) // le background du jeu
    context.drawImage(souris, mouse.x, mouse.y) // la souris
    // Dessiner la tete et le corps du serpent avec deux couleurs distinctes
    for (let i = 0; i < snake.length; i++) { 
        // Tete à l'index 0 du tableau
        if(i === 0){
            context.fillStyle = 'white'
        // Restant du corps
        } else {
            context.fillStyle = 'lime'
        }
        // Dessiner le contour du serpent
        context.fillRect(snake[i].x, snake[i].y,unit,unit), // remplit le rectangle 
        context.strokeRect(snake[i].x, snake[i].y,unit,unit), // dessine le contour du rectangle
        context.strokeStyle = 'brown'
    }
    // Définir la position de la tete du serpent
    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    // Initier le déplacement en fonction de la direction
    if (direction == 'Left') snakeX -= unit
    if (direction == 'Up') snakeY -= unit
    if (direction == 'Right') snakeX += unit
    if (direction == 'Down') snakeY += unit

    // Si la position de la tête est la même que celle de la souris
    if (snakeX == mouse.x && snakeY == mouse.y){
        // Incrementer le score
        score++
        // Repositionner aléatoirement la souris
        mouse = {
            x:Math.floor(Math.random()*19)*unit,
            y:Math.floor(Math.random()*19)*unit
        }
    } else {
        // Sinon créer le déplacement en retirant le dernier item du snake (qui sera récupéré avec l'ajout de la nouvelle position)
        snake.pop()
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Ajouter la nouvelle position au début du snake pour le faire avancer
    snake.unshift(newHead)

    // Si on sort du cadre, ou s'il y a une collision
    if ( snakeX <= -unit || snakeX >= canvas.width || snakeY <= -unit || snakeY >= canvas.height || collision(newHead, snake)) {
        // Fin du jeu, on affiche "Game Over"
        clearInterval(play);
        button.style.display = 'block'
    }
    
    // Afficher le nouveau score
    scoreSpan.textContent = score;
}
// Relancer une partie, en cliquant sur le bouton "Game Over" pour refresh la page 
const clickButton = () => {
    window.location.reload()
}
// Définir la vitesse du jeu en ms
let play = setInterval(draw, 150);