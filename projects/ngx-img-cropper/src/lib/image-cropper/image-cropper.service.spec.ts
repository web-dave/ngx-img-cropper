import { TestBed } from '@angular/core/testing';

import { ImageCropperService } from './image-cropper.service';

describe('ImageCropperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageCropperService = TestBed.get(ImageCropperService);
    expect(service).toBeTruthy();
  });
});
