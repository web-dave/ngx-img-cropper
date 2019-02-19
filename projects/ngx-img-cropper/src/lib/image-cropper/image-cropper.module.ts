import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent } from './image-cropper.component';

@NgModule({
  declarations: [ImageCropperComponent],
  exports: [ImageCropperComponent],
  imports: [CommonModule]
})
export class ImageCropperModule {}
