
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { AnimatedElement } from '@/components/AnimatedElement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EyeIcon, EyeOffIcon, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'jobseeker' | 'employer'>('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate signup process
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, any signup is successful
      toast({
        title: "Success",
        description: "Your account has been created successfully!",
      });
      
      // Redirect to jobs page after successful signup
      navigate('/jobs');
    }, 1500);
  };
  
  // Check password strength
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    let label = '';
    if (strength <= 1) label = 'Weak';
    else if (strength <= 2) label = 'Fair';
    else if (strength <= 3) label = 'Good';
    else label = 'Strong';
    
    return { strength, label };
  };
  
  const passwordStrength = getPasswordStrength();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 flex items-center justify-center p-4">
        <AnimatedElement>
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
              <CardDescription className="text-center">
                Join JobLinker to find your dream job or hire top talent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Account Type Selection */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Button
                    type="button"
                    variant={accountType === 'jobseeker' ? 'default' : 'outline'}
                    className={accountType === 'jobseeker' ? 'bg-brand-red hover:bg-brand-red/90' : ''}
                    onClick={() => setAccountType('jobseeker')}
                  >
                    Job Seeker
                  </Button>
                  <Button
                    type="button"
                    variant={accountType === 'employer' ? 'default' : 'outline'}
                    className={accountType === 'employer' ? 'bg-brand-red hover:bg-brand-red/90' : ''}
                    onClick={() => setAccountType('employer')}
                  >
                    Employer
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Create a strong password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password strength indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm">Password strength: <span className={
                          passwordStrength.label === 'Weak' ? 'text-red-500' :
                          passwordStrength.label === 'Fair' ? 'text-orange-500' :
                          passwordStrength.label === 'Good' ? 'text-yellow-500' :
                          'text-green-500'
                        }>{passwordStrength.label}</span></div>
                      </div>
                      <div className="w-full h-1 bg-muted overflow-hidden rounded-full">
                        <div className={`h-full ${
                          passwordStrength.label === 'Weak' ? 'bg-red-500' :
                          passwordStrength.label === 'Fair' ? 'bg-orange-500' :
                          passwordStrength.label === 'Good' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`} style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className={`w-3 h-3 rounded-full mr-1 ${password.length >= 8 ? 'bg-green-500' : 'bg-muted'}`}></div>
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className={`w-3 h-3 rounded-full mr-1 ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-muted'}`}></div>
                      <span>One uppercase letter</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className={`w-3 h-3 rounded-full mr-1 ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-muted'}`}></div>
                      <span>One number</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className={`w-3 h-3 rounded-full mr-1 ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-muted'}`}></div>
                      <span>One special character</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {password && confirmPassword && (
                    password === confirmPassword ? (
                      <div className="text-xs text-green-500 flex items-center mt-1">
                        <Check className="h-3 w-3 mr-1" />
                        Passwords match
                      </div>
                    ) : (
                      <div className="text-xs text-red-500 flex items-center mt-1">
                        Passwords do not match
                      </div>
                    )
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-red hover:bg-brand-red/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
  
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-red hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </AnimatedElement>
      </main>
      
      <footer className="bg-brand-charcoal dark:bg-brand-purple text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">© {new Date().getFullYear()} JobLinker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
