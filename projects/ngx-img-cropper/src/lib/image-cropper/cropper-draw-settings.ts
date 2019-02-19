export class CropperDrawSettings {
  public lineDash = false;
  public strokeWidth = 1;
  public strokeColor = 'rgba(255,255,255,1)';
  public dragIconStrokeWidth = 1;
  public dragIconStrokeColor = 'rgba(0,0,0,1)';
  public dragIconFillColor = 'rgba(255,255,255,1)';

  constructor(settings?: any) {
    if (typeof settings === 'object') {
      this.lineDash = settings.lineDash || this.lineDash;
      this.strokeWidth = settings.strokeWidth || this.strokeWidth;
      this.strokeColor = settings.strokeColor || this.strokeColor;
      this.dragIconStrokeWidth =
        settings.dragIconStrokeWidth || this.dragIconStrokeWidth;
      this.dragIconStrokeColor =
        settings.dragIconStrokeColor || this.dragIconStrokeColor;
      this.dragIconFillColor =
        settings.dragIconFillColor || this.dragIconFillColor;
    }
  }
}
