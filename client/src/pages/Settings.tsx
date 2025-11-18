import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
    User,
    Mail,
    Calendar,
    Ruler,
    Weight,
    Activity,
    Heart,
    AlertTriangle,
    Target,
    Droplets,
    Utensils,
    Flame,
    Edit,
    Loader2,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://nutri-zen-server.vercel.app/api';
interface UserData {
    id: string;
    email: string;
    full_name: string;
    created_at: string;
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    height_unit?: string;
    weight_unit?: string;
    bmi?: number;
}

interface HealthProfile {
    user: UserData;
    preferences: {
        primary_goal?: string;
        activity_level?: string;
        daily_calorie_goal?: number;
        daily_water_goal?: number;
        meals_per_day?: number;
        dietary_restrictions?: string[];
        allergens?: string[];
    };
    healthConditions: string[];
    allergens: string[];
    dietaryRestrictions: string[];
}

export default function Settings() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<HealthProfile | null>(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('accessToken') || localStorage.getItem('token');

            const response = await fetch(`${API_URL}/user/health-profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch profile');

            const data = await response.json();
            setProfileData(data);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to load user profile.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatGoal = (goal: string) => {
        const goalMap: { [key: string]: string } = {
            'lose-weight': '🎯 Lose Weight',
            'gain-weight': '💪 Gain Weight',
            'maintain': '⚖️ Maintain Weight',
            'build-muscle': '🏋️ Build Muscle',
            'improve-health': '❤️ Improve Overall Health',
            'manage-condition': '🩺 Manage Health Condition',
        };
        return goalMap[goal] || goal;
    };

    const formatActivityLevel = (level: string) => {
        const levelMap: { [key: string]: string } = {
            'sedentary': '🛋️ Sedentary',
            'light': '🚶 Lightly Active',
            'moderate': '🏃 Moderately Active',
            'very': '💪 Very Active',
            'extra': '🏋️ Extra Active',
        };
        return levelMap[level] || level;
    };

    const getBMICategory = (bmi?: number) => {
        if (!bmi) return null;
        if (bmi < 18.5) return { category: 'Underweight', color: 'bg-blue-500' };
        if (bmi < 25) return { category: 'Normal', color: 'bg-green-500' };
        if (bmi < 30) return { category: 'Overweight', color: 'bg-yellow-500' };
        return { category: 'Obese', color: 'bg-red-500' };
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Settings</h1>
                        <p className="text-muted-foreground">Manage your account and preferences</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <Skeleton className="h-6 w-32" />
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-5/6" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (!profileData) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                    <AlertTriangle className="w-16 h-16 text-muted-foreground" />
                    <h2 className="text-2xl font-semibold">No Profile Data</h2>
                    <p className="text-muted-foreground">Complete your health profile to see your information.</p>
                    <Button onClick={() => navigate('/health-profile')}>
                        Complete Profile
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    const { user, preferences, healthConditions, allergens, dietaryRestrictions } = profileData;
    const bmiInfo = getBMICategory(user.bmi);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Settings</h1>
                        <p className="text-muted-foreground">Manage your account and health preferences</p>
                    </div>
                    <Button onClick={() => navigate('/health-profile')} variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Account Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Account Information
                            </CardTitle>
                            <CardDescription>Your basic account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-3">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Full Name</p>
                                    <p className="font-medium">{user.full_name || 'Not set'}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Member Since</p>
                                    <p className="font-medium">{formatDate(user.created_at)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" />
                                Personal Information
                            </CardTitle>
                            <CardDescription>Your physical characteristics</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Age</p>
                                    <p className="font-medium">{user.age ? `${user.age} years` : 'Not set'}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-3">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Gender</p>
                                    <p className="font-medium capitalize">{user.gender || 'Not set'}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Height</p>
                                        <p className="font-medium">
                                            {user.height ? `${user.height} ${user.height_unit}` : 'Not set'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Weight className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Weight</p>
                                        <p className="font-medium">
                                            {user.weight ? `${user.weight} ${user.weight_unit}` : 'Not set'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {user.bmi && bmiInfo && (
                                <>
                                    <Separator />
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-4 h-4 text-muted-foreground" />
                                        <div className="flex-1">
                                            <p className="text-sm text-muted-foreground">BMI</p>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{user.bmi.toFixed(1)}</p>
                                                <Badge className={bmiInfo.color}>{bmiInfo.category}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Health Conditions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-primary" />
                                Health Conditions
                            </CardTitle>
                            <CardDescription>Medical conditions and concerns</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {healthConditions.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {healthConditions.map((condition) => (
                                        <Badge key={condition} variant="outline" className="border-red-500 text-red-700 dark:text-red-400">
                                            {condition}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No health conditions reported</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Allergies */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-primary" />
                                Food Allergies
                            </CardTitle>
                            <CardDescription>Your food allergies and intolerances</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {allergens.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {allergens.map((allergen) => (
                                        <Badge key={allergen} variant="destructive">
                                            {allergen}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No allergies reported</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Dietary Preferences */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Utensils className="w-5 h-5 text-primary" />
                                Dietary Preferences
                            </CardTitle>
                            <CardDescription>Your dietary restrictions and preferences</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {dietaryRestrictions.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {dietaryRestrictions.map((diet) => (
                                        <Badge key={diet} variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400">
                                            {diet}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No dietary preferences set</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Goals & Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary" />
                                Health Goals
                            </CardTitle>
                            <CardDescription>Your fitness and wellness objectives</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Primary Goal</p>
                                <Badge variant="outline" className="text-base">
                                    {preferences.primary_goal ? formatGoal(preferences.primary_goal) : 'Not set'}
                                </Badge>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Activity Level</p>
                                <Badge variant="outline" className="text-base">
                                    {preferences.activity_level ? formatActivityLevel(preferences.activity_level) : 'Not set'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daily Targets */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Flame className="w-5 h-5 text-primary" />
                                Daily Targets
                            </CardTitle>
                            <CardDescription>Your daily nutrition and lifestyle goals</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-4 p-4 border rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                                        <Flame className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Calorie Goal</p>
                                        <p className="text-2xl font-bold">
                                            {preferences.daily_calorie_goal || 2000}
                                            <span className="text-sm font-normal text-muted-foreground ml-1">kcal</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 border rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <Droplets className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Water Goal</p>
                                        <p className="text-2xl font-bold">
                                            {preferences.daily_water_goal || 2500}
                                            <span className="text-sm font-normal text-muted-foreground ml-1">ml</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 border rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                        <Utensils className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Meals Per Day</p>
                                        <p className="text-2xl font-bold">
                                            {preferences.meals_per_day || 3}
                                            <span className="text-sm font-normal text-muted-foreground ml-1">meals</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
