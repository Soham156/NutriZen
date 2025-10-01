import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Heart, Users, Target, Sparkles, Award, TrendingUp, Shield } from "lucide-react";

const About = () => {
    const values = [
        {
            icon: Heart,
            title: "Wellness First",
            description: "Your health and happiness are at the core of everything we do. We believe in holistic nutrition that nurtures both body and mind.",
        },
        {
            icon: Sparkles,
            title: "AI-Powered Insights",
            description: "Leverage cutting-edge artificial intelligence to understand your unique nutritional needs and eating patterns.",
        },
        {
            icon: Users,
            title: "Community Driven",
            description: "Join a supportive community of health-conscious individuals on their wellness journey.",
        },
        {
            icon: Shield,
            title: "Privacy Protected",
            description: "Your data is yours. We prioritize security and transparency in everything we do.",
        },
    ];

    const stats = [
        { value: "50K+", label: "Active Users" },
        { value: "1M+", label: "Meals Tracked" },
        { value: "95%", label: "Success Rate" },
        { value: "4.9★", label: "User Rating" },
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: "https://github.com/shadcn.png",
            bio: "Nutritionist with 10+ years experience",
        },
        {
            name: "Dr. Michael Chen",
            role: "Chief AI Officer",
            image: "https://github.com/shadcn.png",
            bio: "PhD in Machine Learning & Health Tech",
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Design",
            image: "https://github.com/shadcn.png",
            bio: "Award-winning UX designer",
        },
        {
            name: "David Kim",
            role: "Lead Developer",
            image: "https://github.com/shadcn.png",
            bio: "Full-stack expert, health tech enthusiast",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <Navbar />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="container mx-auto px-4 md:px-6 mb-20 animate-fade-in">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-hero mb-6 animate-fade-in-up">
                            <Leaf className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-highlight bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                            About NutriZen
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                            We're on a mission to revolutionize personal nutrition through the power of artificial intelligence and mindful eating.
                            NutriZen combines cutting-edge technology with evidence-based nutrition science to help you achieve your wellness goals.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="container mx-auto px-4 md:px-6 mb-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <Card
                                key={index}
                                className="shadow-medium border-border/50 bg-gradient-card animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground font-medium">
                                        {stat.label}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Mission Section */}
                <section className="container mx-auto px-4 md:px-6 mb-20">
                    <div className="max-w-6xl mx-auto">
                        <Card className="shadow-large border-border/50 bg-gradient-card overflow-hidden animate-fade-in">
                            <CardContent className="p-8 md:p-12">
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                            <Target className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-semibold text-primary">Our Mission</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                            Making Healthy Eating Simple & Personalized
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            We believe that nutrition shouldn't be complicated. Traditional diet plans ignore your unique needs,
                                            preferences, and lifestyle. That's why we created NutriZen.
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Our AI-powered platform learns from your habits, understands your goals, and provides personalized
                                            recommendations that fit seamlessly into your life. No more one-size-fits-all approaches.
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-highlight/20 p-8 flex items-center justify-center">
                                            <div className="w-full h-full rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                                                <TrendingUp className="w-24 h-24 text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Values Section */}
                <section className="container mx-auto px-4 md:px-6 mb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                            <p className="text-muted-foreground text-lg">The principles that guide everything we do</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {values.map((value, index) => (
                                <Card
                                    key={index}
                                    className="shadow-medium border-border/50 bg-gradient-card group hover:shadow-large transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                                                <value.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
                            <p className="text-muted-foreground text-lg">Passionate experts dedicated to your wellness</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {team.map((member, index) => (
                                <Card
                                    key={index}
                                    className="shadow-medium border-border/50 bg-gradient-card group hover:shadow-large transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className="relative inline-block mb-4">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                                                <Award className="w-4 h-4 text-primary-foreground" />
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                                        <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;