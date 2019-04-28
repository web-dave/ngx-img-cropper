// looks like this CropService is never used
export class CropService {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }
}
