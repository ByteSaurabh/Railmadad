import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ComplaintForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    pnrNumber: '',
    trainNumber: '',
    category: '',
    priority: 'medium',
    subject: '',
    description: '',
    location: '',
    coach: '',
    seat: '',
    language: 'english',
    contactMethod: 'email',
    isAnonymous: false,
    attachments: []
  });
  const [errors, setErrors] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const fileInputRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const categoryOptions = [
    { value: 'cleanliness', label: 'Cleanliness Issues', description: 'Dirty coaches, washrooms, platforms' },
    { value: 'food', label: 'Food Quality', description: 'Catering services, food safety' },
    { value: 'staff', label: 'Staff Behavior', description: 'Misconduct, unprofessional behavior' },
    { value: 'technical', label: 'Technical Issues', description: 'AC, lights, charging points' },
    { value: 'safety', label: 'Safety Concerns', description: 'Security, emergency situations' },
    { value: 'punctuality', label: 'Delays & Cancellations', description: 'Schedule disruptions' },
    { value: 'booking', label: 'Booking Issues', description: 'Reservation problems, refunds' },
    { value: 'accessibility', label: 'Accessibility', description: 'Facilities for disabled passengers' },
    { value: 'other', label: 'Other Issues', description: 'Any other concerns' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', description: 'Minor inconvenience' },
    { value: 'medium', label: 'Medium Priority', description: 'Moderate impact' },
    { value: 'high', label: 'High Priority', description: 'Significant disruption' },
    { value: 'urgent', label: 'Urgent', description: 'Safety or emergency concern' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'marathi', label: 'मराठी (Marathi)' },
    { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
    { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'malayalam', label: 'മലയാളം (Malayalam)' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

  const contactMethodOptions = [
    { value: 'email', label: 'Email Notifications' },
    { value: 'sms', label: 'SMS Updates' },
    { value: 'both', label: 'Email & SMS' },
    { value: 'none', label: 'No Notifications' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePNRLookup = () => {
    if (formData?.pnrNumber?.length === 10) {
      // Mock PNR lookup
      setFormData(prev => ({
        ...prev,
        trainNumber: '12345',
        location: 'New Delhi Railway Station',
        coach: 'S1',
        seat: '23'
      }));
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef?.current) {
      clearInterval(recordingIntervalRef?.current);
    }
    // Mock voice recording result
    setFormData(prev => ({
      ...prev,
      description: prev?.description + `\n[Voice Recording: ${recordingDuration}s - "The washroom in coach S1 is very dirty and the tap is not working properly."]`
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newAttachments = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      url: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (attachmentId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter(att => att?.id !== attachmentId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.category) newErrors.category = 'Please select a complaint category';
    if (!formData?.subject?.trim()) newErrors.subject = 'Subject is required';
    if (!formData?.description?.trim()) newErrors.description = 'Description is required';
    if (formData?.description?.trim()?.length < 20) newErrors.description = 'Description must be at least 20 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Language Selection */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <Select
          label="Preferred Language"
          description="Select your preferred language for communication"
          options={languageOptions}
          value={formData?.language}
          onChange={(value) => handleInputChange('language', value)}
          className="max-w-xs"
        />
      </div>
      {/* Journey Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Train" size={20} />
          <span>Journey Details</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              label="PNR Number"
              type="text"
              placeholder="Enter 10-digit PNR"
              value={formData?.pnrNumber}
              onChange={(e) => handleInputChange('pnrNumber', e?.target?.value)}
              maxLength={10}
              description="Auto-fills journey details"
            />
            {formData?.pnrNumber?.length === 10 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                iconName="Search"
                iconPosition="left"
                onClick={handlePNRLookup}
              >
                Lookup Journey
              </Button>
            )}
          </div>
          
          <Input
            label="Train Number"
            type="text"
            placeholder="e.g., 12345"
            value={formData?.trainNumber}
            onChange={(e) => handleInputChange('trainNumber', e?.target?.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Location/Station"
            type="text"
            placeholder="Current location"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
          />
          
          <Input
            label="Coach Number"
            type="text"
            placeholder="e.g., S1, B2"
            value={formData?.coach}
            onChange={(e) => handleInputChange('coach', e?.target?.value)}
          />
          
          <Input
            label="Seat/Berth"
            type="text"
            placeholder="e.g., 23, 45UB"
            value={formData?.seat}
            onChange={(e) => handleInputChange('seat', e?.target?.value)}
          />
        </div>
      </div>
      {/* Complaint Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} />
          <span>Complaint Details</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Complaint Category"
            description="Select the most relevant category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
            searchable
          />
          
          <Select
            label="Priority Level"
            description="How urgent is this issue?"
            options={priorityOptions}
            value={formData?.priority}
            onChange={(value) => handleInputChange('priority', value)}
          />
        </div>

        <Input
          label="Subject"
          type="text"
          placeholder="Brief summary of the issue"
          value={formData?.subject}
          onChange={(e) => handleInputChange('subject', e?.target?.value)}
          error={errors?.subject}
          required
          maxLength={100}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Description <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <textarea
              className="w-full min-h-32 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-y"
              placeholder="Describe the issue in detail..."
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              required
            />
            <div className="absolute bottom-2 right-2 flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">
                {formData?.description?.length}/1000
              </span>
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                iconName={isRecording ? "Square" : "Mic"}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? formatDuration(recordingDuration) : "Voice"}
              </Button>
            </div>
          </div>
          {errors?.description && (
            <p className="text-sm text-destructive">{errors?.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Minimum 20 characters. You can also use voice recording in your preferred language.
          </p>
        </div>
      </div>
      {/* Attachments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Paperclip" size={20} />
          <span>Attachments</span>
        </h3>
        
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Upload photos, videos, or documents related to your complaint
          </p>
          <Button
            type="button"
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={() => fileInputRef?.current?.click()}
          >
            Add Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Max 10MB per file. Supported: Images, Videos, PDF, Word documents
          </p>
        </div>

        {formData?.attachments?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Uploaded Files:</h4>
            <div className="space-y-2">
              {formData?.attachments?.map((attachment) => (
                <div key={attachment?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={attachment?.type?.startsWith('image/') ? 'Image' : 
                            attachment?.type?.startsWith('video/') ? 'Video' : 'File'} 
                      size={16} 
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{attachment?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(attachment?.size / 1024 / 1024)?.toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => removeAttachment(attachment?.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Contact Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Bell" size={20} />
          <span>Contact Preferences</span>
        </h3>
        
        <Select
          label="Notification Method"
          description="How would you like to receive updates?"
          options={contactMethodOptions}
          value={formData?.contactMethod}
          onChange={(value) => handleInputChange('contactMethod', value)}
        />

        <Checkbox
          label="Submit as Anonymous"
          description="Your identity will be kept confidential"
          checked={formData?.isAnonymous}
          onChange={(e) => handleInputChange('isAnonymous', e?.target?.checked)}
        />
      </div>
      {/* Submit Button */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="inline mr-1" />
          Your complaint will be blockchain-verified for transparency
        </div>
        
        <Button
          type="submit"
          variant="default"
          size="lg"
          iconName="Send"
          iconPosition="left"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
        </Button>
      </div>
    </form>
  );
};

export default ComplaintForm;