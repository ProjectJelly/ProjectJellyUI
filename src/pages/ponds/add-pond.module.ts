import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPond } from './add-pond';

@NgModule({
  declarations: [
    AddPond
  ],
  imports: [
    IonicPageModule.forChild(AddPond),
  ],
  exports: [
    AddPond
  ]
})
export class AddPondModule {}
