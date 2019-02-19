export class ImageCropperDataShare {
  public share: any = {};
  public pressed: HTMLCanvasElement;
  public over: HTMLCanvasElement;

  public setPressed(canvas: HTMLCanvasElement): void {
    this.pressed = canvas;
  }

  public setReleased(canvas: HTMLCanvasElement): void {
    if (canvas === this.pressed) {
      //  this.pressed = undefined;
    }
  }

  public setOver(canvas: HTMLCanvasElement): void {
    this.over = canvas;
  }

  public setStyle(canvas: HTMLCanvasElement, style: any): void {
    if (this.pressed !== undefined) {
      if (this.pressed === canvas) {
        // TODO: check this
        // angular.element(document.documentElement).css('cursor', style);
      }
    } else {
      if (canvas === this.over) {
        // TODO: check this
        // angular.element(document.documentElement).css('cursor', style);
      }
    }
  }
}
