import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import { FaEraser, FaIdCard, FaImage, FaCrop } from 'react-icons/fa';

export default function Home() {
  const tools = [
    {
      title: 'Watermark Remover',
      description: 'Remove unwanted watermarks from your images easily.',
      icon: <FaEraser size={40} />,
      link: '/tools/watermark-remover'
    },
    {
      title: 'ID Photo Background',
      description: 'Change the background of ID photos to match requirements.',
      icon: <FaIdCard size={40} />,
      link: '/tools/id-photo-background'
    },
    {
      title: 'Transparent Maker',
      description: 'Convert image backgrounds to transparent with one click.',
      icon: <FaImage size={40} />,
      link: '/tools/transparent-maker'
    },
    {
      title: 'Image Splitter',
      description: 'Split your images into four equal parts easily.',
      icon: <FaCrop size={40} />,
      link: '/tools/image-splitter'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Free Online Image Tools
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Edit, transform, and enhance your images with our easy-to-use online tools.
            No registration required. Fast, free, and secure.
          </p>
          <div className="mb-8">
            <SearchBar />
          </div>
        </div>
      </section>
      
      {/* Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                link={tool.link}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600">
                All image processing happens directly in your browser. No waiting for uploads or downloads.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your images never leave your device. We don't store or collect any of your data.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-2">Free to Use</h3>
              <p className="text-gray-600">
                All our tools are completely free to use. No hidden fees or subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
