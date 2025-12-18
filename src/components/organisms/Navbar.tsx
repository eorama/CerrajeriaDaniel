import { useState, useRef, useEffect } from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

interface MenuItem {
    name: string;
    href?: string;
    children?: MenuItem[];
    noLink?: boolean;
}

const navStructure: MenuItem[] = [
    { name: 'Inicio', href: '/CerrajeriaDaniel/' },
    { name: 'Quienes Somos', href: '/CerrajeriaDaniel/quienes-somos' },
    {
        name: 'Servicios',
        noLink: true,
        children: [
            {
                name: 'Aperturas',
                // Placeholder image for Aperturas
                href: 'https://placehold.co/120x120/0c132e/dcac00?text=Aperturas',
                children: [
                    { name: 'Apertura de puertas Tenerife', href: '/CerrajeriaDaniel/servicios/apertura-de-puertas-tenerife' },
                    { name: 'Apertura de coches Tenerife', href: '/CerrajeriaDaniel/servicios/apertura-de-coches-tenerife' },
                    { name: 'Apertura de cajas fuertes Tenerife', href: '/CerrajeriaDaniel/servicios/apertura-de-cajas-fuertes-tenerife' },
                    { name: 'Amaestramiento de cerraduras Tenerife', href: '/CerrajeriaDaniel/servicios/amaestramiento-de-cerraduras-tenerife' },
                ]
            },
            {
                name: 'Cerraduras',
                // Placeholder image for Cerraduras
                href: 'https://placehold.co/120x120/0c132e/dcac00?text=Cerraduras',
                children: [
                    { name: 'Cambio y reparación de cerraduras Tenerife', href: '/CerrajeriaDaniel/servicios/cambio-y-reparacion-de-cerraduras-tenerife' },
                    { name: 'Reparación de cerraduras electrónicas Tenerife', href: '/CerrajeriaDaniel/servicios/reparacion-de-cerraduras-electronicas-tenerife' },
                    { name: 'Instalación de cerrojos Tenerife', href: '/CerrajeriaDaniel/servicios/instalacion-de-cerrojos-tenerife' },
                ]
            },
            {
                name: 'Llaves y Mandos',
                // Placeholder image for Llaves
                href: 'https://placehold.co/120x120/0c132e/dcac00?text=Llaves',
                children: [
                    { name: 'Duplicado de llaves Tenerife', href: '/CerrajeriaDaniel/servicios/duplicado-de-llaves-tenerife' },
                    { name: 'Copia de llaves de coche Tenerife', href: '/CerrajeriaDaniel/servicios/copia-de-llaves-de-coche-tenerife' },
                    { name: 'Reparación de mandos de coche Tenerife', href: '/CerrajeriaDaniel/servicios/reparacion-de-mandos-de-coche-tenerife' },
                    { name: 'Duplicado de mandos de garaje Tenerife', href: '/CerrajeriaDaniel/servicios/duplicado-de-mandos-de-garaje-tenerife' },
                ]
            }
        ]
    },
    { name: 'Zonas de Servicio', href: '/CerrajeriaDaniel/#zonas' },
    { name: 'Contacto', href: '/CerrajeriaDaniel/contacto' },
];

