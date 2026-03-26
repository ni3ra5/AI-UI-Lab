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

export function MapPage() {
  const { theme } = useTheme();
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
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {flyTarget && <FlyTo lat={flyTarget.lat} lng={flyTarget.lng} />}
          <MarkerClusterGroup
            iconCreateFunction={createClusterIcon}
            key={theme.id}
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
