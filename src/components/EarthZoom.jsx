import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

// Exact Coordinate for Livada Stăuini
const LIVADA_COORDS = [46.033076, 23.475022];
const LIVADA_ZOOM = 17;

export default function EarthZoom() {
    const containerRef = useRef(null);

    useEffect(() => {
        const apiKey = window.env?.REACT_APP_GOOGLE_MAPS_API_KEY;
        const hasGoogleKey = apiKey && !apiKey.includes('%');

        if (hasGoogleKey) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMap`;
            script.async = true;
            script.defer = true;
            window.initGoogleMap = () => {
                new window.google.maps.Map(containerRef.current, {
                    center: { lat: LIVADA_COORDS[0], lng: LIVADA_COORDS[1] },
                    zoom: LIVADA_ZOOM,
                    mapTypeId: 'satellite',
                    disableDefaultUI: true,
                    gestureHandling: 'none',
                    keyboardShortcuts: false,
                });
            };
            document.body.appendChild(script);

            return () => {
                if (script.parentNode) script.parentNode.removeChild(script);
                delete window.initGoogleMap;
            };
        }

        let cancelled = false;
        let mapInstance = null;

        const loadLeaflet = async () => {
            const L = await import('leaflet');
            if (cancelled || !containerRef.current || containerRef.current._leaflet_id) return;

            mapInstance = L.map(containerRef.current, {
                zoomControl: false,
                attributionControl: false,
                dragging: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                touchZoom: false,
                boxZoom: false,
                keyboard: false,
            }).setView(LIVADA_COORDS, LIVADA_ZOOM);

            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri'
            }).addTo(mapInstance);
        };

        loadLeaflet();

        return () => {
            cancelled = true;
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center pointer-events-none select-none">
            <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"></div>

            <div className="absolute inset-x-4 bottom-12 sm:bottom-12 flex justify-center pointer-events-none z-10">
                <div className="bg-black/65 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10 text-cream text-xs sm:text-sm md:text-base font-body shadow-2xl text-center">
                    <span className="font-semibold text-terracotta">Livada Stăuini</span> — Stăuini, Vințu de Jos, Alba
                </div>
            </div>
        </div>
    );
}
