import { CropperDrawSettings } from "./cropperDrawSettings";

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
  resampleFn?: Function;
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
  public canvasWidth: number = 300;
  public canvasHeight: number = 300;

  public dynamicSizing: boolean = false;
  public cropperClass: string;
  public croppingClass: string;

  public width: number = 200;
  public height: number = 200;

  public minWidth: number = 50;
  public minHeight: number = 50;
  public minWithRelativeToResolution: boolean = true;

  public croppedWidth: number = 100;
  public croppedHeight: number = 100;

  public cropperDrawSettings: CropperDrawSettings = new CropperDrawSettings();
  public touchRadius: number = 20;
  public noFileInput: boolean = false;

  public fileType: string;

  public resampleFn: Function;

  public markerSizeMultiplier: number = 1;
  public centerTouchRadius: number = 20;
  public showCenterMarker: boolean = true;

  public allowedFilesRegex: RegExp = /\.(jpe?g|png|gif|bmp)$/i;
  public cropOnResize: boolean = true;
  public preserveSize: boolean = false;

  public compressRatio: number = 1.0;

  private _rounded: boolean = false;
  private _keepAspect: boolean = true;

  constructor(settings?: ICropperSettings) {
    if (typeof settings === "object") {
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
        "Cannot set keep aspect to false on rounded cropper. Ellipsis not supported"
      );
      this._keepAspect = true;
    }
  }

  get keepAspect(): boolean {
    return this._keepAspect;
  }
}
