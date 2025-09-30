import Link from 'next/link';
import { Instagram, Facebook, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white ">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 border-2 border-white mr-3">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white transform rotate-45"></div>
                </div>
              </div>
              <span className="text-xl font-bold tracking-wider">StayZy</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              STAY EASY WITH STAYZY
            </p>
            <p className="text-sm text-gray-300 mt-4 leading-relaxed">
              Find your perfect rental property or manage your properties with ease.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-white font-semibold mb-6">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/find-properties" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Find Properties
                </Link>
              </li>
              <li>
                <Link href="/list-property" className="text-gray-300 hover:text-white transition-colors duration-200">
                  List your Property
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2" />
                Bangalore
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-300" />
                <a 
                  href="mailto:stayzy@gmail.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  stayzy@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Instagram size={16} className="mr-2 text-gray-300" />
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Border and Copyright */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-gray-400 text-sm">
            © 2025 StayZy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}