export default function Navbar({ currentPath = '' }: { currentPath?: string }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const megaMenuTimer = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (megaMenuTimer.current) clearTimeout(megaMenuTimer.current);
        setIsMegaMenuOpen(true);
    };

    const handleMouseLeave = () => {
        megaMenuTimer.current = setTimeout(() => {
            setIsMegaMenuOpen(false);
        }, 200); // Small delay to allow moving mouse to the menu
    };

    const isActive = (href?: string): boolean => {
        if (!href) return false;
        if (href === '/' && currentPath === '/') return true;
        if (href !== '/' && currentPath.startsWith(href)) return true;
        return false;
    };

    // Check if any child of a menu item is active (for Services parent state)
    // Check if any child of a menu item is active (for Services parent state)
    const isParentActive = (item: MenuItem): boolean => {
        if (item.children) {
            return item.children.some(child =>
                child.href ? isActive(child.href) : isParentActive(child)
            );
        }
        return false;
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/CerrajeriaDaniel/" className="hover:opacity-90 transition-opacity" aria-label="Ir al inicio">
                            <img src="/CerrajeriaDaniel/images/logo.png" alt="Cerrajero Tenerife 24h" width="420" height="109" className="h-14 w-auto object-contain" />
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-grow justify-center items-center space-x-8 h-full">
                        {navStructure.map((item, index) => {
                            const active = isActive(item.href) || isParentActive(item);
                            const activeClass = active ? 'text-action border-action' : 'text-dark-text border-transparent';

                            if (item.name === 'Servicios') {
                                return (
                                    <div
                                        key={index}
                                        className="relative h-full flex items-center"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <button aria-expanded={isMegaMenuOpen} className={`${activeClass} hover:text-action font-medium transition-colors flex items-center h-full border-b-2 hover:border-action cursor-default`}>
                                            {item.name}
                                            <span className="ml-1 text-xs" aria-hidden="true">▼</span>
                                        </button>

                                        {/* MEGA MENU */}
                                        {isMegaMenuOpen && (
                                            <div
                                                className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[900px] bg-white shadow-2xl rounded-b-xl border-t-4 border-action animate-fade-in-down overflow-hidden"
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100">
                                                    {item.children?.map((category, catIndex) => (
                                                        <div key={catIndex} className="p-6 bg-gray-50/50 hover:bg-white transition-colors">
                                                            <h3 className="font-bold text-primary text-lg mb-4 border-b border-gray-200 pb-2">
                                                                {category.name}
                                                            </h3>
                                                            <div className="flex items-start gap-4">
                                                                {/* Image on Left (using placeholder stored in href property for convenience in this struct) */}
                                                                <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                                                                    <img
                                                                        src={category.href}
                                                                        alt=""
                                                                        width="120"
                                                                        height="120"
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                {/* Links on Right */}
                                                                <ul className="space-y-2 flex-grow">
                                                                    {category.children?.map((link, linkIndex) => {
                                                                        const isLinkActive = isActive(link.href);
                                                                        return (
                                                                            <li key={linkIndex}>
                                                                                <a
                                                                                    href={link.href}
                                                                                    className={`text-sm block transition-all hover:translate-x-1 relative ${isLinkActive ? 'text-action font-bold' : 'text-gray-600 hover:text-action hover:font-semibold'}`}
                                                                                >
                                                                                    {link.name}
                                                                                </a>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className={`${activeClass} hover:text-action font-medium transition-colors border-b-2 hover:border-action h-full flex items-center`}
                                    >
                                        {item.name}
                                    </a>
                                );
                            }
                        })}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="text-right hidden lg:block mr-2">
                            <span className="block text-xs text-gray-500 font-semibold uppercase">Urgencias 24h/365d</span>
                            <span className="block text-lg font-bold text-primary">922 07 62 89</span>
                        </div>
                        <Button variant="action" href="tel:+34922076289" className="text-sm px-4 py-2">
                            <Icon name="phone" size={18} className="mr-2" />
                            Llamar
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
                        >
                            <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content (simplified for mobile, keeping accordions would be ideal but stacking for now) */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 max-h-[80vh] overflow-y-auto">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navStructure.map((item, index) => (
                            <div key={index}>
                                {item.children ? (
                                    <div className="px-3 py-2">
                                        <span className="block font-bold text-primary mb-2">{item.name}</span>
                                        <div className="pl-4 space-y-4">
                                            {item.children.map((cat, i) => (
                                                <div key={i}>
                                                    <span className="block text-xs font-bold text-gray-500 uppercase mb-1">{cat.name}</span>
                                                    <ul className="pl-2 space-y-1 border-l-2 border-gray-100">
                                                        {cat.children?.map((link, j) => {
                                                            const isLinkActive = isActive(link.href);
                                                            return (
                                                                <li key={j}>
                                                                    <a href={link.href} className={`block text-sm py-1 hover:text-action ${isLinkActive ? 'text-action font-bold' : 'text-gray-600'}`}>
                                                                        {link.name}
                                                                    </a>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href={item.href}
                                        className={`block px-3 py-2 rounded-md text-base font-medium hover:text-action hover:bg-gray-50 ${isActive(item.href) ? 'text-action bg-gray-50 font-bold' : 'text-gray-700'}`}
                                    >
                                        {item.name}
                                    </a>
                                )}
                            </div>
                        ))}
                        <div className="pt-4 pb-2 px-3">
                            <Button variant="action" href="tel:+34678921161" className="w-full justify-center">
                                <Icon name="phone" size={20} className="mr-2" />
                                Llamar Ahora
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
