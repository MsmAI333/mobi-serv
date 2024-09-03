import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewJob = () => {
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState('');

  const commonProblems = {
    phone: [
      'Broken Screen', 'Battery Issues', 'Charging Problems', 'Software Glitches',
      'Camera Malfunction', 'Audio Issues', 'Water Damage', 'Overheating',
      'Slow Performance', 'Network Connectivity Issues'
    ],
    laptop: [
      'Won\'t Power On', 'Blue Screen of Death', 'Slow Performance', 'Overheating',
      'Battery Not Charging', 'Keyboard Issues', 'Trackpad Problems', 'Display Issues',
      'Audio Malfunction', 'Wi-Fi Connectivity Problems'
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the job data
    console.log('Job submitted');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input id="customerName" placeholder="Enter customer name" required />
            </div>
            <div>
              <Label htmlFor="deviceType">Device Type</Label>
              <Select onValueChange={setDeviceType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {deviceType && (
              <div>
                <Label htmlFor="problem">Common Problems</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select problem" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonProblems[deviceType].map((problem, index) => (
                      <SelectItem key={index} value={problem}>{problem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Device Condition Checklist</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {['Charging', 'Battery', 'Screen', 'Audio', 'Wi-Fi', 'Camera'].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} />
                    <label htmlFor={item} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Create Job Sheet</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewJob;