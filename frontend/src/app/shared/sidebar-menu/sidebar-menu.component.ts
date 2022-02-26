import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: 'profile',
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
      link: '',
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: 'auth',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
