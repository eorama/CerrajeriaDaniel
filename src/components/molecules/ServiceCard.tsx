import Icon, { type IconName } from '../atoms/Icon';

interface Props {
    title: string;
    description: string;
    icon: IconName;
    href?: string;
}

export default function ServiceCard({ title, description, icon, href = "#contact" }: Props) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <span className="text-primary group-hover:text-white transition-colors duration-300">
                    <Icon name={icon} size={32} />
                </span>
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
            <a href={href} className="text-primary font-semibold flex items-center group-hover:underline">
                Saber más
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
        </div>
    );
}
