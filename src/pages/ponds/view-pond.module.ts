import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPond } from './view-pond';

@NgModule({
  declarations: [
    ViewPond
  ],
  imports: [
    IonicPageModule.forChild(ViewPond),
  ],
  exports: [
    ViewPond
  ]
})
export class ViewPondModule {}
