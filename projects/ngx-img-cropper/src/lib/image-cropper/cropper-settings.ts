import { CropperDrawSettings } from './cropper-draw-settings';

export interface ICropperSettings {
  canvasWidth?: number;
  canvasHeight?: number;
  dynamicSizing?: boolean;
  cropperClass?: string;
  croppingClass?: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  minWithRelativeToResolution?: boolean;
  croppedWidth?: number;
  croppedHeight?: number;
  cropperDrawSettings?: any;
  touchRadius?: number;
  noFileInput?: boolean;
  fileType?: string;
  resampleFn?: (c: HTMLCanvasElement) => void;
  markerSizeMultiplier?: number;
  centerTouchRadius?: number;
  showCenterMarker?: boolean;
  allowedFilesRegex?: RegExp;
  cropOnResize?: boolean;
  preserveSize?: boolean;
  compressRatio?: number;
  rounded?: boolean;
  keepAspect?: boolean;
}

export class CropperSettings implements ICropperSettings {
  public canvasWidth = 300;
  public canvasHeight = 300;

  public dynamicSizing = false;
  public cropperClass: string;
  public croppingClass: string;

  public width = 200;
  public height = 200;

  public minWidth = 50;
  public minHeight = 50;
  public minWithRelativeToResolution = true;

  public croppedWidth = 100;
  public croppedHeight = 100;

  public cropperDrawSettings: CropperDrawSettings = new CropperDrawSettings();
  public touchRadius = 20;
  public noFileInput = false;

  public fileType: string;

  public resampleFn: (c: HTMLCanvasElement) => void;

  public markerSizeMultiplier = 1;
  public centerTouchRadius = 20;
  public showCenterMarker = true;

  public allowedFilesRegex: RegExp = /\.(jpe?g|png|gif|bmp)$/i;
  public cropOnResize = true;
  public preserveSize = false;

  public compressRatio = 1.0;

  // tslint:disable-next-line:variable-name
  private _rounded = false;
  // tslint:disable-next-line:variable-name
  private _keepAspect = true;

  constructor(settings?: ICropperSettings) {
    if (typeof settings === 'object') {
      Object.assign(this, settings);
    }
  }

  set rounded(val: boolean) {
    this._rounded = val;
    if (val) {
      this._keepAspect = true;
    }
  }

  get rounded(): boolean {
    return this._rounded;
  }

  set keepAspect(val: boolean) {
    this._keepAspect = val;
    if (this._rounded === true && this._keepAspect === false) {
      console.error(
        'Cannot set keep aspect to false on rounded cropper. Ellipsis not supported'
      );
      this._keepAspect = true;
    }
  }

  get keepAspect(): boolean {
    return this._keepAspect;
  }
}
