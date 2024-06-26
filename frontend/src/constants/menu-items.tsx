import CartICO from '@/assets/icons/CartICO';
import ConsulICO from '@/assets/icons/ConsulICO';
import DoctorICO from '@/assets/icons/DoctorICO';
import HomeICO from '@/assets/icons/HomeICO';
import LogoutICO from '@/assets/icons/LogoutICO';
import OrderICO from '@/assets/icons/OrderICO';
import ProductICO from '@/assets/icons/ProductICO';
import UserICO from '@/assets/icons/UserICO';
import React from 'react';

type MenuOption = {
  name: string;
  icon: React.ComponentType | React.FC<any>;
  url: string;
  subItems?: MenuOption[];
};

const MENU_USER: MenuOption[] = [
  {
    name: 'Beranda',
    icon: HomeICO,
    url: '/',
  },
  {
    name: 'Profil',
    icon: UserICO,
    url: '/dashboard',
  },
  {
    name: 'List Product',
    icon: ProductICO,
    url: '/products',
  },
  {
    name: 'Keranjang',
    icon: CartICO,
    url: '/shop/cart',
  },
  {
    name: 'Riwayat Pembelian',
    icon: OrderICO,
    url: '/dashboard/user/transactions',
  },
  {
    name: 'Konsultasi',
    icon: ConsulICO,
    url: '/consultation',
  },
  {
    name: 'List Dokter',
    icon: DoctorICO,
    url: '/doctors',
  },
  {
    name: 'Keluar',
    icon: LogoutICO,
    url: '/auth/login',
  },
];

export type MenuItem = {
  name: string;
  icon: React.ComponentType;
  url: string;
  id: string;
  depth: number;
  subItems?: MenuItem[];
};

function makeMenuLevel(options: MenuOption[], depth = 0): MenuItem[] {
  return options.map((option, idx) => ({
    ...option,
    id: depth === 0 ? idx.toString() : `${depth}.${idx}`,
    depth,
    subItems:
      option.subItems && option.subItems.length > 0
        ? makeMenuLevel(option.subItems, depth + 1)
        : undefined,
  }));
}

export const MENU_ITEMS_USER: MenuItem[] = makeMenuLevel(MENU_USER);
