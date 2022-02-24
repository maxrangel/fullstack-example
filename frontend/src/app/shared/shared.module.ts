import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
} from '@nebular/theme';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

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
  ],
  exports: [HeaderComponent, SidebarMenuComponent],
})
export class SharedModule {}
