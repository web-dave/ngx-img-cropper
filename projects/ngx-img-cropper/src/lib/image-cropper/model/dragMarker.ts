import { Handle } from './handle';
import { PointPool } from './pointPool';
import { Point } from './point';
import { CropperSettings } from '../cropper-settings';
import { Bounds } from './bounds';

export class DragMarker extends Handle {
  private iconPoints: Array<Point>;
  private scaledIconPoints: Array<Point>;

  constructor(
    x: number,
    y: number,
    radius: number,
    cropperSettings: CropperSettings
  ) {
    super(x, y, radius, cropperSettings);
    this.iconPoints = [];
    this.scaledIconPoints = [];
    this.getDragIconPoints(this.iconPoints, 1);
    this.getDragIconPoints(this.scaledIconPoints, 1.2);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.over || this.drag) {
      this.drawIcon(ctx, this.scaledIconPoints);
    } else {
      this.drawIcon(ctx, this.iconPoints);
    }
  }

  public getDragIconPoints(arr: Array<any>, scale: number) {
    const maxLength = 17 * scale;
    const arrowWidth = 14 * scale;
    const arrowLength = 8 * scale;
    const connectorThroat = 4 * scale;

    arr.push(
      new PointPool().instance.borrow(
        -connectorThroat / 2,
        maxLength - arrowLength
      )
    );
    arr.push(
      new PointPool().instance.borrow(-arrowWidth / 2, maxLength - arrowLength)
    );
    arr.push(new PointPool().instance.borrow(0, maxLength));
    arr.push(
      new PointPool().instance.borrow(arrowWidth / 2, maxLength - arrowLength)
    );
    arr.push(
      new PointPool().instance.borrow(
        connectorThroat / 2,
        maxLength - arrowLength
      )
    );
    arr.push(
      new PointPool().instance.borrow(connectorThroat / 2, connectorThroat / 2)
    );
    arr.push(
      new PointPool().instance.borrow(
        maxLength - arrowLength,
        connectorThroat / 2
      )
    );
    arr.push(
      new PointPool().instance.borrow(maxLength - arrowLength, arrowWidth / 2)
    );
    arr.push(new PointPool().instance.borrow(maxLength, 0));
    arr.push(
      new PointPool().instance.borrow(maxLength - arrowLength, -arrowWidth / 2)
    );
    arr.push(
      new PointPool().instance.borrow(
        maxLength - arrowLength,
        -connectorThroat / 2
      )
    );
    arr.push(
      new PointPool().instance.borrow(connectorThroat / 2, -connectorThroat / 2)
    );
    arr.push(
      new PointPool().instance.borrow(
        connectorThroat / 2,
        -maxLength + arrowLength
      )
    );
    arr.push(
      new PointPool().instance.borrow(arrowWidth / 2, -maxLength + arrowLength)
    );
    arr.push(new PointPool().instance.borrow(0, -maxLength));
    arr.push(
      new PointPool().instance.borrow(-arrowWidth / 2, -maxLength + arrowLength)
    );
    arr.push(
      new PointPool().instance.borrow(
        -connectorThroat / 2,
        -maxLength + arrowLength
      )
    );
    arr.push(
      new PointPool().instance.borrow(
        -connectorThroat / 2,
        -connectorThroat / 2
      )
    );
    arr.push(
      new PointPool().instance.borrow(
        -maxLength + arrowLength,
        -connectorThroat / 2
      )
    );
    arr.push(
      new PointPool().instance.borrow(-maxLength + arrowLength, -arrowWidth / 2)
    );
    arr.push(new PointPool().instance.borrow(-maxLength, 0));
    arr.push(
      new PointPool().instance.borrow(-maxLength + arrowLength, arrowWidth / 2)
    );
    arr.push(
      new PointPool().instance.borrow(
        -maxLength + arrowLength,
        connectorThroat / 2
      )
    );
    arr.push(
      new PointPool().instance.borrow(-connectorThroat / 2, connectorThroat / 2)
    );
  }

  public drawIcon(ctx: CanvasRenderingContext2D, points: Array<Point>) {
    if (this.cropperSettings.showCenterMarker) {
      ctx.beginPath();
      ctx.moveTo(points[0].x + this.position.x, points[0].y + this.position.y);
      for (const p of points) {
        ctx.lineTo(p.x + this.position.x, p.y + this.position.y);
      }
      ctx.closePath();
      ctx.fillStyle = this.cropperSettings.cropperDrawSettings.dragIconFillColor;
      ctx.fill();
      ctx.lineWidth = this.cropperSettings.cropperDrawSettings.dragIconStrokeWidth;
      ctx.strokeStyle = this.cropperSettings.cropperDrawSettings.dragIconStrokeColor;
      ctx.stroke();
    }
  }

  public recalculatePosition(bounds: Bounds) {
    const c = bounds.getCentre();
    this.setPosition(c.x, c.y);
    new PointPool().instance.returnPoint(c);
  }
}
