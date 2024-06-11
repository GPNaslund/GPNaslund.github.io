export class GameArea {
  private width: number;
  private height: number;
  private wallSize: number;

  constructor(width: number, height: number, wallSize: number) {
    this.width = width;
    this.height = height;
    this.wallSize = wallSize;
  }

  updateDimensions(width: number, height: number, wallSize: number): void {
    this.width = width;
    this.height = height;
    this.wallSize = wallSize;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.font = `${this.wallSize}px 'Ubuntu Mono', monospace`
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    this.drawWallsTopAndBottom(ctx);
    this.drawWallsLeftAndRight(ctx);
  }

  isColliding(x: number, y: number): boolean {
    return x <= 10 + this.wallSize || x >= this.width - 10 - this.wallSize || y <= 10 + this.wallSize || y >= this.height - 10 - this.wallSize;
  }

  private drawWallsTopAndBottom(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "white";
    for (let xVal = 10; xVal < this.width - 10; xVal += this.wallSize) {
      ctx.fillText("=", xVal, 10);
      ctx.fillText("=", xVal, this.height - 10);
    }
  }

  private drawWallsLeftAndRight(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "white";
    for (let yVal = 10; yVal < this.height - 10; yVal += this.wallSize) {
      ctx.fillText('=', 10, yVal);
      ctx.fillText('=', this.width - 10, yVal);
    }
  }
}
