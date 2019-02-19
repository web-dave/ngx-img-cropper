import { Point } from './point';

export class PointPool {
  private borrowed: number;
  private firstAvailable: Point;

  constructor(initialSize: number = 1) {
    let prev: Point = (this.firstAvailable = new Point());

    for (let i = 1; i < initialSize; i++) {
      const p = new Point();
      prev.next = p;
      prev = p;
    }
  }

  get instance(): PointPool {
    return this;
  }

  public borrow(x: number, y: number): Point {
    if (this.firstAvailable == null) {
      throw new Error('Pool exhausted');
    }
    this.borrowed++;
    const p: Point = this.firstAvailable;
    this.firstAvailable = p.next;
    p.x = x;
    p.y = y;
    return p;
  }

  public returnPoint(p: Point) {
    this.borrowed--;
    p.x = 0;
    p.y = 0;
    p.next = this.firstAvailable;
    this.firstAvailable = p;
  }
}
