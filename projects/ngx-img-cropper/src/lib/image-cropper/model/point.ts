export interface IPoint {
  x: number;
  y: number;
  next: Point;
  prev: Point;
}

export class Point implements IPoint {
  public x: number;
  public y: number;

  private myNext: Point;
  private myPrev: Point;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public get next(): Point {
    return this.myNext;
  }

  public set next(p: Point) {
    this.myNext = p;
  }

  public get prev(): Point {
    return this.myPrev;
  }

  public set prev(p: Point) {
    this.myPrev = p;
  }
}
