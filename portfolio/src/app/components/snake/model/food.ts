export class Food {
  private x: number;
  private y: number;
  private size: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillText("ð", this.x, this.y, this.size);
  }

  isColliding(x: number, y: number): boolean {
    return (x <= this.x + this.size / 2 && x >= this.x - this.size / 2) && (y <= this.y + this.size / 2 && y >= this.y - this.size / 2);
  }
}
