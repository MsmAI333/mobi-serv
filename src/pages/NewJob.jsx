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
      Charging: 'No',
      Battery: 'No',
      Screen: 'No',
      Audio: 'No',
      WiFi: 'No',
      Camera: 'No'
    },
    devicePhoto: null,
    advancePayment: ''
  });

  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [signature, setSignature] = useState(null);
  const fileInputRef = useRef(null);
  const signatureRef = useRef(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const savedJob = await saveJobToExcel(data);
      return savedJob;
    },
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
        [condition]: prev.deviceConditions[condition] === 'Yes' ? 'No' : 'Yes'
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Job</CardTitle>
          <Navigation />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <CustomerSearch onSelect={(customer) => {
              setJobData(prev => ({
                ...prev,
                customerName: customer.name,
                phoneNumber: customer.phone,
                emailAddress: customer.email
              }));
            }} />
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={jobData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={jobData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                value={jobData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="deviceType">Device Type</Label>
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
            </div>
            <div>
              <Label htmlFor="selectedProblem">Problem</Label>
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
            </div>
            <div>
              <Label>Device Condition</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(jobData.deviceConditions).map(([item, condition]) => (
                  <Button
                    key={item}
                    type="button"
                    variant={condition === 'Yes' ? 'default' : 'outline'}
                    onClick={() => toggleDeviceCondition(item)}
                  >
                    {item}: {condition}
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
                Upload Photo
              </Button>
              {jobData.devicePhoto && (
                <img src={jobData.devicePhoto} alt="Device" className="mt-2 max-w-full h-auto" />
              )}
            </div>
            <div>
              <Label htmlFor="advancePayment">Advance Payment</Label>
              <Input
                id="advancePayment"
                type="number"
                value={jobData.advancePayment}
                onChange={(e) => handleInputChange('advancePayment', e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? 'Creating...' : 'Create Job Sheet'}
              </Button>
            </div>
          </form>
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