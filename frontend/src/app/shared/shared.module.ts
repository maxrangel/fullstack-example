import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
} from '@nebular/theme';
import { HeaderComponent } from './header/header.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SidebarMenuComponent],
  imports: [
    CommonModule,
    NbMenuModule,
    NbButtonModule,
    NbIconModule,
    NbLayoutModule,
    NbCardModule,
    NbUserModule,
    RouterModule,
  ],
  exports: [HeaderComponent, SidebarMenuComponent],
})
export class SharedModule {}
