import React, { useEffect, useRef, useState } from 'react';

// Exact Coordinate for Livada Stăuini
const LIVADA_COORDS = [46.033076, 23.475022];

export default function EarthZoom() {
    const containerRef = useRef(null);
    const [mapEngine, setMapEngine] = useState(null);

    useEffect(() => {
        const apiKey = window.env?.REACT_APP_GOOGLE_MAPS_API_KEY;
        const hasGoogleKey = apiKey && !apiKey.includes('%');

        if (hasGoogleKey) {
            setMapEngine('google');
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMap`;
            script.async = true;
            script.defer = true;
            window.initGoogleMap = () => {
                const map = new window.google.maps.Map(containerRef.current, {
                    center: { lat: 20, lng: 0 },
                    zoom: 2,
                    mapTypeId: 'satellite',
                    disableDefaultUI: true,
                    // Disable interaction during cinematic fly-in
                    gestureHandling: 'none',
                });

                // Simulate Earth zoom
                setTimeout(() => {
                    map.panTo({ lat: LIVADA_COORDS[0], lng: LIVADA_COORDS[1] });
                    map.setZoom(16);
                    // Map interaction remains disabled per user request
                }, 1000);
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
                delete window.initGoogleMap;
            };
        } else {
            setMapEngine('leaflet');
            const loadLeaflet = async () => {
                if (!document.getElementById('leaflet-css')) {
                    const link = document.createElement('link');
                    link.id = 'leaflet-css';
                    link.rel = 'stylesheet';
                    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                    document.head.appendChild(link);
                }

                const L = await import('leaflet');
                if (containerRef.current && !containerRef.current._leaflet_id) {
                    const map = L.map(containerRef.current, {
                        zoomControl: false,
                        attributionControl: false,
                        dragging: false, // Prevent user from panning around the map
                        scrollWheelZoom: 'center', // Only zoom in/out at the center
                        doubleClickZoom: 'center',
                        touchZoom: 'center'
                    }).setView([20, 0], 2);

                    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                        attribution: 'Tiles &copy; Esri &mdash; Source: Esri'
                    }).addTo(map);

                    // Setup cinematic globe effect start point
                    map.setView([50.0, 15.0], 4);

                    // Cinematic Fly To
                    setTimeout(() => {
                        // Map zoom towards Livada Stăuini
                        map.flyTo(LIVADA_COORDS, 17, {
                            animate: true,
                            duration: 6,
                            easeLinearity: 0.1
                        });

                        // Restrict zooming out after the animation completes
                        setTimeout(() => {
                            map.setMinZoom(16);
                        }, 6500);
                    }, 500);
                }
            };
            loadLeaflet();
        }
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
            <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden"></div>

            <div className="absolute inset-x-0 bottom-12 flex justify-center opacity-0 animate-[fadeIn_2s_ease-out_8s_forwards] pointer-events-none z-10">
                <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-cream text-sm md:text-base font-body shadow-2xl">
                    <span className="font-semibold text-terracotta">Livada Stăuini</span> — Stăuini, Vințu de Jos, Alba
                </div>
            </div>
        </div>
    );
}
