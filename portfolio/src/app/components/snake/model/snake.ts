import { FixedQueue } from "./fixed-queue";

export class Snake {
  private x: number;
  private y: number;
  private size: number;
  private snakeHead!: SnakeBodyPart;
  private tail!: SnakeBodyPart;
  private trailSize!: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.trailSize = this.size / 4;
    this.initializeSnake();
  }

  private initializeSnake(): void {
    this.snakeHead = new SnakeBodyPart("O", this.x, this.y, this.trailSize, true);
    this.tail = this.snakeHead;
    this.addBodyPart(false);
    this.addBodyPart(false);
  }

  addBodyPart(isCollidable: boolean): void {
    const newPart = new SnakeBodyPart("#", this.tail.x, this.tail.y, this.trailSize, isCollidable);
    this.tail.nextPart = newPart;
    this.tail = newPart;
  }

  updateDimensions(x: number, y: number, size: number): void {
    this.x = x;
    this.y = y;
    this.size = size;
    this.updateSnakeParts();
  }

  private updateSnakeParts() {
    let currentPart = this.snakeHead;
    while (currentPart != null) {
      currentPart.trailPositions.updateSize(this.trailSize);
      currentPart = currentPart.nextPart;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let currentPart = this.snakeHead;
    ctx.font = `${this.size}px 'Ubuntu Mono', monospace`
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    do {
      ctx.fillText(currentPart.symbol, currentPart.x, currentPart.y);
      currentPart = currentPart.nextPart;
    } while (currentPart != null);
  }

  move(velocityX: number, velocityY: number) {
    if (velocityX === 0 && velocityY === 0) return;

    this.snakeHead.x = this.snakeHead.x + velocityX;
    this.snakeHead.y = this.snakeHead.y + velocityY;
    this.snakeHead.trailPositions.enqueue({ x: this.snakeHead.x, y: this.snakeHead.y });

    let current = this.snakeHead;
    let next = current.nextPart;
    while (current.trailPositions.isFull() && next != null) {
      const positionsToFollow = current.trailPositions.dequeue();
      if (!positionsToFollow) {
        break;
      }
      next.x = positionsToFollow.x;
      next.y = positionsToFollow.y;
      if (!next.isCollidable) {
        next.isCollidable;
      }
      next.trailPositions.enqueue({ x: next.x, y: next.y });
      current = next;
      next = next.nextPart;
    }
  }

  getSnakeHeadX(): number {
    return this.snakeHead.x;
  }

  getSnakeHeadY(): number {
    return this.snakeHead.y;
  }

  isColliding(x: number, y: number): boolean {
    let currentPart = this.snakeHead.nextPart;
    while (currentPart != null) {
      const colliding = currentPart.x == x && currentPart.y == y;
      if (colliding == true && currentPart.isCollidable) {
        return true;
      }
      currentPart = currentPart.nextPart;
    }
    return false;
  }
}


class SnakeBodyPart {
  symbol: string;
  x: number;
  y: number;
  nextPart!: SnakeBodyPart;
  trailPositions: FixedQueue<{ x: number, y: number }>;
  isCollidable: boolean;

  constructor(symbol: string, x: number, y: number, trailSize: number, isCollidable: boolean) {
    this.symbol = symbol;
    this.x = x;
    this.y = y;
    this.trailPositions = new FixedQueue(trailSize);
    this.trailPositions.enqueue({ x: x, y: y });
    this.isCollidable = isCollidable;
  }
}
