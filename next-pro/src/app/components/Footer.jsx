// components/Footer.jsx
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#415A80] mt-10 text-[#D7E2E9]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>info@doctorscare.com</span>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>Health Street, Medical City</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#A5D4DC] transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="hover:text-[#A5D4DC] transition duration-300"
                >
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#A5D4DC] transition duration-300"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/appointments"
                  className="hover:text-[#A5D4DC] transition duration-300"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#A5D4DC] transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <p className="mb-6">
              Follow us on social media for the latest updates, health tips, and
              medical news.
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="bg-[#A5D4DC] text-[#415A80] p-2 rounded-full hover:bg-[#D7E2E9] transition duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-[#A5D4DC] text-[#415A80] p-2 rounded-full hover:bg-[#D7E2E9] transition duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-[#A5D4DC] text-[#415A80] p-2 rounded-full hover:bg-[#D7E2E9] transition duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-[#A5D4DC] text-[#415A80] p-2 rounded-full hover:bg-[#D7E2E9] transition duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#A5D4DC] mt-8 pt-6 text-center">
          <p>
            © {new Date().getFullYear()} All Rights Reserved | Medical Care
            Center
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
