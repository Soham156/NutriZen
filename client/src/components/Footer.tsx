import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: "Features", href: "/#features" },
            { name: "Dashboard", href: "/dashboard" },
            { name: "Analytics", href: "/analytics" },
            { name: "Recipes", href: "/recipes" },
        ],
        company: [
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
            { name: "Careers", href: "#" },
            { name: "Blog", href: "#" },
        ],
        legal: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Cookie Policy", href: "#" },
            { name: "GDPR", href: "#" },
        ],
        support: [
            { name: "Help Center", href: "#" },
            { name: "Documentation", href: "#" },
            { name: "API Status", href: "#" },
            { name: "Community", href: "#" },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    return (
        <footer className="bg-card/50 backdrop-blur-xl border-t border-border/40 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 lg:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
                    {/* Brand Section */}
                    <div className="col-span-2 sm:col-span-2 lg:col-span-2 pb-4 sm:pb-0">
                        <Link to="/" className="inline-flex items-center gap-2 mb-3 md:mb-4">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-foreground" />
                            </div>
                            <span className="text-base sm:text-lg md:text-xl font-bold text-foreground">NutriZen</span>
                        </Link>
                        <p className="text-muted-foreground mb-3 sm:mb-4 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base max-w-md pr-4">
                            Your AI-powered nutrition companion for a healthier, happier life.
                        </p>
                        <div className="space-y-1.5 sm:space-y-2">
                            <a href="mailto:support@nutrizen.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit">
                                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="text-xs sm:text-xs md:text-sm break-all">support@nutrizen.com</span>
                            </a>
                            <a href="tel:+15551234567" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit">
                                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="text-xs sm:text-xs md:text-sm">+1 (555) 123-4567</span>
                            </a>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="text-xs sm:text-xs md:text-sm">San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Product</h3>
                        <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-[11px] sm:text-xs md:text-sm inline-block leading-tight"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Company</h3>
                        <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-[11px] sm:text-xs md:text-sm inline-block leading-tight"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Legal</h3>
                        <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-[11px] sm:text-xs md:text-sm inline-block leading-tight"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Support</h3>
                        <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-[11px] sm:text-xs md:text-sm inline-block leading-tight"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-4 sm:pt-6 md:pt-8 border-t border-border/40">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                        {/* Copyright */}
                        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground text-center sm:text-left order-2 sm:order-1">
                            © {currentYear} NutriZen. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 order-1 sm:order-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-muted-foreground hover:text-primary transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
