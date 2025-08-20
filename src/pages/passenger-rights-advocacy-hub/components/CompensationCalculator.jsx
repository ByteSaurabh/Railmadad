import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CompensationCalculator = () => {
  const [calculatorData, setCalculatorData] = useState({
    issueType: '',
    ticketClass: '',
    journeyDistance: '',
    delayHours: '',
    ticketPrice: '',
    incidentDate: ''
  });
  
  const [calculationResult, setCalculationResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const issueTypes = [
    { value: 'delay', label: 'Train Delay' },
    { value: 'cancellation', label: 'Train Cancellation' },
    { value: 'food_quality', label: 'Food Quality Issue' },
    { value: 'berth_issue', label: 'Berth Allocation Problem' },
    { value: 'ac_failure', label: 'AC/Electrical Failure' },
    { value: 'cleanliness', label: 'Cleanliness Issues' }
  ];

  const ticketClasses = [
    { value: '1A', label: 'First AC (1A)' },
    { value: '2A', label: 'Second AC (2A)' },
    { value: '3A', label: 'Third AC (3A)' },
    { value: 'CC', label: 'Chair Car (CC)' },
    { value: 'SL', label: 'Sleeper (SL)' },
    { value: '2S', label: 'Second Sitting (2S)' }
  ];

  const handleInputChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateCompensation = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      let baseCompensation = 0;
      const ticketPrice = parseFloat(calculatorData?.ticketPrice) || 0;
      const delayHours = parseFloat(calculatorData?.delayHours) || 0;
      
      // Compensation logic based on issue type
      switch (calculatorData?.issueType) {
        case 'delay':
          if (delayHours >= 3) {
            baseCompensation = Math.min(ticketPrice * 0.25, 500);
          }
          if (delayHours >= 6) {
            baseCompensation = Math.min(ticketPrice * 0.50, 1000);
          }
          break;
        case 'cancellation':
          baseCompensation = ticketPrice; // Full refund
          break;
        case 'food_quality':
          baseCompensation = Math.min(ticketPrice * 0.15, 300);
          break;
        case 'berth_issue':
          baseCompensation = Math.min(ticketPrice * 0.20, 400);
          break;
        case 'ac_failure':
          baseCompensation = Math.min(ticketPrice * 0.30, 600);
          break;
        case 'cleanliness':
          baseCompensation = Math.min(ticketPrice * 0.10, 200);
          break;
        default:
          baseCompensation = 0;
      }

      // Class-based multiplier
      const classMultipliers = {
        '1A': 1.5,
        '2A': 1.3,
        '3A': 1.2,
        'CC': 1.1,
        'SL': 1.0,
        '2S': 0.9
      };

      const finalCompensation = Math.round(baseCompensation * (classMultipliers?.[calculatorData?.ticketClass] || 1));

      setCalculationResult({
        eligibleAmount: finalCompensation,
        processingTime: '7-14 days',
        documentRequired: getRequiredDocuments(calculatorData?.issueType),
        nextSteps: getNextSteps(calculatorData?.issueType)
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  const getRequiredDocuments = (issueType) => {
    const commonDocs = ['Original ticket', 'ID proof', 'Journey details'];
    const specificDocs = {
      delay: ['Delay certificate from station master'],
      cancellation: ['Cancellation notice'],
      food_quality: ['Photos of food item', 'Medical certificate if applicable'],
      berth_issue: ['Berth allocation slip'],
      ac_failure: ['Complaint receipt from TTE'],
      cleanliness: ['Photos of unclean areas']
    };
    
    return [...commonDocs, ...(specificDocs?.[issueType] || [])];
  };

  const getNextSteps = (issueType) => {
    return [
      'File complaint through RailMadad portal',
      'Submit required documentation',
      'Track complaint status regularly',
      'Follow up if no response within 30 days',
      'Escalate to consumer court if needed'
    ];
  };

  const isFormValid = () => {
    return calculatorData?.issueType && 
           calculatorData?.ticketClass && 
           calculatorData?.ticketPrice &&
           calculatorData?.incidentDate;
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <Icon name="Calculator" size={24} color="white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Compensation Calculator
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your eligible compensation for railway service issues and delays
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-card rounded-xl border border-border p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Enter Journey Details
            </h3>
            
            <div className="space-y-6">
              <Select
                label="Type of Issue"
                placeholder="Select the issue you faced"
                options={issueTypes}
                value={calculatorData?.issueType}
                onChange={(value) => handleInputChange('issueType', value)}
                required
              />

              <Select
                label="Ticket Class"
                placeholder="Select your ticket class"
                options={ticketClasses}
                value={calculatorData?.ticketClass}
                onChange={(value) => handleInputChange('ticketClass', value)}
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Ticket Price (₹)"
                  type="number"
                  placeholder="Enter ticket amount"
                  value={calculatorData?.ticketPrice}
                  onChange={(e) => handleInputChange('ticketPrice', e?.target?.value)}
                  required
                />

                <Input
                  label="Journey Distance (km)"
                  type="number"
                  placeholder="Enter distance"
                  value={calculatorData?.journeyDistance}
                  onChange={(e) => handleInputChange('journeyDistance', e?.target?.value)}
                />
              </div>

              {calculatorData?.issueType === 'delay' && (
                <Input
                  label="Delay Duration (hours)"
                  type="number"
                  placeholder="Enter delay in hours"
                  value={calculatorData?.delayHours}
                  onChange={(e) => handleInputChange('delayHours', e?.target?.value)}
                  required
                />
              )}

              <Input
                label="Incident Date"
                type="date"
                value={calculatorData?.incidentDate}
                onChange={(e) => handleInputChange('incidentDate', e?.target?.value)}
                required
              />

              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={isCalculating}
                disabled={!isFormValid()}
                onClick={calculateCompensation}
                iconName="Calculator"
                iconPosition="left"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Compensation'}
              </Button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {calculationResult ? (
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} color="white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Compensation Estimate
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="text-center p-6 bg-success/10 rounded-lg border border-success/20">
                    <div className="text-3xl font-bold text-success mb-2">
                      ₹{calculationResult?.eligibleAmount?.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Estimated Compensation Amount
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="font-medium text-foreground">Processing Time</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {calculationResult?.processingTime}
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="FileText" size={16} className="text-primary" />
                        <span className="font-medium text-foreground">Success Rate</span>
                      </div>
                      <div className="text-sm text-success font-medium">
                        85% approval rate
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Required Documents:</h4>
                    <ul className="space-y-2">
                      {calculationResult?.documentRequired?.map((doc, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={14} className="text-success" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Next Steps:</h4>
                    <ol className="space-y-2">
                      {calculationResult?.nextSteps?.map((step, index) => (
                        <li key={index} className="flex items-start space-x-3 text-sm text-muted-foreground">
                          <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    <Button
                      variant="primary"
                      iconName="FileText"
                      iconPosition="left"
                      className="flex-1"
                    >
                      File Complaint Now
                    </Button>
                    
                    <Button
                      variant="outline"
                      iconName="Download"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calculator" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-muted-foreground">
                  Fill in your journey details to get an accurate compensation estimate
                </p>
              </div>
            )}

            {/* Quick Tips */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Lightbulb" size={16} className="text-warning" />
                <span>Quick Tips</span>
              </h4>
              
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                  <span>File complaints within 30 days of incident for faster processing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                  <span>Keep all original documents and receipts safe</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                  <span>Take photos/videos as evidence when possible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                  <span>Follow up regularly on complaint status</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompensationCalculator;