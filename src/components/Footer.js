import Link from 'next/link';
import { FiMail, FiGithub, FiTwitter, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              Game of Excellence
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              Free online tools for image editing and processing
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Tools</h2>
              <ul className="text-gray-300">
                <li className="mb-2">
                  <Link href="/tools/watermark-remover" className="hover:underline">
                    Watermark Remover
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/tools/id-photo-background" className="hover:underline">
                    ID Photo Background
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/tools/transparent-maker" className="hover:underline">
                    Transparent Maker
                  </Link>
                </li>
                <li>
                  <Link href="/tools/image-splitter" className="hover:underline">
                    Image Splitter
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Legal</h2>
              <ul className="text-gray-300">
                <li className="mb-2">
                  <Link href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Company</h2>
              <ul className="text-gray-300">
                <li className="mb-2">
                  <Link href="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr className="my-6 border-gray-700 sm:mx-auto" />
        
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-300">
            © {new Date().getFullYear()} Game of Excellence. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
