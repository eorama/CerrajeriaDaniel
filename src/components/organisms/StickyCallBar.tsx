import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

export default function StickyCallBar() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden flex justify-between p-3 gap-3 border-t border-gray-100">
            <a
                href="tel:+34922076289"
                className="flex-1 bg-action text-title-text font-bold py-3 rounded-lg flex items-center justify-center shadow-sm active:bg-yellow-500"
            >
                <span className="mr-2"><Icon name="phone" size={20} /></span>
                Llamar
            </a>
            <a
                href="https://wa.me/34678921161"
                className="flex-1 bg-[#25D366] text-white font-bold py-3 rounded-lg flex items-center justify-center shadow-sm active:bg-[#128C7E]"
            >
                <span className="mr-2"><Icon name="whatsapp" size={20} /></span>
                WhatsApp
            </a>
        </div>
    );
}
