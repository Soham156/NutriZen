import { Link, useLocation } from "react-router-dom";
import {
    Home,
    BarChart3,
    BookOpen,
    MessageSquare,
    Settings,
    LogOut,
    Leaf,
    Camera,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
    SidebarSeparator,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Recipes", href: "/recipes", icon: BookOpen },
    { name: "AI Chat", href: "/chat", icon: MessageSquare },
    { name: "Image Recognition", href: "/image-recognition", icon: Camera },
];

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const location = useLocation();
    const isMobile = useIsMobile();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <Navbar />
            <SidebarProvider defaultOpen={!isMobile}>
                <div className="flex w-full">
                    <Sidebar className="border-r border-border/40 bg-card/95 backdrop-blur-xl md:fixed md:top-16 md:bottom-0 md:left-0 z-20">
                        <SidebarHeader className="border-b border-border/40 p-4 md:hidden">
                            <Link to="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                                    <Leaf className="w-6 h-6 text-primary-foreground" />
                                </div>
                                <span className="text-xl font-bold text-foreground">NutriZen</span>
                            </Link>
                        </SidebarHeader>
                        <SidebarContent className="px-2 md:px-3 py-3 md:py-4">
                            <SidebarGroup>
                                <SidebarGroupLabel className="px-2 md:px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                    Navigation
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu className="space-y-3 md:space-y-1">
                                        {navigation.map((item) => {
                                            const isActive = location.pathname === item.href;
                                            return (
                                                <SidebarMenuItem key={item.name}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={isActive}
                                                        tooltip={item.name}
                                                        className={`
                                                            relative overflow-hidden transition-all duration-200 px-6 py-6 md:px-5 md:py-5
                                                            ${isActive
                                                                ? 'bg-gradient-to-r from-primary/90 to-accent/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30'
                                                                : 'hover:bg-gradient-to-r hover:from-muted hover:to-muted/50 hover:shadow-md'
                                                            }
                                                        `}
                                                    >
                                                        <Link to={item.href} className="flex items-center gap-3 md:gap-3">
                                                            <item.icon className="w-6 h-6 md:w-5 md:h-5 flex-shrink-0" />
                                                            <span className="font-medium text-base md:text-base">{item.name}</span>
                                                            {isActive && (
                                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-foreground/80 rounded-l-full" />
                                                            )}
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>

                            <SidebarSeparator className="my-3 md:my-4 bg-gradient-to-r from-transparent via-border to-transparent" />

                            <SidebarGroup>
                                <SidebarGroupLabel className="px-2 md:px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                    Settings
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu className="space-y-1 md:space-y-1">
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip="Settings"
                                                className="hover:bg-gradient-to-r hover:from-muted hover:to-muted/50 hover:shadow-md transition-all duration-200 px-4 py-3.5 md:px-4 md:py-3"
                                            >
                                                <Link to="/settings" className="flex items-center gap-3 md:gap-3">
                                                    <Settings className="w-6 h-6 md:w-5 md:h-5 flex-shrink-0" />
                                                    <span className="font-medium text-base md:text-base">Settings</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>

                        <SidebarFooter className="border-t border-border/40 p-3 md:p-3 bg-gradient-to-br from-muted/30 to-transparent">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start gap-3 md:gap-3 px-3 md:px-3 py-3 md:py-3 h-auto hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-200 rounded-xl group"
                                            >
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10 md:h-10 md:w-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200">
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback className="bg-gradient-hero text-primary-foreground font-semibold">DP</AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 md:w-3.5 md:h-3.5 bg-green-500 rounded-full border-2 border-card" />
                                                </div>
                                                <div className="flex-1 text-left text-sm md:text-sm group-data-[collapsible=icon]:hidden">
                                                    <div className="font-semibold text-foreground leading-tight">Dadu Patil</div>
                                                    <div className="text-xs md:text-xs text-muted-foreground leading-tight">dadupatil@gmail.com</div>
                                                </div>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-64 p-2">
                                            <div className="flex items-center gap-3 p-3 mb-2 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg">
                                                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback className="bg-gradient-hero text-primary-foreground font-semibold">DP</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-sm">Dadu Patil</div>
                                                    <div className="text-xs text-muted-foreground">dadu@nutrizen.com</div>
                                                </div>
                                            </div>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer rounded-lg py-2.5 focus:bg-primary/10">
                                                <Settings className="mr-3 h-4 w-4 text-primary" />
                                                <span className="font-medium">Settings</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer rounded-lg py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700">
                                                <LogOut className="mr-3 h-4 w-4" />
                                                <span className="font-medium">Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarFooter>
                    </Sidebar>

                    <SidebarInset className="w-full pt-16">
                        <div className="sticky top-16 z-10 flex h-14 shrink-0 items-center gap-4 border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 shadow-sm">
                            <SidebarTrigger className="-ml-1 hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-lg" />
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-0.5 bg-gradient-to-b from-primary to-accent rounded-full" />
                                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    );
}
