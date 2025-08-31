import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, CreditCard, TrendingUp, Calculator, FileText, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMICalculator } from "@/components/EMICalculator";
import { QuoteForm } from "@/components/CTAForms";

const Finance = () => {
  const financeOptions = [
    {
      icon: CreditCard,
      title: "Bank Loan",
      description: "Partner with leading banks for competitive interest rates starting from 8.5% per annum.",
      features: ["Up to 85% financing", "5-7 years repayment", "Minimal documentation"]
    },
    {
      icon: TrendingUp,
      title: "NBFC Financing",
      description: "Quick approvals through our NBFC partners with flexible repayment options.",
      features: ["Same day approval", "Flexible EMI options", "Door-step service"]
    },
    {
      icon: Calculator,
      title: "Subsidy Schemes",
      description: "Get government subsidies and support under various agricultural schemes.",
      features: ["Government subsidy", "PM-KISAN benefits", "State scheme support"]
    }
  ];

  const financeProcess = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Submit required documents including identity, address, and income proof."
    },
    {
      icon: Calculator,
      title: "Loan Assessment",
      description: "Our experts assess your eligibility and suggest the best finance option."
    },
    {
      icon: CheckCircle,
      title: "Quick Approval",
      description: "Get instant approval with competitive interest rates and terms."
    },
    {
      icon: Clock,
      title: "Fast Disbursal",
      description: "Loan amount disbursed quickly for immediate tractor purchase."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Finance Hero Section */}
      <section className="py-20 bg-gradient-to-br from-powertrac-blue/5 to-powertrac-green/5">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-powertrac-green text-white">Finance Solutions</Badge>
          <h1 className="text-5xl font-bold text-powertrac-blue mb-6">
            Easy Finance Options for Your PowerTrac Tractor
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Don't let finances hold you back from owning your dream tractor. We offer multiple 
            financing options with competitive rates and quick approvals.
          </p>
          <Button className="bg-powertrac-orange hover:bg-powertrac-orange/90 text-white text-lg px-8 py-4">
            Apply for Finance Now
          </Button>
        </div>
      </section>

      {/* Finance Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Choose Your Finance Option
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We partner with leading financial institutions to offer you the best rates and terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financeOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-hover transition-all duration-300 border-0 bg-gradient-card">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-powertrac-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-powertrac-blue" />
                  </div>
                  <CardTitle className="text-xl text-powertrac-blue">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-powertrac-green" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Simple Finance Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your tractor financed in just 4 easy steps with minimal documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {financeProcess.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-hover transition-all duration-300 border-0 bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-powertrac-orange text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {index + 1}
                  </div>
                  <step.icon className="w-8 h-8 text-powertrac-blue mx-auto mb-3" />
                  <h3 className="font-semibold text-powertrac-blue mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="bg-gradient-to-r from-powertrac-blue to-powertrac-green text-white border-0 p-12">
            <CardContent>
              <h2 className="text-3xl font-bold mb-4">Ready to Finance Your Tractor?</h2>
              <p className="text-xl mb-8 opacity-90">
                Get pre-approved in minutes and drive home your PowerTrac tractor today!
              </p>
              <div className="flex gap-4 justify-center">
                <EMICalculator 
                  triggerText="Calculate EMI"
                  variant="default"
                />
                <QuoteForm 
                  triggerText="Get Finance Quote"
                  variant="outline"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Finance;