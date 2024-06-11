import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { GameArea } from './model/game-area';
import { Snake } from './model/snake';
import { Food } from './model/food';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.css'
})

export class SnakeComponent implements AfterViewInit {
  private height!: number;
  private width!: number;
  @ViewChild("canvasRef", { static: false }) canvas!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private gameArea!: GameArea;
  private snake!: Snake;
  private food!: Food;
  private snakeVelocityX: number = 0;
  private snakeVelocityY: number = 0;
  private wallSize!: number;
  private snakeSize!: number;
  private hasTurned: boolean = false;

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.setSizes();

    this.gameArea = new GameArea(this.width, this.height, this.wallSize);
    this.snake = new Snake(150, 150, this.snakeSize);
    this.food = new Food(250, 250, this.snakeSize);

    window.requestAnimationFrame(this.gameLoop);

    window.addEventListener("keydown", (event) => {
      if (event.key == "ArrowUp" && this.snakeVelocityY != 3) {
        this.snakeVelocityY = -3;
        this.snakeVelocityX = 0;
      }
      if (event.key == "ArrowDown" && this.snakeVelocityY != -3) {
        this.snakeVelocityY = 3;
        this.snakeVelocityX = 0;
      }
      if (event.key == "ArrowLeft" && this.snakeVelocityX != 3) {
        this.snakeVelocityX = -3;
        this.snakeVelocityY = 0;
      }
      if (event.key == "ArrowRight" && this.snakeVelocityX != -3) {
        this.snakeVelocityX = 3;
        this.snakeVelocityY = 0;
      }
    })
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.setSizes();
    this.gameArea.updateDimensions(this.width, this.height, this.wallSize);
    this.snake.updateDimensions(this.width, this.height, this.snakeSize);
  }

  setSizes() {
    const parentElement = this.canvas.nativeElement.parentElement!;
    this.width = parentElement.clientWidth;
    this.height = parentElement.clientHeight;
    this.canvas.nativeElement.width = this.width;
    this.canvas.nativeElement.height = this.height;

    this.wallSize = 0.008 * Math.max(this.height, this.width);
    this.snakeSize = 0.02 * Math.max(this.height, this.width);
  }

  handleFoodEaten() {
    let randomX = Math.floor(Math.random() * this.width);
    let randomY = Math.floor(Math.random() * this.height);
    if (randomX < this.width * 0.1) {
      randomX = this.width * 0.1;
    }

    if (randomX > this.width - this.width * 0.1) {
      randomX = this.width - this.width * 0.1;
    }

    if (randomY < this.height * 0.1) {
      randomY = this.height * 0.1;
    }

    if (randomY > this.height - this.height * 0.1) {
      randomY = this.height - this.height * 0.1;
    }

    this.food = new Food(randomX, randomY, this.snakeSize);
    this.snake.addBodyPart(true);
  }




  gameLoop = () => {
    this.gameArea.draw(this.ctx);
    this.snake.move(this.snakeVelocityX, this.snakeVelocityY);
    this.snake.draw(this.ctx);
    this.food.draw(this.ctx);

    if (this.gameArea.isColliding(this.snake.getSnakeHeadX(), this.snake.getSnakeHeadY())) {
      return;
    }

    if (this.food.isColliding(this.snake.getSnakeHeadX(), this.snake.getSnakeHeadY())) {
      this.handleFoodEaten();
    }

    if (this.snake.isColliding(this.snake.getSnakeHeadX(), this.snake.getSnakeHeadY())) {
      return;
    }

    window.requestAnimationFrame(this.gameLoop);
  }


}
