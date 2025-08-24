"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Phone, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onLoginSuccess: () => void;
}

export function AuthModal({ isOpen, onOpenChange, onLoginSuccess }: AuthModalProps) {
    const [activeTab, setActiveTab] = useState("phone");
    const [phoneStep, setPhoneStep] = useState<'number' | 'otp'>('number');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const handleDemoLogin = () => {
        // In a real app, this would be the result of a successful Firebase auth flow.
        onLoginSuccess();
    };

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login or Sign Up</DialogTitle>
                    <DialogDescription>
                        You need to be logged in to add items to your cart.
                    </DialogDescription>
                </DialogHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="phone">Phone</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                        <TabsTrigger value="google">Google</TabsTrigger>
                    </TabsList>

                    <TabsContent value="phone">
                        {phoneStep === 'number' ? (
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-background px-3 text-muted-foreground">+91</span>
                                        <Input id="phone" type="tel" placeholder="9876543210" className="rounded-l-none" />
                                    </div>
                                </div>
                                <Button onClick={() => setPhoneStep('otp')} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                    Send OTP
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4 py-4 text-center">
                                <DialogDescription>Enter the 6-digit OTP sent to your number.</DialogDescription>
                                <div className="flex justify-center gap-2">
                                    {otp.map((digit, index) => (
                                        <Input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="tel"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            className="w-10 h-12 text-center text-lg"
                                        />
                                    ))}
                                </div>
                                <Button onClick={handleDemoLogin} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                    Verify OTP
                                </Button>
                                <Button variant="link" size="sm" onClick={() => {}}>Resend OTP (in 30s)</Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="email">
                        <div className="space-y-4 py-4">
                            <div className="flex justify-center">
                                <button onClick={() => setIsSigningUp(false)} className={cn("px-4 py-2 text-sm", !isSigningUp ? "font-bold border-b-2 border-primary" : "text-muted-foreground")}>Sign In</button>
                                <button onClick={() => setIsSigningUp(true)} className={cn("px-4 py-2 text-sm", isSigningUp ? "font-bold border-b-2 border-primary" : "text-muted-foreground")}>Sign Up</button>
                            </div>

                            {isSigningUp && (
                                <div className="space-y-2">
                                    <Label htmlFor="name-signup">Name</Label>
                                    <Input id="name-signup" type="text" placeholder="John Doe" />
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email-login">Email</Label>
                                <Input id="email-login" type="email" placeholder="m@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password-login">Password</Label>
                                <Input id="password-login" type="password" />
                            </div>
                            {isSigningUp && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password-signup">Confirm Password</Label>
                                        <Input id="confirm-password-signup" type="password" />
                                    </div>
                                    <div className="text-xs text-muted-foreground space-y-1">
                                        <p className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500"/> At least 8 characters</p>
                                        <p className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500"/> Mix of letters and numbers</p>
                                    </div>
                                </>
                            )}
                            <Button onClick={handleDemoLogin} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                {isSigningUp ? 'Create Account' : 'Login'}
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="google">
                        <div className="py-12 flex flex-col items-center justify-center">
                            <Button onClick={handleDemoLogin} variant="outline" size="lg" className="w-full">
                                <ChromeIcon className="mr-2 h-5 w-5" /> Continue with Google
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="21.17" x2="12" y1="8" y2="8" />
            <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
            <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
        </svg>
    );
}