import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaEnvelope,
} from "react-icons/fa"
import logo from "../assets/logo1.png"

const Footer = () => {
    return (
        <footer className="bg-white  mt-16 text-sm text-gray-600 ">
            <div className="max-w-7xl sm:ms-30 px-4 py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3">
                {/* Brand Info */}
                <div>
                    <div >
                        <img src={logo} alt="error" className=" bg-[url(./assets/logo1.png)] bg-cover h-[30vh] w-[50vw] md:h-[20vh] md:w-[40vw] lg:h-[10vh] lg:w-[7vw]" />
                    </div>
                    {/* <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        <span className="text-blue-600">🚗</span> CarRental
                    </h2> */}
                    <p className="leading-relaxed">
                        Premium car rental service with a wide selection of luxury and
                        everyday vehicles for all your driving needs.
                    </p>
                    <div className="flex gap-4 mt-4 text-gray-500">
                        <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
                        <FaTwitter className="hover:text-blue-600 cursor-pointer" />
                        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                        <FaEnvelope className="hover:text-red-500 cursor-pointer" />
                    </div>
                </div>

                <div className="max-w-7xl  grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">QUICK LINKS</h4>
                        <ul className="space-y-2">
                            <li>Home</li>
                            <li>Browse Cars</li>
                            <li>List Your Car</li>
                            <li>About Us</li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">RESOURCES</h4>
                        <ul className="space-y-2">
                            <li>Help Center</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                            <li>Insurance</li>
                        </ul>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-3">CONTACT</h4>
                    <p>1234 Luxury Drive</p>
                    <p>San Francisco, CA 94107</p>
                    <p>+1 234 567 890</p>
                    <p>info@example.com</p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t py-4 text-center text-xs sm:flex sm:justify-between sm:px-4 sm:text-left">
                <p className="text-gray-500">&copy; 2025 Brand. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2 sm:mt-0 text-gray-500">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
