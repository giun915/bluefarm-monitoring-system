export type HeaderMenuItem = {
  id: number
  label: string
  href: string
}

export const headerMenus: HeaderMenuItem[] = [
  {
    id: 1,
    label: '홈',
    href: '/',
  },
  {
    id: 2,
    label: '대시보드',
    href: '#',
  },
  {
    id: 3,
    label: '운영 관리',
    href: '#',
  },
  {
    id: 4,
    label: '거점 관리',
    href: '#',
  },
  {
    id: 5,
    label: '설비 모니터링',
    href: '#',
  },
  {
    id: 6,
    label: '리포트',
    href: '#',
  },
]
