import { useState, useEffect } from 'react';
import Button from '../atoms/Button';

// Service structure matching Navbar.tsx
const serviceCategories = {
    'Aperturas': [
        'Apertura de puertas',
        'Apertura de coches',
        'Apertura de cajas fuertes',
        'Amaestramiento de cerraduras'
    ],
    'Cerraduras': [
        'Cambio y reparación de cerraduras',
        'Reparación de cerraduras electrónicas',
        'Instalación de cerrojos'
    ],
    'Llaves y Mandos': [
        'Duplicado de llaves',
        'Copia de llaves de coche',
        'Reparación de mandos de coche',
        'Duplicado de mandos de garaje'
    ]
};

type Category = keyof typeof serviceCategories;

export default function ContactForm() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('Aperturas');

    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        servicio: serviceCategories['Aperturas'][0], // Default to first item of first category
        mensaje: '',
        privacidad: false
    });

    // Update service when category changes
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            servicio: serviceCategories[selectedCategory][0]
        }));
    }, [selectedCategory]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // Checkbox handling hack for typescript
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCategoryChange = (category: Category) => {
        setSelectedCategory(category);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', { ...formData, category: selectedCategory });
        // Redirect to thank you page (client-side navigation)
        window.location.href = '/gracias-presupuesto';
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-action">
            <h3 className="text-2xl font-bold mb-6 text-primary font-heading text-center">Solicitar Presupuesto</h3>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Categoría de Servicio (Radio Buttons) */}
                <div>
                    <span className="block text-sm font-bold text-gray-700 mb-3">¿Qué tipo de servicio necesitas?</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {(Object.keys(serviceCategories) as Category[]).map((category) => (
                            <label
                                key={category}
                                className={`
                                    cursor-pointer border rounded-lg p-3 flex items-center justify-center text-center transition-all
                                    ${selectedCategory === category
                                        ? 'bg-blue-50 border-action ring-1 ring-action text-primary font-bold'
                                        : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'}
                                `}
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    value={category}
                                    checked={selectedCategory === category}
                                    onChange={() => handleCategoryChange(category)}
                                    className="sr-only" // Hide default radio
                                />
                                <span className="text-sm">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Selección de Servicio Específico */}
                <div className="animate-fade-in">
                    <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-1">
                        Servicio Específico de {selectedCategory}
                    </label>
                    <div className="relative">
                        <select
                            id="servicio"
                            name="servicio"
                            className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-action focus:border-action sm:text-sm rounded-md bg-gray-50"
                            value={formData.servicio}
                            onChange={handleChange}
                        >
                            {serviceCategories[selectedCategory].map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-action focus:border-action"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-action focus:border-action"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="600 000 000"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje (Opcional)</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-action focus:border-action"
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder="Detalles adicionales..."
                    ></textarea>
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="privacidad"
                            name="privacidad"
                            type="checkbox"
                            required
                            className="focus:ring-action h-4 w-4 text-action border-gray-300 rounded cursor-pointer"
                            checked={formData.privacidad}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="privacidad" className="font-medium text-gray-600 cursor-pointer">
                            He leído y acepto la <a href="/CerrajeriaDaniel/politica-de-privacidad" className="text-action hover:underline">política de privacidad</a>.
                        </label>
                    </div>
                </div>

                <Button variant="primary" type="submit" className="w-full justify-center py-3 text-lg font-bold shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5">
                    Enviar Solicitud
                </Button>
            </form>
        </div>
    );
}
