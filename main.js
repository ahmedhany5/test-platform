const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 1.5;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }

  drew() {
    ctx.fillStyle = `red`;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fill();
  }

  update() {
    this.drew();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Platform {
  constructor(x, y) {
    this.position = {
      x,
      y,
    };

    this.width = 200;
    this.height = 20;
  }

  drew() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fill();
  }
}

const player = new Player();
const platform = new Platform();
const platforms = [new Platform(300, 500), new Platform(400, 300), new Platform(900, 200)];
const keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => {
    platform.drew();

    if (keys.right.pressed && player.position.x < 1000) {
      player.velocity.x = 5;
      platform.position.x -= 5;
    } else if (keys.left.pressed && player.position.x > 100) {
      player.velocity.x = -5;
      platform.position.x += 5;
    } else {
      player.velocity.x = 0;
    }

    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
}

addEventListener("keydown", ({ keyCode }) => {
  console.log(keyCode)
  switch (keyCode) {
    case 87:
      player.velocity.y = -30;
      break;
    case 68:
      keys.right.pressed = true;
      break;
    case 65:
      keys.left.pressed = true;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 87:
      player.velocity.y = 0;
      break;
    case 68:
      keys.right.pressed = false;
      break;
    case 65:
      keys.left.pressed = false;
      break;
  }
});

animate();
