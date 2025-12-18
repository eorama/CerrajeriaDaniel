import Icon from '../atoms/Icon';

interface Props {
    title: string;
    zones: string[];
}

export default function ZoneList({ title, zones }: Props) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-primary border-b pb-2 border-gray-100">{title}</h3>
            <ul className="grid grid-cols-1 gap-2">
                {zones.map((zone, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-sm hover:text-primary transition-colors cursor-default">
                        <span className="mr-2 text-action">
                            <Icon name="check" size={14} />
                        </span>
                        {zone}
                    </li>
                ))}
            </ul>
        </div>
    );
}
