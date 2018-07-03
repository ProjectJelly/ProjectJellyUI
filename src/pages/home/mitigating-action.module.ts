import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MitigatingAction } from './mitigating-action';

@NgModule({
  declarations: [
    MitigatingAction
  ],
  imports: [
    IonicPageModule.forChild(MitigatingAction),
  ],
  exports: [
    MitigatingAction
  ]
})
export class MitigatingActionModule {}
