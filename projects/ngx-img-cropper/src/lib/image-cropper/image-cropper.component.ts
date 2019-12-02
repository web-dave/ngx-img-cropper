import {
  Component,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  SimpleChanges, Inject
} from '@angular/core';
import { CropperSettings } from './cropper-settings';
import { ImageCropper } from './imageCropper';
import { CropPosition } from './model/cropPosition';
import { Bounds } from './model/bounds';
import { Exif } from './exif';
import { DOCUMENT } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'img-cropper',
  templateUrl: './image-cropper.component.html'
})
export class ImageCropperComponent
  implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('cropcanvas', { static: true })
  cropcanvas: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() public settings: CropperSettings;
  @Input() public image: any;
  @Input() public inputImage: any;
  @Input() public cropper: ImageCropper;
  @Input() public cropPosition: CropPosition;
  @Output()
  public cropPositionChange: EventEmitter<CropPosition> = new EventEmitter<
    CropPosition
  >();

  private exif = new Exif();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onCrop: EventEmitter<any> = new EventEmitter();
  @Output() imageSet: EventEmitter<boolean> = new EventEmitter<boolean>();

  public croppedWidth: number;
  public croppedHeight: number;
  public intervalRef: number;
  public raf: number;
  public renderer: Renderer2;
  public windowListener: EventListenerObject;

  private isCropPositionUpdateNeeded: boolean;
  private dragUnsubscribers: (() => void)[] = [];

  constructor(renderer: Renderer2,
              @Inject(DOCUMENT) private document) {
    this.renderer = renderer;
  }

  public ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement = this.cropcanvas.nativeElement;

    if (!this.settings) {
      this.settings = new CropperSettings();
    }

    if (this.settings.cropperClass) {
      this.renderer.setAttribute(canvas, 'class', this.settings.cropperClass);
    }

    if (!this.settings.dynamicSizing) {
      this.renderer.setAttribute(
        canvas,
        'width',
        this.settings.canvasWidth.toString()
      );
      this.renderer.setAttribute(
        canvas,
        'height',
        this.settings.canvasHeight.toString()
      );
    } else {
      this.windowListener = this.resize.bind(this);
      window.addEventListener('resize', this.windowListener);
    }

    if (!this.cropper) {
      this.cropper = new ImageCropper(this.settings);
    }

    this.cropper.prepare(canvas);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.isCropPositionChanged(changes)) {
      this.cropper.updateCropPosition(this.cropPosition.toBounds());
      if (this.cropper.isImageSet()) {
        const bounds = this.cropper.getCropBounds();
        this.image.image = this.cropper.getCroppedImageHelper().src;
        this.onCrop.emit(bounds);
      }
      this.updateCropBounds();
    }

    if (changes.inputImage) {
      this.setImage(changes.inputImage.currentValue);
    }

    if (changes.settings && this.cropper) {
      this.cropper.updateSettings(this.settings);
      if (this.cropper.isImageSet()) {
        this.image.image = this.cropper.getCroppedImageHelper().src;
        this.onCrop.emit(this.cropper.getCropBounds());
      }
    }
  }

  public ngOnDestroy() {
    this.removeDragListeners();
    if (this.settings.dynamicSizing && this.windowListener) {
      window.removeEventListener('resize', this.windowListener);
    }
  }

  public onTouchMove(event: TouchEvent): void {
    this.cropper.onTouchMove(event);
  }

  public onTouchStart(event: TouchEvent): void {
    this.cropper.onTouchStart(event);
  }

  public onTouchEnd(event: TouchEvent): void {
    this.cropper.onTouchEnd(event);
    if (this.cropper.isImageSet()) {
      this.image.image = this.cropper.getCroppedImageHelper().src;
      this.onCrop.emit(this.cropper.getCropBounds());
      this.updateCropBounds();
    }
  }

  public onMouseDown(event: MouseEvent): void {
    this.dragUnsubscribers.push(this.renderer.listen(this.document, 'mousemove', this.onMouseMove.bind(this)));
    this.dragUnsubscribers.push(this.renderer.listen(this.document, 'mouseup', this.onMouseUp.bind(this)));

    this.cropper.onMouseDown(event);
    // if (!this.cropper.isImageSet() && !this.settings.noFileInput) {
    //   // load img
    //   this.fileInput.nativeElement.click();
    // }
  }

  private removeDragListeners() {
    this.dragUnsubscribers.forEach(unsubscribe => unsubscribe());
  }

  public onMouseUp(event: MouseEvent): void {
    this.removeDragListeners();
    if (this.cropper.isImageSet()) {
      this.cropper.onMouseUp(event);
      this.image.image = this.cropper.getCroppedImageHelper().src;
      this.onCrop.emit(this.cropper.getCropBounds());
      this.updateCropBounds();
    }
  }

  public onMouseMove(event: MouseEvent): void {
    this.cropper.onMouseMove(event);
  }

  public fileChangeListener($event: any) {
    if ($event.target.files.length === 0) {
      return;
    }

    const file: File = $event.target.files[0];
    if (this.settings.allowedFilesRegex.test(file.name)) {
      const image: any = new Image();
      const fileReader: FileReader = new FileReader();

      fileReader.addEventListener('loadend', (loadEvent: any) => {
        image.addEventListener('load', () => {
          this.setImage(image);
        });
        image.src = loadEvent.target.result;
      });

      fileReader.readAsDataURL(file);
    }
  }

  private resize() {
    const canvas: HTMLCanvasElement = this.cropcanvas.nativeElement;
    this.settings.canvasWidth = canvas.offsetWidth;
    this.settings.canvasHeight = canvas.offsetHeight;
    this.cropper.resizeCanvas(canvas.offsetWidth, canvas.offsetHeight, true);
  }

  public reset(): void {
    this.cropper.reset();
    this.renderer.setAttribute(
      this.cropcanvas.nativeElement,
      'class',
      this.settings.cropperClass
    );
    this.image.image = this.cropper.getCroppedImageHelper().src;
  }

  public setImage(image: HTMLImageElement, newBounds: any = null) {
    this.imageSet.emit(true);
    this.renderer.setAttribute(
      this.cropcanvas.nativeElement,
      'class',
      `${this.settings.cropperClass} ${this.settings.croppingClass}`
    );
    this.raf = window.requestAnimationFrame(() => {
      if (this.raf) {
        window.cancelAnimationFrame(this.raf);
      }
      if (image.naturalHeight > 0 && image.naturalWidth > 0) {
        image.height = image.naturalHeight;
        image.width = image.naturalWidth;

        window.cancelAnimationFrame(this.raf);
        this.getOrientedImage(image, (img: HTMLImageElement) => {
          if (this.settings.dynamicSizing) {
            const canvas: HTMLCanvasElement = this.cropcanvas.nativeElement;
            this.settings.canvasWidth = canvas.offsetWidth;
            this.settings.canvasHeight = canvas.offsetHeight;
            this.cropper.resizeCanvas(
              canvas.offsetWidth,
              canvas.offsetHeight,
              false
            );
          }

          this.cropper.setImage(img);
          if (this.cropPosition && this.cropPosition.isInitialized()) {
            this.cropper.updateCropPosition(this.cropPosition.toBounds());
          }

          this.image.original = img;
          let bounds = this.cropper.getCropBounds();
          this.image.image = this.cropper.getCroppedImageHelper().src;

          if (!this.image) {
            this.image = image;
          }

          if (newBounds != null) {
            bounds = newBounds;
            this.cropper.setBounds(bounds);
            this.cropper.updateCropPosition(bounds);
          }
          this.onCrop.emit(bounds);
        });
      }
    });
  }

  private isCropPositionChanged(changes: SimpleChanges): boolean {
    if (
      this.cropper &&
      changes.cropPosition &&
      this.isCropPositionUpdateNeeded
    ) {
      return true;
    } else {
      this.isCropPositionUpdateNeeded = true;
      return false;
    }
  }

  private updateCropBounds(): void {
    const cropBound: Bounds = this.cropper.getCropBounds();
    this.cropPositionChange.emit(
      new CropPosition(
        cropBound.left,
        cropBound.top,
        cropBound.width,
        cropBound.height
      )
    );
    this.isCropPositionUpdateNeeded = false;
  }

  private getOrientedImage(
    image: HTMLImageElement,
    callback: (img: HTMLImageElement) => void
  ) {
    let img: any;

    this.exif.getData(image, () => {
      const orientation = this.exif.getTag(image, 'Orientation');

      if ([3, 6, 8].indexOf(orientation) > -1) {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext(
          '2d'
        ) as CanvasRenderingContext2D;
        let cw: number = image.width;
        let ch: number = image.height;
        let cx = 0;
        let cy = 0;
        let deg = 0;

        switch (orientation) {
          case 3:
            cx = -image.width;
            cy = -image.height;
            deg = 180;
            break;
          case 6:
            cw = image.height;
            ch = image.width;
            cy = -image.height;
            deg = 90;
            break;
          case 8:
            cw = image.height;
            ch = image.width;
            cx = -image.width;
            deg = 270;
            break;
          default:
            break;
        }

        canvas.width = cw;
        canvas.height = ch;
        ctx.rotate((deg * Math.PI) / 180);
        ctx.drawImage(image, cx, cy);
        img = document.createElement('img');
        img.width = cw;
        img.height = ch;
        img.addEventListener('load', () => {
          callback(img);
        });
        img.src = canvas.toDataURL('image/png');
      } else {
        img = image;
        callback(img);
      }
    });
  }
}
