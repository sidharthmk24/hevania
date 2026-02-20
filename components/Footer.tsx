import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-dark-forest text-cream py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="font-serif text-2xl tracking-widest mb-6">MUKUND EVENTS</h3>
                    <p className="text-gray-400 font-light leading-relaxed max-w-sm">
                        Curating unforgettable experiences in nature's finest settings.
                        Where your celebrations find their perfect home.
                    </p>
                </div>

                <div>
                    <h4 className="font-serif text-lg tracking-wider mb-6 text-muted-gold">Navigation</h4>
                    <ul className="space-y-4">
                        <li><Link href="/about" className="hover:text-muted-gold transition-colors">About Us</Link></li>
                        <li><Link href="/blog" className="hover:text-muted-gold transition-colors">Event Journal</Link></li>
                        <li><Link href="/#properties" className="hover:text-muted-gold transition-colors">Venues</Link></li>
                        <li><Link href="/contact" className="hover:text-muted-gold transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-lg tracking-wider mb-6 text-muted-gold">Contact</h4>
                    <div className="space-y-4 font-light text-gray-400">
                        <p>123 Luxury Lane, Prestige District</p>
                        <p>Mumbai, MH 400001</p>
                        <p>+91 98765 43210</p>
                        <p>inquiry@mukundrealty.com</p>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-16 pt-8 text-center text-sm text-gray-500 font-light">
                © {new Date().getFullYear()} Mukund Realty. All rights reserved.
            </div>
        </footer>
    );
}
