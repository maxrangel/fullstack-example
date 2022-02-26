import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbUserModule } from '@nebular/theme';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostCardComponent } from './post-card/post-card.component';

@NgModule({
  declarations: [HomeComponent, PostCardComponent],
  imports: [CommonModule, HomeRoutingModule, NbCardModule, NbUserModule],
})
export class HomeModule {}
