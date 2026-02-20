import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Coordinate for Livada Stăuini (approx Vințu de Jos, Alba)
const LIVADA_COORDS = [45.9881, 23.4962];

export default function EarthZoom() {
    const containerRef = useRef(null);
    const [mapEngine, setMapEngine] = useState(null); // 'google', 'leaflet', or null
    const fallbackRef = useRef(null);

    useEffect(() => {
        const apiKey = window.env?.REACT_APP_GOOGLE_MAPS_API_KEY;
        const hasGoogleKey = apiKey && !apiKey.includes('%');

        if (hasGoogleKey) {
            setMapEngine('google');
            // In a real scenario, we inject the Google Maps JS script
            // and use google.maps.Map with a cinematic fly-to animation.
            // For now we simulate the integration check.
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMap`;
            script.async = true;
            script.defer = true;
            window.initGoogleMap = () => {
                const map = new window.google.maps.Map(containerRef.current, {
                    center: { lat: 0, lng: 0 },
                    zoom: 2,
                    mapTypeId: 'satellite',
                    disableDefaultUI: true,
                });
                // Simulate Earth zoom
                setTimeout(() => {
                    map.panTo({ lat: LIVADA_COORDS[0], lng: LIVADA_COORDS[1] });
                    map.setZoom(15);
                }, 1000);
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
                delete window.initGoogleMap;
            };
        } else {
            setMapEngine('leaflet');
            // Load Leaflet Fallback
            const loadLeaflet = async () => {
                // We do a dynamic inject of leaflet CSS & JS so we don't bundle it heavily if not used.
                if (!document.getElementById('leaflet-css')) {
                    const link = document.createElement('link');
                    link.id = 'leaflet-css';
                    link.rel = 'stylesheet';
                    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                    document.head.appendChild(link);
                }

                const L = await import('leaflet');
                // Initialize Map
                if (containerRef.current && !containerRef.current._leaflet_id) {
                    const map = L.map(containerRef.current, {
                        zoomControl: false,
                        attributionControl: false
                    }).setView([0, 0], 2);

                    // Esri World Imagery provides great free satellite fallback without a key
                    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    }).addTo(map);

                    // Cinematic Fly To
                    setTimeout(() => {
                        map.flyTo(LIVADA_COORDS, 16, {
                            animate: true,
                            duration: 7, // 7 seconds zoom
                            easeLinearity: 0.1
                        });
                    }, 1000);
                }
            };
            loadLeaflet();
        }
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black">
            <div ref={containerRef} className="absolute inset-0 w-full h-full"></div>

            {/* Label overlays fading in after zoom */}
            <div className="absolute inset-x-0 bottom-12 flex justify-center opacity-0 animate-[fadeIn_2s_ease-out_8s_forwards] pointer-events-none z-10">
                <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-cream text-sm md:text-base font-body">
                    <span className="font-semibold">Livada Stăuini</span> — Stăuini, Vințu de Jos, Alba
                </div>
            </div>
        </div>
    );
}
