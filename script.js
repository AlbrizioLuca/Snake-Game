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

// const collision = ( newHead , snake) => {
//     let body = snake.slice(1);
//         for (let i=0; i < body.length; i++) {
//             if( newHead.x === body[i].x &&
//                 newHead.y === body[i].y);
//             return true
//         }
//         return false
//     }

function draw(){
    context.drawImage(background, 0, 0)
    context.drawImage(souris, mouse.x, mouse.y)
    for (let i = 0; i < snake.length; i++) {
        if(i === 0){
            // context.src = 'src/snake.png'
            context.fillStyle = 'white'
        } else {
            context.fillStyle = 'lime'
        }
        context.fillRect(snake[i].x, snake[i].y,unit,unit),
        context.strokeRect(snake[i].x, snake[i].y,unit,unit),
        context.strokeStyle = 'brown'
    }
    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if (direction == 'Left') snakeX -= unit
    if (direction == 'Up') snakeY -= unit
    if (direction == 'Right') snakeX += unit
    if (direction == 'Down') snakeY += unit

    if(snakeX == mouse.x && snakeY == mouse.y){
        score++
        mouse = {
            x:Math.floor(Math.random()*19)*unit,
            y:Math.floor(Math.random()*19)*unit
        }
    }
    else {
        snake.pop()
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

    if( snakeX <= -unit || snakeX >= canvas.width ||
        snakeY <= -unit || snakeY >= canvas.height
        // collision(newHead, snake)
        ){
        clearInterval(play);
        button.style.display = 'block'
        } 
        scoreSpan.textContent = score;
}
const clickButton = () => {
    window.location.reload()
}
let play = setInterval(draw, 150)