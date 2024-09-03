import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from 'lucide-react';

const NewJob = () => {
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState('');
  const [devicePhoto, setDevicePhoto] = useState(null);
  const fileInputRef = useRef(null);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setDevicePhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setAvailableCameras(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error('Error accessing cameras:', error);
    }
  };

  const capturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedCamera } });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      
      setDevicePhoto(canvas.toDataURL('image/jpeg'));
      
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
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
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="tel" placeholder="Enter phone number" required />
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input id="emailAddress" type="email" placeholder="Enter email address" required />
            </div>
            <div>
              <Label htmlFor="advancePayment">Advance Payment (Optional)</Label>
              <Input id="advancePayment" type="number" placeholder="Enter advance payment amount" />
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
            <div>
              <Label>Device Photo</Label>
              <div className="flex items-center space-x-4 mt-2">
                <Button type="button" onClick={() => fileInputRef.current.click()}>
                  Upload Photo
                </Button>
                <Button type="button" onClick={handleCameraClick}>
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {availableCameras.length > 0 && (
                <div className="mt-4">
                  <Label htmlFor="cameraSelect">Select Camera</Label>
                  <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select camera" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCameras.map((camera) => (
                        <SelectItem key={camera.deviceId} value={camera.deviceId}>
                          {camera.label || `Camera ${camera.deviceId}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={capturePhoto} className="mt-2">
                    Capture Photo
                  </Button>
                </div>
              )}
              {devicePhoto && (
                <div className="mt-4">
                  <img src={devicePhoto} alt="Device" className="max-w-full h-auto" />
                </div>
              )}
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