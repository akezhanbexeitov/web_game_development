import { ctx, CANVAS_WIDTH, CANVAS_HEIGHT, SCALE } from './constants.js'

// Select sprite sheet from the assets
const playerImage = new Image()
playerImage.src = 'assets/shadow_dog.png'

// Set one sprite's width and height
const spriteWidth = 575
const spriteHeight = 523

// Set the player's initial state
let playerState = 'idle'

// Settings for the smooth animations
let gameFrame = 0
const staggerFrames = 5

// Calculate the all sprites' animation frames
const spriteAnimations = []
const animationStates = [
    { name: 'idle', frames: 7 },
    { name: 'jump', frames: 7 },
    { name: 'fall', frames: 7 },
    { name: 'run', frames: 9 },
    { name: 'dizzy', frames: 11 },
    { name: 'sit', frames: 5 },
    { name: 'roll', frames: 7 },
    { name: 'bite', frames: 7 },
    { name: 'ko', frames: 12 },
    { name: 'getHit', frames: 4 },
]
animationStates.forEach((state, index) => {
    let frames = {
        locations: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth
        let positionY = index * spriteHeight
        frames.locations.push({ x: positionX, y: positionY })
    }
    spriteAnimations[state.name] = frames
})

// Set the player's initial position and speed
// let playerX = Math.floor(Math.random() * CANVAS_WIDTH)
// let playerY = Math.floor(Math.random() * CANVAS_HEIGHT)
let playerX = 0
let playerY = 0
const playerSpeed = 20

// Animate the player
const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].locations.length
    let frameX = position * spriteWidth
    let frameY = spriteAnimations[playerState].locations[position].y
    let scaledWidth = spriteWidth * SCALE
    let scaledHeight = spriteHeight * SCALE
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, playerX, playerY, scaledWidth, scaledHeight);
    gameFrame++
    requestAnimationFrame(animate)
}

// Function to handle player movement
const movePlayer = (directionX, directionY) => {
    playerX += directionX * playerSpeed;
    playerY += directionY * playerSpeed;
}

// Event listener for keyboard input (example: arrow keys)
window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'KeyW':
            movePlayer(0, -1)
            break
        case 'KeyS':
            movePlayer(0, 1)
            break
        case 'KeyA':
            movePlayer(-1, 0)
            break
        case 'KeyD':
            movePlayer(1, 0)
            break
        default:
            break
    }
});

// Start the animation
animate();

