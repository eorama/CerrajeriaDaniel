import { useState, useEffect } from 'react';
import ReviewCard from '../molecules/ReviewCard';
import Icon from '../atoms/Icon';

const reviewsData = [
    {
        author: "JAVIER RAMOS B.",
        date: "hace 2 meses",
        text: "gente seria llegaron rapido trabajaron bien y el precio, creo. fue razonable."
    },
    {
        author: "Alejandro G.",
        date: "hace 2 meses",
        text: "Rápido y efectivo en el trabajo. Precio razonable debido a ser la madrugada de un sábado."
    },
    {
        author: "Jose V.",
        date: "hace 2 meses",
        text: "Serios, rápidos, eficientes y precio razonable"
    },
    {
        author: "Juampe A. J.",
        date: "hace 2 meses",
        text: "Llamé a este cerrajero porque no podía entrar a mi casa, en 20 minutos llegó y solucionó el problema. Encima un precio moderado. Profesionalidad y amabilidad. Gracias!"
    },
    {
        author: "Marta Carmona C.",
        date: "hace 2 meses",
        text: "nos atendió Daniel de urgencia debido a una avería en nuestra cerradura, muy amable nos solucionó todo el problema incluso tuvo que montar y desmontar varias veces hasta, que no quedó perfecto no terminó el trabajo! Muy agradecidos!"
    },
    {
        author: "Joshuán Tacoronte G.",
        date: "hace 2 meses",
        text: "100% recomendable. Rápido y efectivo. Apertura de puerta con llave en el interior, solucionado en poco más de una hora desde que se le informa."
    },
    {
        author: "Marian F.",
        date: "hace 3 meses",
        text: "Maravilloso servicio. Fueron muy rápidos y eficientes en su trabajo. Dejé mis llaves dentro de casa y rápidamente solucionaron mi problema. Los recomiendo"
    },
    {
        author: "nancy C.",
        date: "hace 3 meses",
        text: "Rápido y serio, 100% recomendable"
    },
    {
        author: "alejandra carolina mendible G.",
        date: "hace 3 meses",
        text: "Excelente servicio y sobre todo la rapidez de tendernos"
    }
];

export default function ReviewsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setItemsToShow(3);
            else if (window.innerWidth >= 768) setItemsToShow(2);
            else setItemsToShow(1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 >= reviewsData.length - itemsToShow + 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? reviewsData.length - itemsToShow : prevIndex - 1
        );
    };

    return (
        <div className="relative overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
                {reviewsData.map((review, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 px-3 w-full md:w-1/2 lg:w-1/3"
                        style={{ width: `${100 / itemsToShow}%` }}
                    >
                        <ReviewCard
                            author={review.author}
                            text={review.text}
                            date={review.date}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-primary hover:text-action z-10"
                aria-label="Previous slide"
            >
                <span className="text-2xl font-bold">‹</span>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-primary hover:text-action z-10"
                aria-label="Next slide"
            >
                <span className="text-2xl font-bold">›</span>
            </button>
        </div>
    );
}
