import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: '',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/dashboard.svg',
          label: 'Dashboard',
          route: '/app/dashboard',
          // children: [
          //   { label: 'Home', route: '/dashboard/home' }
          // ],
        },
        {
          icon: 'assets/icons/heroicons/outline/user.svg',
          label: 'Drivers',
          route: '/app//drivers',
          children: [
            { label: 'List', route: '/app/drivers/list' },
            { label: 'Incomplete Registrations', route: '/app/drivers/incomplete' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Passengers',
          route: '/app//passengers',
        },
        {
          icon: 'assets/icons/heroicons/outline/clock.svg',
          label: 'Trips',
          route: '/app/trips'
        },
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Reports',
          route: '/app/reports'
        },
        {
          icon: 'assets/icons/heroicons/outline/truck.svg',
          label: 'Bus',
          route: '/app/bus'
        },
      ]
    },
    // {
    //   group: '',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/chart-pie.svg',
    //       label: 'Dashboard',
    //       route: '/dashboard',
    //       children: [
    //         { label: 'Nfts', route: '/dashboard/nfts' },
    //         // { label: 'Podcast', route: '/dashboard/podcast' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/lock-closed.svg',
    //       label: 'Auth',
    //       route: '/auth',
    //       children: [
    //         { label: 'Sign up', route: '/auth/sign-up' },
    //         { label: 'Sign in', route: '/auth/sign-in' },
    //         { label: 'Forgot Password', route: '/auth/forgot-password' },
    //         { label: 'New Password', route: '/auth/new-password' },
    //         { label: 'Two Steps', route: '/auth/two-steps' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
    //       label: 'Erros',
    //       route: '/errors',
    //       children: [
    //         { label: '404', route: '/errors/404' },
    //         { label: '500', route: '/errors/500' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/cube.svg',
    //       label: 'Components',
    //       route: '/components',
    //       children: [{ label: 'Table', route: '/components/table' }],
    //     },
    //   ],
    // },
    // {
    //   group: 'Collaboration',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/download.svg',
    //       label: 'Download',
    //       route: '/download',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/gift.svg',
    //       label: 'Gift Card',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/users.svg',
    //       label: 'Users',
    //       route: '/users',
    //     },
    //   ],
    // },
    // {
    //   group: 'Config',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/cog.svg',
    //       label: 'Settings',
    //       route: '/settings',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/bell.svg',
    //       label: 'Notifications',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/folder.svg',
    //       label: 'Folders',
    //       route: '/folders',
    //       children: [
    //         { label: 'Current Files', route: '/folders/current-files' },
    //         { label: 'Downloads', route: '/folders/download' },
    //         { label: 'Trash', route: '/folders/trash' },
    //       ],
    //     },
    //   ],
    // },
  ];
}
