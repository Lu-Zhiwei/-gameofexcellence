import Link from 'next/link';
import Image from 'next/image';

export default function ToolCard({ title, description, icon, link }) {
  return (
    <Link href={link} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-blue-600">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
