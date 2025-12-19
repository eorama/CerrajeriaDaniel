import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 max-w-sm bg-white p-6 rounded-lg shadow-2xl border border-gray-100 animate-fade-in-up">
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Politica de Cookies</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación.
                    </p>
                </div>
                <div className="flex items-center justify-between gap-4 mt-2">
                    <a
                        href="/CerrajeriaDaniel/politica-de-cookies"
                        className="text-primary hover:text-action text-sm font-medium underline transition-colors"
                    >
                        Ver Política
                    </a>
                    <button
                        onClick={handleAccept}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
