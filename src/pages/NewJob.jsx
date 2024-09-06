import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CustomerSearch from '../components/CustomerSearch';
import { saveJobToExcel, getDeviceProblems } from '../utils/dataUtils';
import SignatureCanvas from 'react-signature-canvas';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const NewJob = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [jobData, setJobData] = useState({
    customerName: '',
    phoneNumber: '',
    emailAddress: '',
    deviceType: '',
    selectedProblem: '',
    deviceConditions: {
      Charging: false,
      Battery: false,
      Screen: false,
      Audio: false,
      WiFi: false,
      Camera: false
    },
    devicePhoto: null,
    advancePayment: ''
  });

  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [signature, setSignature] = useState(null);
  const fileInputRef = useRef(null);
  const signatureRef = useRef(null);

  const mutation = useMutation({
    mutationFn: saveJobToExcel,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
      queryClient.invalidateQueries(['jobs']);
      navigate('/');
    },
  });

  const handleInputChange = (field, value) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => handleInputChange('devicePhoto', e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSignatureDialog(true);
  };

  const handleSignatureEnd = () => {
    if (signatureRef.current) {
      setSignature(signatureRef.current.toDataURL());
    }
  };

  const handleConfirmJob = () => {
    setShowSignatureDialog(false);
    mutation.mutate({ ...jobData, signature });
  };

  const toggleDeviceCondition = (condition) => {
    setJobData(prev => ({
      ...prev,
      deviceConditions: {
        ...prev.deviceConditions,
        [condition]: !prev.deviceConditions[condition]
      }
    }));
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CustomerSearch onSelect={(customer) => {
        setJobData(prev => ({
          ...prev,
          customerName: customer.customerName,
          phoneNumber: customer.phone,
          emailAddress: customer.email
        }));
      }} />
      <Input
        placeholder="Customer Name"
        value={jobData.customerName}
        onChange={(e) => handleInputChange('customerName', e.target.value)}
        required
      />
      <Input
        placeholder="Phone Number"
        value={jobData.phoneNumber}
        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
        required
      />
      <Input
        placeholder="Email Address"
        value={jobData.emailAddress}
        onChange={(e) => handleInputChange('emailAddress', e.target.value)}
        required
      />
      <Select
        value={jobData.deviceType}
        onValueChange={(value) => handleInputChange('deviceType', value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select device type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="phone">Phone</SelectItem>
          <SelectItem value="laptop">Laptop</SelectItem>
          <SelectItem value="tablet">Tablet</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={jobData.selectedProblem}
        onValueChange={(value) => handleInputChange('selectedProblem', value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select problem" />
        </SelectTrigger>
        <SelectContent>
          {getDeviceProblems().map((problem) => (
            <SelectItem key={problem} value={problem}>{problem}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <Label>Device Condition</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {Object.entries(jobData.deviceConditions).map(([item, condition]) => (
            <Button
              key={item}
              type="button"
              variant={condition ? 'default' : 'outline'}
              onClick={() => toggleDeviceCondition(item)}
            >
              {item}: {condition ? 'Yes' : 'No'}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label>Device Photo</Label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <Button type="button" onClick={() => fileInputRef.current.click()}>
          <Camera className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
        {jobData.devicePhoto && (
          <img src={jobData.devicePhoto} alt="Device" className="mt-2 max-w-full h-auto" />
        )}
      </div>
      <Input
        placeholder="Advance Payment"
        type="number"
        value={jobData.advancePayment}
        onChange={(e) => handleInputChange('advancePayment', e.target.value)}
      />
      <Button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Creating...' : 'Create Job Sheet'}
      </Button>
    </form>
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Job</CardTitle>
          <Navigation />
        </CardHeader>
        <CardContent>
          {renderForm()}
        </CardContent>
      </Card>

      <Dialog open={showSignatureDialog} onOpenChange={setShowSignatureDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Signature</DialogTitle>
          </DialogHeader>
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{width: 500, height: 200, className: 'signature-canvas'}}
            onEnd={handleSignatureEnd}
          />
          <Button onClick={handleConfirmJob}>Confirm Job</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewJob;