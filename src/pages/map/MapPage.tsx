import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Badge } from '@/components/ui/Badge';
import { mockLocations, type Location } from '@/data/mockLocations';
import { getCSSVar } from '@/lib/chartUtils';
import { useTheme } from '@/hooks/useTheme';
import styles from './MapPage.module.css';

// Fix Leaflet default icon issue with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const typeToVar: Record<Location['type'], string> = {
  Office: '--color-info',
  Client: '--color-success',
  Warehouse: '--color-warning',
  Event: '--color-error',
};

function createClusterIcon(cluster: L.MarkerCluster) {
  const count = cluster.getChildCount();
  const color = getCSSVar('--color-primary');
  const textColor = getCSSVar('--color-text-inverse');
  return L.divIcon({
    html: `<div style="background:${color};color:${textColor};width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;box-shadow:0 2px 6px ${getCSSVar('--color-secondary')}4D;">${count}</div>`,
    className: styles.customMarker,
    iconSize: L.point(36, 36),
  });
}

function createIcon(type: Location['type']) {
  const color = getCSSVar(typeToVar[type]);
  const borderColor = getCSSVar('--color-surface');
  return L.divIcon({
    className: styles.customMarker,
    html: `<div style="background:${color};width:28px;height:28px;border-radius:50%;border:3px solid ${borderColor};box-shadow:0 2px 6px ${getCSSVar('--color-secondary')}4D;"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

const typeVariant = (t: Location['type']) => {
  if (t === 'Office') return 'info' as const;
  if (t === 'Client') return 'success' as const;
  if (t === 'Warehouse') return 'warning' as const;
  return 'error' as const;
};

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 12, { duration: 1 });
  return null;
}

function isDarkTheme(bgColor: string): boolean {
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

export function MapPage() {
  const { theme } = useTheme();
  const dark = isDarkTheme(theme.colors.background.value);
  const [selected, setSelected] = useState<Location | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null);
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const handleLocationClick = (loc: Location) => {
    setSelected(loc);
    setFlyTarget({ lat: loc.lat, lng: loc.lng });
    const marker = markerRefs.current[loc.id];
    if (marker) {
      marker.openPopup();
    }
  };

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Locations</h2>
        <div className={styles.locationList}>
          {mockLocations.map((loc) => (
            <button
              key={loc.id}
              className={`${styles.locationItem} ${selected?.id === loc.id ? styles.selected : ''}`}
              onClick={() => handleLocationClick(loc)}
            >
              <div className={styles.locationHeader}>
                <span className={styles.locationName}>{loc.name}</span>
                <Badge variant={typeVariant(loc.type)}>{loc.type}</Badge>
              </div>
              <span className={styles.locationAddress}>{loc.address}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className={styles.mapContainer}>
        <MapContainer
          center={[30, 0]}
          zoom={2}
          minZoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom
        >
          <TileLayer
            attribution={dark
              ? '&copy; <a href="https://carto.com/">CARTO</a>'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
            url={dark
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
            key={`tile-${theme.id}`}
          />
          {flyTarget && <FlyTo lat={flyTarget.lat} lng={flyTarget.lng} />}
          <MarkerClusterGroup
            iconCreateFunction={createClusterIcon}
            key={`cluster-${theme.id}`}
          >
            {mockLocations.map((loc) => (
              <Marker
                key={`${theme.id}-${loc.id}`}
                position={[loc.lat, loc.lng]}
                icon={createIcon(loc.type)}
                ref={(ref) => {
                  if (ref) markerRefs.current[loc.id] = ref;
                }}
                eventHandlers={{
                  click: () => setSelected(loc),
                }}
              >
                <Popup>
                  <div className={styles.popup}>
                    <strong>{loc.name}</strong>
                    <Badge variant={typeVariant(loc.type)}>{loc.type}</Badge>
                    <p>{loc.address}</p>
                    <p className={styles.popupDesc}>{loc.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
