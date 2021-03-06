let doorImage1 = document.getElementById("door1");
const botDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/robot.svg";
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
const beachDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/beach.svg";
const spaceDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/space.svg";
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
const closedDoorPath =
  "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";
const startButton = document.getElementById("start");
let currentlyPlaying = true;

let currentStreak = 0;
let bestStreak = 0;

const currentStreakValue = document.getElementById("current");
const bestStreakValue = document.getElementById("best");

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(door)) {
    gameOver("lose");
  }
};

const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 2) {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};

doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};

doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  }
};

const startRound = () => {
  numClosedDoors = 3;
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  startButton.innerHTML = "Good luck!";
  currentlyPlaying = true;
  randomChoreDoorGenerator();
};

const gameOver = (status) => {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
    if (bestStreak <= currentStreak) bestStreak++;
    currentStreak++;
  } else {
    startButton.innerHTML = "Game over! Play again?";
    if (bestStreak <= currentStreak) bestStreak = currentStreak;
    currentStreak = 0;
  }
  currentlyPlaying = false;
  currentStreakValue.innerHTML = currentStreak;
  bestStreakValue.innerHTML = bestStreak;
};

const updateScore = () => {
  currentStreak++;
  document.getElementById("current-streak").innerHTML = currentStreak;
};

const updateBestStreak = () => {
  if (currentStreak) {
    bestStreak++;
  }
  document.getElementById("highest-streak").innerHTML = bestStreak;
};

startRound();
