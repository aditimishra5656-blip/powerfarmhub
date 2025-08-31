import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calculator, IndianRupee } from "lucide-react";

export const EMICalculator = ({ triggerText = "Calculate EMI", variant = "default" as any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(5);

  // EMI calculation formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    if (monthlyRate === 0) {
      return principal / months;
    }
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    return emi;
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - loanAmount;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={variant === "default" ? "bg-white text-powertrac-blue hover:bg-gray-100" : ""}>
          <Calculator className="w-4 h-4 mr-2" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-powertrac-blue flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            EMI Calculator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Loan Amount */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Loan Amount</Label>
            <div className="space-y-2">
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                max={2000000}
                min={100000}
                step={10000}
                className="w-full"
              />
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="text-right"
                />
              </div>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Interest Rate (% per annum)</Label>
            <div className="space-y-2">
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                max={15}
                min={7}
                step={0.1}
                className="w-full"
              />
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                step="0.1"
                className="text-right"
              />
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Loan Tenure (Years)</Label>
            <div className="space-y-2">
              <Slider
                value={[tenure]}
                onValueChange={(value) => setTenure(value[0])}
                max={7}
                min={1}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="text-right"
              />
            </div>
          </div>

          {/* Results */}
          <Card className="bg-gradient-to-r from-powertrac-blue/5 to-powertrac-green/5 border-powertrac-blue/20">
            <CardHeader>
              <CardTitle className="text-lg text-powertrac-blue">EMI Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly EMI:</span>
                <span className="text-lg font-bold text-powertrac-blue flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  {emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Interest:</span>
                <span className="text-powertrac-orange font-semibold flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  {totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="text-powertrac-green font-semibold flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  {totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button 
              onClick={() => setIsOpen(false)} 
              variant="outline" 
              className="flex-1"
            >
              Close
            </Button>
            <Button 
              className="flex-1 bg-powertrac-orange hover:bg-powertrac-orange/90"
              onClick={() => {
                // You can add logic here to pre-fill a loan application form
                alert('EMI calculated! Contact us to proceed with your loan application.');
              }}
            >
              Apply for Loan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};