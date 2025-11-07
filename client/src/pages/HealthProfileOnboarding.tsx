import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
    User,
    Heart,
    AlertTriangle,
    Target,
    Activity,
    ChevronRight,
    ChevronLeft,
    Check,
    Leaf,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface HealthProfileData {
    // Step 1: Basic Info
    age: string;
    gender: string;
    height: string;
    weight: string;
    heightUnit: 'cm' | 'ft';
    weightUnit: 'kg' | 'lbs';

    // Step 2: Health Conditions
    healthConditions: string[];
    bloodPressure: string;
    cholesterolLevel: string;
    diabetesType: string;

    // Step 3: Allergies & Dietary
    allergens: string[];
    dietaryRestrictions: string[];
    dietPreference: string;

    // Step 4: Goals & Lifestyle
    primaryGoal: string;
    activityLevel: string;
    caloriesGoal: string;
    waterGoal: string;
    mealsPerDay: string;
}

export default function HealthProfileOnboarding() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const [profileData, setProfileData] = useState<HealthProfileData>({
        age: '',
        gender: '',
        height: '',
        weight: '',
        heightUnit: 'cm',
        weightUnit: 'kg',
        healthConditions: [],
        bloodPressure: 'normal',
        cholesterolLevel: 'normal',
        diabetesType: 'none',
        allergens: [],
        dietaryRestrictions: [],
        dietPreference: '',
        primaryGoal: '',
        activityLevel: '',
        caloriesGoal: '2000',
        waterGoal: '2500',
        mealsPerDay: '3',
    });

    const healthConditionsList = [
        { id: 'high-bp', name: 'High Blood Pressure', icon: '🩺' },
        { id: 'cholesterol', name: 'High Cholesterol', icon: '💊' },
        { id: 'diabetes', name: 'Diabetes', icon: '💉' },
        { id: 'heart-disease', name: 'Heart Disease', icon: '❤️' },
        { id: 'kidney-disease', name: 'Kidney Disease', icon: '🫘' },
        { id: 'thyroid', name: 'Thyroid Issues', icon: '🦋' },
        { id: 'celiac', name: 'Celiac Disease', icon: '🌾' },
        { id: 'ibs', name: 'IBS', icon: '🔄' },
    ];

    const allergensList = [
        { id: 'peanuts', name: 'Peanuts', icon: '🥜' },
        { id: 'tree-nuts', name: 'Tree Nuts', icon: '🌰' },
        { id: 'shellfish', name: 'Shellfish', icon: '🦐' },
        { id: 'fish', name: 'Fish', icon: '🐟' },
        { id: 'eggs', name: 'Eggs', icon: '🥚' },
        { id: 'dairy', name: 'Dairy', icon: '🥛' },
        { id: 'soy', name: 'Soy', icon: '🫘' },
        { id: 'wheat', name: 'Wheat/Gluten', icon: '🌾' },
        { id: 'sesame', name: 'Sesame', icon: '🫙' },
    ];

    const dietaryRestrictionsList = [
        { id: 'vegan', name: 'Vegan', icon: '🌱', desc: 'No animal products' },
        { id: 'vegetarian', name: 'Vegetarian', icon: '🥗', desc: 'No meat/fish' },
        { id: 'pescatarian', name: 'Pescatarian', icon: '🐟', desc: 'Vegetarian + fish' },
        { id: 'keto', name: 'Keto', icon: '🥓', desc: 'Low-carb, high-fat' },
        { id: 'paleo', name: 'Paleo', icon: '🍖', desc: 'Whole foods only' },
        { id: 'mediterranean', name: 'Mediterranean', icon: '🫒', desc: 'Med-style diet' },
        { id: 'halal', name: 'Halal', icon: '☪️', desc: 'Islamic dietary law' },
        { id: 'kosher', name: 'Kosher', icon: '✡️', desc: 'Jewish dietary law' },
    ];

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('accessToken') || localStorage.getItem('token');

            // Save health profile
            const response = await fetch(`${API_URL}/user/health-profile`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (!response.ok) throw new Error('Failed to save profile');

            toast({
                title: 'Profile Complete! 🎉',
                description: 'Your health profile has been saved successfully.',
            });

            navigate('/dashboard');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to save health profile. Please try again.',
            });
        }
    };

    const toggleArrayItem = (array: string[], item: string) => {
        return array.includes(item)
            ? array.filter((i) => i !== item)
            : [...array, item];
    };

    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                            <Leaf className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold">NutriZen</h1>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Complete Your Health Profile</h2>
                    <p className="text-muted-foreground">
                        Help us personalize your nutrition journey
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                            Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Steps Indicator */}
                <div className="flex justify-between mb-8">
                    {[
                        { icon: User, label: 'Basic Info' },
                        { icon: Heart, label: 'Health' },
                        { icon: AlertTriangle, label: 'Allergies' },
                        { icon: Target, label: 'Goals' },
                    ].map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center ${index + 1 === currentStep
                                ? 'text-primary'
                                : index + 1 < currentStep
                                    ? 'text-green-500'
                                    : 'text-muted-foreground'
                                }`}
                        >
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${index + 1 === currentStep
                                    ? 'bg-primary text-primary-foreground scale-110'
                                    : index + 1 < currentStep
                                        ? 'bg-green-500 text-white'
                                        : 'bg-muted'
                                    }`}
                            >
                                {index + 1 < currentStep ? (
                                    <Check className="w-6 h-6" />
                                ) : (
                                    <step.icon className="w-6 h-6" />
                                )}
                            </div>
                            <span className="text-xs font-medium hidden md:block">{step.label}</span>
                        </div>
                    ))}
                </div>

                {/* Form Content */}
                <Card className="shadow-medium border-border/50 animate-fade-in-up">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {currentStep === 1 && (
                                <>
                                    <User className="w-5 h-5 text-primary" />
                                    Basic Information
                                </>
                            )}
                            {currentStep === 2 && (
                                <>
                                    <Heart className="w-5 h-5 text-primary" />
                                    Health Conditions
                                </>
                            )}
                            {currentStep === 3 && (
                                <>
                                    <AlertTriangle className="w-5 h-5 text-primary" />
                                    Allergies & Dietary Preferences
                                </>
                            )}
                            {currentStep === 4 && (
                                <>
                                    <Target className="w-5 h-5 text-primary" />
                                    Goals & Lifestyle
                                </>
                            )}
                        </CardTitle>
                        <CardDescription>
                            {currentStep === 1 && 'Tell us about yourself'}
                            {currentStep === 2 && 'Help us understand your health needs'}
                            {currentStep === 3 && 'Select any allergies and dietary preferences'}
                            {currentStep === 4 && 'Set your wellness goals'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Step 1: Basic Info */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Age</Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            placeholder="25"
                                            value={profileData.age}
                                            onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <Select
                                            value={profileData.gender}
                                            onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                                        >
                                            <SelectTrigger id="gender">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="height">Height</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="height"
                                                type="number"
                                                placeholder="170"
                                                value={profileData.height}
                                                onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                                                className="flex-1"
                                            />
                                            <Select
                                                value={profileData.heightUnit}
                                                onValueChange={(value: 'cm' | 'ft') =>
                                                    setProfileData({ ...profileData, heightUnit: value })
                                                }
                                            >
                                                <SelectTrigger className="w-20">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cm">cm</SelectItem>
                                                    <SelectItem value="ft">ft</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="weight">Weight</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="weight"
                                                type="number"
                                                placeholder="70"
                                                value={profileData.weight}
                                                onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                                                className="flex-1"
                                            />
                                            <Select
                                                value={profileData.weightUnit}
                                                onValueChange={(value: 'kg' | 'lbs') =>
                                                    setProfileData({ ...profileData, weightUnit: value })
                                                }
                                            >
                                                <SelectTrigger className="w-20">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="kg">kg</SelectItem>
                                                    <SelectItem value="lbs">lbs</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {profileData.height && profileData.weight && (
                                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Activity className="w-5 h-5 text-primary" />
                                            <span className="font-semibold">Your BMI</span>
                                        </div>
                                        <p className="text-2xl font-bold text-primary">
                                            {(() => {
                                                const h = parseFloat(profileData.height);
                                                const w = parseFloat(profileData.weight);
                                                if (!h || !w) return '-';
                                                const heightInMeters =
                                                    profileData.heightUnit === 'cm' ? h / 100 : h * 0.3048;
                                                const weightInKg = profileData.weightUnit === 'kg' ? w : w * 0.453592;
                                                const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
                                                return bmi;
                                            })()}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {(() => {
                                                const h = parseFloat(profileData.height);
                                                const w = parseFloat(profileData.weight);
                                                if (!h || !w) return '';
                                                const heightInMeters =
                                                    profileData.heightUnit === 'cm' ? h / 100 : h * 0.3048;
                                                const weightInKg = profileData.weightUnit === 'kg' ? w : w * 0.453592;
                                                const bmi = weightInKg / (heightInMeters * heightInMeters);
                                                if (bmi < 18.5) return 'Underweight';
                                                if (bmi < 25) return 'Normal weight';
                                                if (bmi < 30) return 'Overweight';
                                                return 'Obese';
                                            })()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Health Conditions */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <Label className="mb-3 block">Do you have any of these conditions?</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {healthConditionsList.map((condition) => (
                                            <button
                                                key={condition.id}
                                                onClick={() =>
                                                    setProfileData({
                                                        ...profileData,
                                                        healthConditions: toggleArrayItem(
                                                            profileData.healthConditions,
                                                            condition.id
                                                        ),
                                                    })
                                                }
                                                className={`p-4 rounded-xl border-2 transition-all text-left ${profileData.healthConditions.includes(condition.id)
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                <div className="text-2xl mb-2">{condition.icon}</div>
                                                <div className="text-sm font-medium">{condition.name}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Blood Pressure</Label>
                                        <RadioGroup
                                            value={profileData.bloodPressure}
                                            onValueChange={(value) =>
                                                setProfileData({ ...profileData, bloodPressure: value })
                                            }
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="low" id="bp-low" />
                                                <Label htmlFor="bp-low" className="font-normal">Low</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="normal" id="bp-normal" />
                                                <Label htmlFor="bp-normal" className="font-normal">Normal</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="high" id="bp-high" />
                                                <Label htmlFor="bp-high" className="font-normal">High</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Cholesterol</Label>
                                        <RadioGroup
                                            value={profileData.cholesterolLevel}
                                            onValueChange={(value) =>
                                                setProfileData({ ...profileData, cholesterolLevel: value })
                                            }
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="low" id="chol-low" />
                                                <Label htmlFor="chol-low" className="font-normal">Low</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="normal" id="chol-normal" />
                                                <Label htmlFor="chol-normal" className="font-normal">Normal</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="high" id="chol-high" />
                                                <Label htmlFor="chol-high" className="font-normal">High</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Diabetes</Label>
                                        <RadioGroup
                                            value={profileData.diabetesType}
                                            onValueChange={(value) =>
                                                setProfileData({ ...profileData, diabetesType: value })
                                            }
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="none" id="diab-none" />
                                                <Label htmlFor="diab-none" className="font-normal">None</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="type1" id="diab-type1" />
                                                <Label htmlFor="diab-type1" className="font-normal">Type 1</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="type2" id="diab-type2" />
                                                <Label htmlFor="diab-type2" className="font-normal">Type 2</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Allergies & Dietary */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <Label className="mb-3 block">Food Allergies (Select all that apply)</Label>
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                        {allergensList.map((allergen) => (
                                            <button
                                                key={allergen.id}
                                                onClick={() =>
                                                    setProfileData({
                                                        ...profileData,
                                                        allergens: toggleArrayItem(profileData.allergens, allergen.id),
                                                    })
                                                }
                                                className={`p-3 rounded-xl border-2 transition-all ${profileData.allergens.includes(allergen.id)
                                                    ? 'border-red-500 bg-red-500/10'
                                                    : 'border-border hover:border-red-500/50'
                                                    }`}
                                            >
                                                <div className="text-2xl mb-1">{allergen.icon}</div>
                                                <div className="text-xs font-medium">{allergen.name}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <Label className="mb-3 block">Dietary Preferences</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {dietaryRestrictionsList.map((diet) => (
                                            <button
                                                key={diet.id}
                                                onClick={() =>
                                                    setProfileData({
                                                        ...profileData,
                                                        dietaryRestrictions: toggleArrayItem(
                                                            profileData.dietaryRestrictions,
                                                            diet.id
                                                        ),
                                                    })
                                                }
                                                className={`p-4 rounded-xl border-2 transition-all text-left ${profileData.dietaryRestrictions.includes(diet.id)
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="text-2xl">{diet.icon}</div>
                                                    <div>
                                                        <div className="font-semibold">{diet.name}</div>
                                                        <div className="text-xs text-muted-foreground">{diet.desc}</div>
                                                    </div>
                                                    {profileData.dietaryRestrictions.includes(diet.id) && (
                                                        <Check className="w-5 h-5 text-primary ml-auto" />
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Goals & Lifestyle */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="primaryGoal">Primary Health Goal</Label>
                                    <Select
                                        value={profileData.primaryGoal}
                                        onValueChange={(value) => setProfileData({ ...profileData, primaryGoal: value })}
                                    >
                                        <SelectTrigger id="primaryGoal">
                                            <SelectValue placeholder="Select your main goal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="lose-weight">🎯 Lose Weight</SelectItem>
                                            <SelectItem value="gain-weight">💪 Gain Weight</SelectItem>
                                            <SelectItem value="maintain">⚖️ Maintain Weight</SelectItem>
                                            <SelectItem value="build-muscle">🏋️ Build Muscle</SelectItem>
                                            <SelectItem value="improve-health">❤️ Improve Overall Health</SelectItem>
                                            <SelectItem value="manage-condition">🩺 Manage Health Condition</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="activityLevel">Activity Level</Label>
                                    <Select
                                        value={profileData.activityLevel}
                                        onValueChange={(value) =>
                                            setProfileData({ ...profileData, activityLevel: value })
                                        }
                                    >
                                        <SelectTrigger id="activityLevel">
                                            <SelectValue placeholder="Select your activity level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sedentary">🛋️ Sedentary (Little or no exercise)</SelectItem>
                                            <SelectItem value="light">🚶 Lightly Active (1-3 days/week)</SelectItem>
                                            <SelectItem value="moderate">🏃 Moderately Active (3-5 days/week)</SelectItem>
                                            <SelectItem value="very">💪 Very Active (6-7 days/week)</SelectItem>
                                            <SelectItem value="extra">🏋️ Extra Active (Physical job + training)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="caloriesGoal">Daily Calorie Goal</Label>
                                        <Input
                                            id="caloriesGoal"
                                            type="number"
                                            placeholder="2000"
                                            value={profileData.caloriesGoal}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, caloriesGoal: e.target.value })
                                            }
                                        />
                                        <p className="text-xs text-muted-foreground">Recommended: 1800-2500 cal</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="waterGoal">Daily Water Goal (ml)</Label>
                                        <Input
                                            id="waterGoal"
                                            type="number"
                                            placeholder="2500"
                                            value={profileData.waterGoal}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, waterGoal: e.target.value })
                                            }
                                        />
                                        <p className="text-xs text-muted-foreground">Recommended: 2000-3000 ml</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mealsPerDay">Meals Per Day</Label>
                                        <Select
                                            value={profileData.mealsPerDay}
                                            onValueChange={(value) =>
                                                setProfileData({ ...profileData, mealsPerDay: value })
                                            }
                                        >
                                            <SelectTrigger id="mealsPerDay">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2">2 meals</SelectItem>
                                                <SelectItem value="3">3 meals</SelectItem>
                                                <SelectItem value="4">4 meals</SelectItem>
                                                <SelectItem value="5">5 meals</SelectItem>
                                                <SelectItem value="6">6 meals</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Check className="w-5 h-5 text-green-500" />
                                        <span className="font-semibold text-green-700 dark:text-green-400">
                                            You're almost done!
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Click "Complete Profile" to start your personalized nutrition journey.
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 animate-fade-in">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="min-w-[120px]"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button onClick={handleNext} className="min-w-[120px]">
                        {currentStep === totalSteps ? (
                            <>
                                Complete Profile
                                <Check className="w-4 h-4 ml-2" />
                            </>
                        ) : (
                            <>
                                Next
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </div>

                {/* Skip Option */}
                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
}
