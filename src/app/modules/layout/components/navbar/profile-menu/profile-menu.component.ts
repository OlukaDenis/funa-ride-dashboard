import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeService } from '../../../../../core/services/theme.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StorageService } from '@app/core/services/storage.service';
import { LoginResponse } from '@app/core/services/auth.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, RouterLink, AngularSvgIconModule],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})

export class ProfileMenuComponent implements OnInit {
  public isOpen = false;
  public profileMenu = [
    // {
    //   title: 'Your Profile',
    //   icon: './assets/icons/heroicons/outline/user-circle.svg',
    //   link: '/profile',
    // },
    // {
    //   title: 'Settings',
    //   icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
    //   link: '/settings',
    // },
    {
      title: 'Log out',
      icon: './assets/icons/heroicons/outline/logout.svg',
      link: '/auth',
    },
  ];

  public themeColors = [
    {
      name: 'base',
      code: '#21BCBE',
    },
    // {
    //   name: 'funa',
    //   code: '#21BCBE',
    // },
    {
      name: 'orange',
      code: '#F5A916',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
  ];

  public themeMode = ['light', 'dark'];

  currentUser!: LoginResponse;

  constructor(public themeService: ThemeService, public storage: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storage.getSavedUser;
  }

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  toggleThemeMode() {
    this.themeService.theme.update((theme) => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }

  toggleThemeColor(color: string) {
    this.themeService.theme.update((theme) => {
      return { ...theme, color: color };
    });
  }
}
