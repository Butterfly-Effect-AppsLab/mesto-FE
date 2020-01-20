import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LineStopComponent } from './line-stop.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
    // RouterModule.forChild(routes)
  ],
  declarations: [LineStopComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class LineStopModule {}
