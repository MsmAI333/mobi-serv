import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CustomerSearch from '../components/CustomerSearch';
import { saveJobToExcel, generateJobPDF, sendWhatsAppMessage } from '../utils/dataUtils';
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

  const [existingCustomer, setExistingCustomer] = useState(null);
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [signature, setSignature] = useState(null);
  const fileInputRef = useRef(null);
  const signatureRef = useRef(null);

  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomersFromExcel
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const savedJob = await saveJobToExcel(data);
      const pdfBlob = await generateJobPDF(savedJob, signature);
      await sendWhatsAppMessage(savedJob.phoneNumber, pdfBlob);
      return savedJob;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['customers']);
      queryClient.invalidateQueries(['jobs']);
      navigate('/');
    },
  });

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
            {/* ... (rest of the form fields) ... */}
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