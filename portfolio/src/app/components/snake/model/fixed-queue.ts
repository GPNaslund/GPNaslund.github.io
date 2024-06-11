export class FixedQueue<T> {
  private queue: T[];
  private maxSize: number;

  constructor(maxSize: number) {
    this.queue = [];
    this.maxSize = maxSize;
  }

  enqueue(item: T): void {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift();
    }
    this.queue.push(item);
  }

  dequeue(): T | undefined {
    return this.queue.shift();
  }

  peek(): T | undefined {
    return this.queue[0];
  }

  size(): number {
    return this.queue.length;
  }

  updateSize(newSize: number): void {
    this.maxSize = newSize;
  }

  isFull(): boolean {
    return this.queue.length >= this.maxSize;
  }
}
