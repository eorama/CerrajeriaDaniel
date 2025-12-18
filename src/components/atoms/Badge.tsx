import Icon from './Icon';

interface Props {
    text: string;
}

export default function Badge({ text }: Props) {
    return (
        <div className="inline-flex items-center bg-blue-50 text-primary border border-blue-100 rounded-full px-4 py-1.5 shadow-sm">
            <span className="text-action mr-2">
                <Icon name="check" size={16} />
            </span>
            <span className="text-sm font-semibold">{text}</span>
        </div>
    );
}
