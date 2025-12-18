import Icon from '../atoms/Icon';

interface Props {
    author: string;
    text: string;
    date: string;
    stars?: number;
}

export default function ReviewCard({ author, text, date, stars = 5 }: Props) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full flex flex-col">
            <div className="flex text-yellow-400 mb-3">
                {[...Array(stars)].map((_, i) => (
                    <Icon key={i} name="star" size={18} className="fill-current" />
                ))}
            </div>
            <p className="text-gray-600 italic mb-6 flex-grow">"{text}"</p>
            <div className="mt-auto border-t pt-4 border-gray-100 flex justify-between items-center bg-gray-50 -mx-6 -mb-6 px-6 py-3 rounded-b-lg">
                <span className="font-bold text-sm">{author}</span>
                <span className="text-xs text-gray-500">{date}</span>
            </div>
        </div>
    );
}
