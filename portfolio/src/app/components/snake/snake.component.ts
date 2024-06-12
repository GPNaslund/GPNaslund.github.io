import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
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
  @Input() height!: number;
  @Input() width!: number;
  @ViewChild("canvasRef", { static: false }) canvas!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private gameArea!: GameArea;
  private snake!: Snake;
  private food!: Food;
  private snakeVelocityX: number = 0;
  private snakeVelocityY: number = 0;
  private wallSize!: number;
  private snakeSize!: number;
  @Output() newGameOver: EventEmitter<void> = new EventEmitter<void>();
  private score: number = 0;

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.setSizes();

    this.gameArea = new GameArea(this.width, this.height, this.wallSize);
    this.snake = new Snake(this.width / 2, this.height / 2, this.snakeSize);
    this.addNewFood();

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

    window.addEventListener("touchstart", (event) => {
      const touchX = event.touches.item(0)?.pageX;
      const touchY = event.touches.item(0)?.pageY;
      if (touchX != undefined && touchY != undefined) {
        const xDeviation = Math.abs(touchX - this.width / 2);
        const yDeviation = Math.abs(touchY - this.height / 2);

        if (xDeviation > yDeviation) {
          if (touchX > this.width / 2 && this.snakeVelocityX != -3) {
            this.snakeVelocityX = 3;
            this.snakeVelocityY = 0;
          }
          if (touchX < this.width / 2 && this.snakeVelocityX != 3) {
            this.snakeVelocityX = -3;
            this.snakeVelocityY = 0;
          }
        }

        if (yDeviation > xDeviation) {
          if (touchY > this.height / 2 && this.snakeVelocityY != 3) {
            this.snakeVelocityY = -3;
            this.snakeVelocityX = 0;
          }
          if (touchY < this.height / 2 && this.snakeVelocityY != -3) {
            this.snakeVelocityY = 3;
            this.snakeVelocityX = 0;

          }
        }

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
    this.wallSize = 0.008 * Math.max(this.height, this.width);
    this.snakeSize = 0.02 * Math.max(this.height, this.width);
  }

  private handleFoodEaten() {
    this.addNewFood();
    this.snake.addBodyPart(true);
    this.score = this.score += 10;
  }

  private addNewFood() {
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
  }



  private gameLoop = () => {
    this.gameArea.draw(this.ctx);
    this.snake.move(this.snakeVelocityX, this.snakeVelocityY);
    this.snake.draw(this.ctx);
    this.food.draw(this.ctx);

    if (this.gameArea.isColliding(this.snake.getSnakeHeadX(), this.snake.getSnakeHeadY())) {
      this.handleGameOver();
      this.newGameOver.emit();
      return;
    }

    if (this.food.isColliding(this.snake.getSnakeHeadX(), this.snake.getSnakeHeadY())) {
      this.handleFoodEaten();
    }

    if (this.snake.isColliding(this.snake.getSnakeHeadX(), this.snake.getSnakeHeadY())) {
      this.handleGameOver();
      this.newGameOver.emit();
      return;
    }

    window.requestAnimationFrame(this.gameLoop);
  }

  private handleGameOver() {
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';

    this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2);
    this.ctx.fillText("YOUR SCORE: " + this.score, this.width / 2, this.height / 2 + 20);
  }

}
