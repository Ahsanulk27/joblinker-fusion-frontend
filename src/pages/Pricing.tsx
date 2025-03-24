
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AnimatedElement } from '@/components/AnimatedElement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    description: 'Basic access for job seekers',
    features: [
      'Create a basic profile',
      'Apply to up to 5 jobs per month',
      'Basic job search and filtering',
      'Email notifications for new jobs',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 19,
    period: 'month',
    description: 'Advanced features for serious job seekers',
    features: [
      'Everything in Free plan',
      'Unlimited job applications',
      'Priority application status',
      'Skills assessments and certifications',
      'Resume review by AI',
      'See who viewed your profile',
    ],
    cta: 'Upgrade Now',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    period: 'month',
    description: 'Premium features for companies',
    features: [
      'Everything in Pro plan',
      'Post unlimited jobs',
      'Advanced candidate filtering',
      'Team collaboration tools',
      'Analytics dashboard',
      'Dedicated account manager',
      'API access',
    ],
    cta: 'Contact Sales',
    popular: false,
  }
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-red to-brand-tangerine py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <AnimatedElement>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Choose the plan that works for you. No hidden fees or commitments.
              </p>
            </AnimatedElement>
          </div>
        </section>
        
        {/* Pricing Toggle */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedElement>
              <div className="flex justify-center mb-12">
                <div className="flex items-center p-1 bg-muted rounded-lg">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      billingPeriod === 'monthly' 
                        ? 'bg-card shadow-sm' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${
                      billingPeriod === 'yearly' 
                        ? 'bg-card shadow-sm' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    Yearly
                    <Badge variant="outline" className="ml-2 bg-brand-red/10 text-brand-red border-0">
                      Save 20%
                    </Badge>
                  </button>
                </div>
              </div>
              
              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <Card 
                    key={index} 
                    className={`relative border ${plan.popular ? 'border-brand-red shadow-lg' : ''}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-brand-red">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <span className="text-4xl font-bold">
                          ${billingPeriod === 'yearly' && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-muted-foreground ml-2">
                            /{billingPeriod === 'yearly' ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-brand-red hover:bg-brand-red/90' : ''}`}
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <AnimatedElement>
              <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    question: 'Can I cancel my subscription at any time?',
                    answer: 'Yes, you can cancel your subscription at any time. If you cancel, you\'ll still have access to your plan until the end of your billing period.'
                  },
                  {
                    question: 'Is there a free trial available?',
                    answer: 'We offer a 14-day free trial of our Pro plan. No credit card required to start your trial.'
                  },
                  {
                    question: 'How do I upgrade or downgrade my plan?',
                    answer: 'You can upgrade or downgrade your plan at any time from your account settings. Changes will take effect immediately.'
                  },
                  {
                    question: 'Do you offer discounts for startups or non-profits?',
                    answer: 'Yes, we offer special pricing for eligible startups, non-profits, and educational institutions. Contact our sales team for more information.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <AnimatedElement>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to find your dream job?</h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands of job seekers who have found their perfect match with JobLinker.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-brand-red hover:bg-brand-red/90 h-12 px-8">
                    Get Started for Free
                  </Button>
                  <Button variant="outline" className="h-12 px-8">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </section>
      </main>
      
      <footer className="bg-brand-charcoal dark:bg-brand-purple text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">© {new Date().getFullYear()} JobLinker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
