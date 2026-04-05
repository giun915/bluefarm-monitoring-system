export type SiteCategory = '물류 허브' | '스마트 팩토리' | '품질 관리 센터' | '에너지 운영소'

export type SiteStatus = 'stable' | 'warning'

export type SiteItem = {
  id: number
  name: string
  address: string
  category: SiteCategory
  facilityScale: string
  monthlyVolume: string
  achievementRate: string
  checkedAt: string
  lat: number
  lng: number
  status: SiteStatus
}

export const siteStatusMeta: Record<
  SiteStatus,
  {
    className: string
  }
> = {
  stable: {
    className: 'stable',
  },
  warning: {
    className: 'warning',
  },
}

export const siteList: SiteItem[] = [
  {
    id: 1,
    name: '부산 동부 운영센터',
    address: '부산광역시 해운대구 센텀중앙로 97',
    category: '물류 허브',
    facilityScale: '12,400㎡',
    monthlyVolume: '18,200건',
    achievementRate: '96%',
    checkedAt: '2026.03.24',
    lat: 35.1709,
    lng: 129.1303,
    status: 'stable',
  },
  {
    id: 2,
    name: '창원 스마트 생산거점',
    address: '경상남도 창원시 성산구 공단로 211',
    category: '스마트 팩토리',
    facilityScale: '9,800㎡',
    monthlyVolume: '13,600건',
    achievementRate: '89%',
    checkedAt: '2026.03.24',
    lat: 35.2281,
    lng: 128.6811,
    status: 'warning',
  },
  {
    id: 3,
    name: '광주 품질분석센터',
    address: '광주광역시 북구 첨단과기로 123',
    category: '품질 관리 센터',
    facilityScale: '6,900㎡',
    monthlyVolume: '7,450건',
    achievementRate: '93%',
    checkedAt: '2026.03.23',
    lat: 35.218,
    lng: 126.8495,
    status: 'stable',
  },
  {
    id: 4,
    name: '울산 에너지 통합운영소',
    address: '울산광역시 남구 산업로 155',
    category: '에너지 운영소',
    facilityScale: '8,300㎡',
    monthlyVolume: '11,280건',
    achievementRate: '97%',
    checkedAt: '2026.03.22',
    lat: 35.5384,
    lng: 129.3114,
    status: 'stable',
  },
]

export const homeStats = {
  siteCount: siteList.length,
  categorySummary: [
    { label: '물류', value: '18,200건' },
    { label: '생산', value: '13,600건' },
    { label: '품질', value: '7,450건' },
    { label: '에너지', value: '11,280건' },
  ],
}
