import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import CustomerSearch from '../components/CustomerSearch';

const fetchCustomers = async () => {
  // TODO: Replace this with actual API call to fetch data from Excel
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 'CUST001', name: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
    { id: 'CUST002', name: 'Jane Smith', phone: '234-567-8901', email: 'jane@example.com' },
  ];
};

const submitJob = async (jobData) => {
  // TODO: Replace this with actual API call to store data in Excel
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Job submitted:', jobData);
  return { success: true, id: 'JOB001' };
};

const ConditionButton = ({ item, condition, setCondition }) => (
  <div className="flex flex-col space-y-2">
    <span className="text-sm font-medium">{item}</span>
    <div className="flex space-x-2">
      <Button
        type="button"
        variant={condition === 'Yes' ? 'default' : 'outline'}
        onClick={() => setCondition('Yes')}
        className="w-16"
      >
        Yes
      </Button>
      <Button
        type="button"
        variant={condition === 'No' ? 'default' : 'outline'}
        onClick={() => setCondition('No')}
        className="w-16"
      >
        No
      </Button>
    </div>
  </div>
);

const NewJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    customerName: '',
    phoneNumber: '',
    emailAddress: '',
    deviceType: '',
    selectedProblem: '',
    deviceConditions: {
      Charging: '',
      Battery: '',
      Screen: '',
      Audio: '',
      WiFi: '',
      Camera: ''
    },
    devicePhoto: null,
    advancePayment: ''
  });

  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers
  });

  const mutation = useMutation({
    mutationFn: submitJob,
    onSuccess: (data) => {
      console.log('Job created successfully:', data);
      navigate('/');
    },
  });

  const [existingCustomer, setExistingCustomer] = useState(null);
  const fileInputRef = useRef(null);

  const commonProblems = {
    phone: ['Broken Screen', 'Battery Issues', 'Charging Problems', 'Software Glitches'],
    laptop: ['Won\'t Power On', 'Blue Screen of Death', 'Slow Performance', 'Overheating']
  };

  const handleInputChange = (field, value) => {
    setJobData(prev => ({ ...prev, [field]: value }));
    if (field === 'customerName' || field === 'phoneNumber' || field === 'emailAddress') {
      const found = customers?.find(c => 
        c.name.toLowerCase() === value.toLowerCase() ||
        c.phone === value ||
        c.email.toLowerCase() === value.toLowerCase()
      );
      if (found) {
        setExistingCustomer(found);
        setJobData(prev => ({
          ...prev,
          customerName: found.name,
          phoneNumber: found.phone,
          emailAddress: found.email
        }));
      } else {
        setExistingCustomer(null);
      }
    }
  };

  const handleConditionChange = (item, value) => {
    setJobData(prev => ({
      ...prev,
      deviceConditions: { ...prev.deviceConditions, [item]: value }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => handleInputChange('devicePhoto', e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(jobData);
  };

  if (customersLoading) return <div>Loading...</div>;

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
              setExistingCustomer(customer);
              setJobData(prev => ({
                ...prev,
                customerName: customer.name,
                phoneNumber: customer.phone,
                emailAddress: customer.email
              }));
            }} />
            {existingCustomer && (
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                <p className="font-bold">Existing Customer Found</p>
                <p>Customer ID: {existingCustomer.id}</p>
              </div>
            )}
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
                type="tel" 
                value={jobData.phoneNumber} 
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input 
                id="emailAddress" 
                type="email" 
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
                </SelectContent>
              </Select>
            </div>
            {jobData.deviceType && (
              <div>
                <Label htmlFor="problem">Common Problems</Label>
                <Select 
                  value={jobData.selectedProblem} 
                  onValueChange={(value) => handleInputChange('selectedProblem', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select problem" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonProblems[jobData.deviceType].map((problem, index) => (
                      <SelectItem key={index} value={problem}>{problem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Device Condition Checklist</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {Object.keys(jobData.deviceConditions).map((item) => (
                  <ConditionButton
                    key={item}
                    item={item}
                    condition={jobData.deviceConditions[item]}
                    setCondition={(value) => handleConditionChange(item, value)}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label>Device Photo</Label>
              <div className="flex items-center space-x-4 mt-2">
                <Button type="button" onClick={() => fileInputRef.current.click()}>
                  Upload Photo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {jobData.devicePhoto && (
                <div className="mt-4">
                  <img src={jobData.devicePhoto} alt="Device" className="max-w-full h-auto" />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="advancePayment">Advance Payment (Optional)</Label>
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
    </div>
  );
};

export default NewJob;