import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { ImageCropperModule } from 'projects/ngx-img-cropper/src/public_api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ImageCropperModule,
    FormsModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
