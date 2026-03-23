export type AlarmType = 'danger' | 'warning' | 'work' | 'request' | 'week' | 'inquiry'

export interface AlarmItem {
  id: number
  type: AlarmType
  time: string
  message: string
  checked: boolean
}

export const alarmList: AlarmItem[] = [
  {
    id: 1,
    type: 'danger',
    time: '2026-03-18 08:12',
    message: '센서 데이터가 임계값 이하로 감지되었습니다. 즉시 확인이 필요합니다.',
    checked: false,
  },
  {
    id: 2,
    type: 'warning',
    time: '2026-03-18 08:10',
    message: '일부 장비의 상태가 비정상으로 감지되었습니다. 점검이 필요합니다.',
    checked: false,
  },
  {
    id: 3,
    type: 'work',
    time: '2026-03-18 08:05',
    message: '오늘 운영 기록이 등록되지 않았습니다. 데이터를 입력해주세요.',
    checked: false,
  },
  {
    id: 4,
    type: 'request',
    time: '2026-03-18 08:00',
    message: '신규 요청이 접수되었습니다.',
    checked: false,
  },
  {
    id: 5,
    type: 'week',
    time: '2026-03-18 07:50',
    message: '주간 리포트가 생성되었습니다.',
    checked: false,
  },
  {
    id: 6,
    type: 'inquiry',
    time: '2026-03-18 07:30',
    message: '새로운 문의가 등록되었습니다.',
    checked: false,
  },
]
