// looks like this CropService is never used
export class CropService {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
  }
}
