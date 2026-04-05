<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { SiteItem } from '@/constants/home/data'
import { siteStatusMeta } from '@/constants/home/data'

type KakaoLatLng = new (
  lat: number,
  lng: number,
) => {
  getLat: () => number
  getLng: () => number
}

type KakaoMapInstance = {
  relayout: () => void
  setCenter: (latlng: InstanceType<KakaoLatLng>) => void
  getCenter: () => {
    getLat: () => number
    getLng: () => number
  }
  getLevel: () => number
  setLevel: (level: number, options?: { animate?: boolean }) => void
}

type KakaoMap = new (
  container: HTMLElement,
  options: {
    center: InstanceType<KakaoLatLng>
    level: number
    maxLevel?: number
  },
) => KakaoMapInstance

type KakaoCustomOverlayInstance = {
  setMap: (map: KakaoMapInstance | null) => void
  setZIndex: (zIndex: number) => void
}

type KakaoCustomOverlay = new (options: {
  position: InstanceType<KakaoLatLng>
  content: HTMLElement
  yAnchor?: number
  clickable?: boolean
}) => KakaoCustomOverlayInstance

type KakaoMapsEvent = {
  addListener: (target: object, type: string, handler: () => void) => void
}

type KakaoMaps = {
  load: (callback: () => void) => void
  Map: KakaoMap
  CustomOverlay: KakaoCustomOverlay
  LatLng: KakaoLatLng
  event: KakaoMapsEvent
}

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps
    }
  }
}

const props = defineProps<{
  siteList: SiteItem[]
  selectedSiteId: number | null
}>()

const emit = defineEmits<{
  (e: 'select-site', siteId: number): void
}>()

const mapContainer = ref<HTMLElement | null>(null)
const mapInstance = ref<KakaoMapInstance | null>(null)

const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY

const INITIAL_LEVEL = 13
const MAX_LEVEL = 13

const DEFAULT_CENTER = {
  lat: 37,
  lng: 127.6,
}

const BOUNDS = {
  southWest: {
    lat: 33.0,
    lng: 124.5,
  },
  northEast: {
    lat: 39.5,
    lng: 132.5,
  },
}

const MARKER_SVG = `
  <svg width="26" height="34" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.8096 0.75C28.7938 0.75 36.869 8.96049 36.8691 19.0654C36.8691 20.8597 36.3263 22.8534 35.4727 24.8936C34.6157 26.9415 33.4256 29.0831 32.085 31.1855C29.4039 35.3901 26.0845 39.4961 23.5137 42.4717C21.0075 45.3723 16.6116 45.3723 14.1055 42.4717C11.5346 39.4961 8.21525 35.3901 5.53418 31.1855C4.19356 29.0831 3.0034 26.9415 2.14648 24.8936C1.29285 22.8534 0.75 20.8597 0.75 19.0654C0.750119 8.9605 8.82526 0.750009 18.8096 0.75ZM18.8096 10.79C14.3874 10.7901 10.7833 14.4307 10.7832 18.9453C10.7832 23.4601 14.3873 27.1015 18.8096 27.1016C23.2318 27.1016 26.8359 23.4601 26.8359 18.9453C26.8358 14.4307 23.2318 10.79 18.8096 10.79Z"
      fill="currentColor"
      stroke="white"
      stroke-width="1.5"
    />
  </svg>
`

const overlayMap = new Map<
  number,
  {
    overlay: KakaoCustomOverlayInstance
    element: HTMLButtonElement
  }
>()

let resizeHandler: (() => void) | null = null

const loadKakaoMapScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (!KAKAO_MAP_KEY) {
      reject(new Error('VITE_KAKAO_MAP_KEY가 설정되지 않았습니다.'))
      return
    }

    if (window.kakao?.maps) {
      resolve()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-maps="true"]',
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener(
        'error',
        () => reject(new Error('카카오맵 스크립트 로드 실패')),
        { once: true },
      )
      return
    }

    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`
    script.async = true
    script.dataset.kakaoMaps = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('카카오맵 스크립트 로드 실패'))

    document.head.appendChild(script)
  })
}

const getMarkerClassName = (site: SiteItem) => {
  const statusClassName = siteStatusMeta[site.status].className
  const activeClassName = site.id === props.selectedSiteId ? 'active' : ''

  return ['map_marker', statusClassName, activeClassName].filter(Boolean).join(' ')
}

const createMarkerElement = (site: SiteItem) => {
  const markerElement = document.createElement('button')

  markerElement.type = 'button'
  markerElement.className = getMarkerClassName(site)
  markerElement.setAttribute('aria-label', `${site.name} 마커`)
  markerElement.innerHTML = MARKER_SVG

  markerElement.addEventListener('click', () => {
    emit('select-site', site.id)
  })

  return markerElement
}

const clearOverlays = () => {
  overlayMap.forEach(({ overlay }) => {
    overlay.setMap(null)
  })

  overlayMap.clear()
}

const createMarkers = () => {
  const kakaoMaps = window.kakao?.maps
  const map = mapInstance.value

  if (!kakaoMaps || !map) return

  clearOverlays()

  props.siteList.forEach((site) => {
    const markerElement = createMarkerElement(site)

    const overlay = new kakaoMaps.CustomOverlay({
      position: new kakaoMaps.LatLng(site.lat, site.lng),
      content: markerElement,
      yAnchor: 1,
      clickable: true,
    })

    overlay.setMap(map)
    overlay.setZIndex(site.id === props.selectedSiteId ? 10 : 1)

    overlayMap.set(site.id, {
      overlay,
      element: markerElement,
    })
  })
}

const updateMarkerStyles = () => {
  props.siteList.forEach((site) => {
    const overlayItem = overlayMap.get(site.id)

    if (!overlayItem) return

    overlayItem.element.className = getMarkerClassName(site)
    overlayItem.overlay.setZIndex(site.id === props.selectedSiteId ? 10 : 1)
  })
}

onMounted(async () => {
  try {
    await loadKakaoMapScript()
    await nextTick()

    const container = mapContainer.value
    if (!container || !window.kakao?.maps) return

    window.kakao.maps.load(() => {
      const kakaoMaps = window.kakao?.maps
      if (!kakaoMaps) return

      const defaultCenter = new kakaoMaps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng)

      const map = new kakaoMaps.Map(container, {
        center: defaultCenter,
        level: INITIAL_LEVEL,
        maxLevel: MAX_LEVEL,
      })

      mapInstance.value = map

      const clampCenter = () => {
        const currentCenter = map.getCenter()

        const nextLat = Math.min(
          BOUNDS.northEast.lat,
          Math.max(BOUNDS.southWest.lat, currentCenter.getLat()),
        )

        const nextLng = Math.min(
          BOUNDS.northEast.lng,
          Math.max(BOUNDS.southWest.lng, currentCenter.getLng()),
        )

        const isOutOfBounds =
          nextLat !== currentCenter.getLat() || nextLng !== currentCenter.getLng()

        if (isOutOfBounds) {
          map.setCenter(new kakaoMaps.LatLng(nextLat, nextLng))
        }
      }

      const resetToDefaultCenter = () => {
        map.setLevel(MAX_LEVEL, { animate: true })
        map.setCenter(defaultCenter)
      }

      requestAnimationFrame(() => {
        map.relayout()
        map.setCenter(defaultCenter)
      })

      setTimeout(() => {
        createMarkers()
      }, 0)

      kakaoMaps.event.addListener(map, 'zoom_changed', () => {
        const currentLevel = map.getLevel()

        if (currentLevel >= MAX_LEVEL) {
          resetToDefaultCenter()
          return
        }

        clampCenter()
      })

      kakaoMaps.event.addListener(map, 'dragend', () => {
        if (map.getLevel() >= MAX_LEVEL) {
          resetToDefaultCenter()
          return
        }

        clampCenter()
      })

      resizeHandler = () => {
        map.relayout()

        if (map.getLevel() >= MAX_LEVEL) {
          map.setCenter(defaultCenter)
          return
        }

        clampCenter()
      }

      window.addEventListener('resize', resizeHandler)
    })
  } catch (error) {
    console.error(error)
  }
})

watch(
  () => props.selectedSiteId,
  () => {
    updateMarkerStyles()
  },
)

watch(
  () => props.siteList,
  () => {
    createMarkers()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }

  clearOverlays()
})
</script>

<template>
  <div ref="mapContainer" class="home_map"></div>
</template>

<style scoped>
.home_map {
  width: 100%;
  height: 100%;
}

:deep(.map_marker) {
  filter: drop-shadow(0 0.35rem 0.6rem rgba(0, 0, 0, 0.5));
}

:deep(.map_marker.stable) {
  color: var(--blue-color);
}

:deep(.map_marker.warning) {
  color: var(--red-color);
}

:deep(.map_marker.active) {
  transform: scale(1.25);
}
</style>
