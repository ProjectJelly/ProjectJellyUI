import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPond } from './edit-pond';

@NgModule({
  declarations: [
    EditPond
  ],
  imports: [
    IonicPageModule.forChild(EditPond),
  ],
  exports: [
    EditPond
  ]
})
export class EditPondModule {}
