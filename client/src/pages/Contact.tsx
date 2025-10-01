import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            details: "support@nutrizen.com",
            subtext: "We'll respond within 24 hours",
            link: "mailto:support@nutrizen.com",
        },
        {
            icon: Phone,
            title: "Call Us",
            details: "+1 (555) 123-4567",
            subtext: "Mon-Fri, 9AM-6PM EST",
            link: "tel:+15551234567",
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: "123 Health Street, Suite 400",
            subtext: "San Francisco, CA 94102",
            link: "https://maps.google.com",
        },
    ];

    const socialLinks = [
        { icon: Twitter, label: "Twitter", link: "#", color: "hover:text-[#1DA1F2]" },
        { icon: Facebook, label: "Facebook", link: "#", color: "hover:text-[#4267B2]" },
        { icon: Instagram, label: "Instagram", link: "#", color: "hover:text-[#E4405F]" },
        { icon: Linkedin, label: "LinkedIn", link: "#", color: "hover:text-[#0077B5]" },
    ];

    const faqs = [
        {
            question: "What is NutriZen?",
            answer: "NutriZen is an AI-powered nutrition tracking platform that helps you understand your eating habits and achieve your wellness goals.",
        },
        {
            question: "How does the AI work?",
            answer: "Our AI analyzes your food intake, identifies patterns, and provides personalized recommendations based on your unique needs and goals.",
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely! We use industry-standard encryption and never share your personal data with third parties.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <Navbar />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="container mx-auto px-4 md:px-6 mb-16 animate-fade-in">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-hero mb-6 animate-fade-in-up">
                            <MessageSquare className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-highlight bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                            Get In Touch
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className="container mx-auto px-4 md:px-6 mb-16">
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target={info.link.startsWith("http") ? "_blank" : undefined}
                                rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="block animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card className="shadow-medium border-border/50 bg-gradient-card h-full group hover:shadow-large transition-all duration-300 hover:scale-105">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                            <info.icon className="w-7 h-7 text-primary" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                                        <p className="text-foreground font-medium mb-1">{info.details}</p>
                                        <p className="text-sm text-muted-foreground">{info.subtext}</p>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Main Content */}
                <section className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <Card className="shadow-large border-border/50 bg-gradient-card animate-fade-in">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and our team will get back to you shortly.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Your Name *</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    required
                                                    className="bg-background/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                    className="bg-background/50"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject *</Label>
                                            <Input
                                                id="subject"
                                                placeholder="How can we help you?"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                required
                                                className="bg-background/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us more about your question or feedback..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                required
                                                rows={6}
                                                className="bg-background/50 resize-none"
                                            />
                                        </div>
                                        <Button type="submit" size="lg" className="w-full bg-gradient-hero text-primary-foreground group">
                                            <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Office Hours */}
                            <Card className="shadow-medium border-border/50 bg-gradient-card animate-fade-in" style={{ animationDelay: "100ms" }}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-primary" />
                                        Office Hours
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Monday - Friday</span>
                                        <span className="font-semibold">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Saturday</span>
                                        <span className="font-semibold">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Sunday</span>
                                        <span className="font-semibold text-muted-foreground">Closed</span>
                                    </div>
                                    <div className="pt-3 border-t border-border/50">
                                        <p className="text-sm text-muted-foreground">
                                            Eastern Standard Time (EST)
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <Card className="shadow-medium border-border/50 bg-gradient-card animate-fade-in" style={{ animationDelay: "200ms" }}>
                                <CardHeader>
                                    <CardTitle>Quick Answers</CardTitle>
                                    <CardDescription>Frequently asked questions</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="space-y-2">
                                            <h4 className="font-semibold text-sm">{faq.question}</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                                            {index < faqs.length - 1 && <div className="border-t border-border/30 pt-4" />}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Social Links */}
                            <Card className="shadow-medium border-border/50 bg-gradient-card animate-fade-in" style={{ animationDelay: "300ms" }}>
                                <CardHeader>
                                    <CardTitle>Connect With Us</CardTitle>
                                    <CardDescription>Follow us on social media</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-3">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                                                aria-label={social.label}
                                            >
                                                <social.icon className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;