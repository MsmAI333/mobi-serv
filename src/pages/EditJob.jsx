import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from 'lucide-react';
import Navigation from '../components/Navigation';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details
    // This is a mock fetch, replace with actual API call
    const fetchJobDetails = async () => {
      // Simulating API call
      const mockJob = {
        id: id,
        customerName: 'John Doe',
        phoneNumber: '123-456-7890',
        emailAddress: 'john@example.com',
        deviceType: 'phone',
        problem: 'Broken Screen',
        deviceConditions: {
          Charging: 'Yes',
          Battery: 'No',
          Screen: 'No',
          Audio: 'Yes',
          WiFi: 'Yes',
          Camera: 'Yes'
        },
        devicePhoto: 'https://example.com/device-photo.jpg',
        advancePayment: 50
      };
      setJob(mockJob);
    };

    fetchJobDetails();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically update the job data
    console.log('Job updated', job);
    navigate('/all-jobs');
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Edit Job #{id}</CardTitle>
          <Navigation />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input 
                id="customerName" 
                value={job.customerName} 
                onChange={(e) => setJob({...job, customerName: e.target.value})} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                type="tel" 
                value={job.phoneNumber} 
                onChange={(e) => setJob({...job, phoneNumber: e.target.value})} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input 
                id="emailAddress" 
                type="email" 
                value={job.emailAddress} 
                onChange={(e) => setJob({...job, emailAddress: e.target.value})} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="deviceType">Device Type</Label>
              <Select 
                value={job.deviceType} 
                onValueChange={(value) => setJob({...job, deviceType: value})}
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
            <div>
              <Label htmlFor="problem">Problem</Label>
              <Input 
                id="problem" 
                value={job.problem} 
                onChange={(e) => setJob({...job, problem: e.target.value})} 
                required 
              />
            </div>
            <div>
              <Label>Device Condition</Label>
              {Object.entries(job.deviceConditions).map(([item, condition]) => (
                <div key={item} className="flex items-center space-x-2 mt-2">
                  <span>{item}</span>
                  <Select 
                    value={condition} 
                    onValueChange={(value) => setJob({
                      ...job, 
                      deviceConditions: {...job.deviceConditions, [item]: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            <div>
              <Label>Device Photo</Label>
              {job.devicePhoto && (
                <img src={job.devicePhoto} alt="Device" className="mt-2 max-w-full h-auto" />
              )}
              <Button type="button" className="mt-2">
                <Camera className="mr-2 h-4 w-4" />
                Update Photo
              </Button>
            </div>
            <div>
              <Label htmlFor="advancePayment">Advance Payment</Label>
              <Input 
                id="advancePayment" 
                type="number" 
                value={job.advancePayment} 
                onChange={(e) => setJob({...job, advancePayment: e.target.value})} 
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Update Job</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditJob;