import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showMenu: boolean = false;

  constructor(
    private sidebarService: NbSidebarService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onToggleMenu() {
    this.sidebarService.toggle();
    this.showMenu = !this.showMenu;
  }

  onNavigateHome() {
    this.router.navigateByUrl('/')
  }
}
