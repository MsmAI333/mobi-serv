import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";

const EXCEL_FILE_PATH = '/path/to/your/excel/file.xlsx';

export const fetchCustomersFromExcel = async () => {
  // Simulating Excel file reading
  return [
    { id: 'CUST001', name: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
    { id: 'CUST002', name: 'Jane Smith', phone: '234-567-8901', email: 'jane@example.com' },
    { id: 'CUST003', name: 'Bob Johnson', phone: '345-678-9012', email: 'bob@example.com' },
  ];
};

export const saveJobToExcel = async (jobData) => {
  // Simulating saving to Excel
  const newJob = {
    id: `JOB${Math.floor(Math.random() * 1000)}`,
    ...jobData,
    date: new Date().toISOString(),
  };
  console.log('Job saved:', newJob);
  return newJob;
};

export const fetchCustomerJobs = async (customerId) => {
  // Simulating fetching customer jobs
  return [
    { id: 'JOB001', customerId, device: 'iPhone', status: 'Completed', date: '2023-03-15' },
    { id: 'JOB002', customerId, device: 'MacBook', status: 'In Progress', date: '2023-03-20' },
  ];
};

export const generateJobPDF = async (jobData, signature) => {
  const doc = new jsPDF();
  
  doc.text(`Job Sheet - ${jobData.id}`, 10, 10);
  doc.text(`Customer: ${jobData.customerName}`, 10, 20);
  doc.text(`Device: ${jobData.deviceType}`, 10, 30);
  doc.text(`Problem: ${jobData.selectedProblem}`, 10, 40);
  
  if (signature) {
    doc.addImage(signature, 'PNG', 10, 50, 50, 25);
  }
  
  return doc.output('blob');
};

export const sendWhatsAppMessage = async (phoneNumber, pdfBlob) => {
  // Simulating WhatsApp message sending
  console.log(`Sending WhatsApp message to ${phoneNumber}`);
  console.log('PDF Blob:', pdfBlob);
  return 'MESSAGE_SID_12345';
};

export const fetchRevenueData = async () => {
  // Simulating API call with dummy data
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    productRevenue: [
      { name: 'iPhone Repair', revenue: 5000 },
      { name: 'Samsung Repair', revenue: 4500 },
      { name: 'iPad Repair', revenue: 3000 },
      { name: 'MacBook Repair', revenue: 6000 },
      { name: 'Other Repairs', revenue: 2500 },
    ],
    dailyRevenue: [
      { date: '2023-03-01', revenue: 1000 },
      { date: '2023-03-02', revenue: 1200 },
      { date: '2023-03-03', revenue: 900 },
      { date: '2023-03-04', revenue: 1500 },
      { date: '2023-03-05', revenue: 1100 },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 15000 },
      { month: 'Feb', revenue: 18000 },
      { month: 'Mar', revenue: 22000 },
      { month: 'Apr', revenue: 20000 },
      { month: 'May', revenue: 25000 },
    ],
    highestPayments: [
      { date: '2023-03-04', amount: 1500 },
      { date: '2023-03-02', amount: 1200 },
      { date: '2023-03-05', amount: 1100 },
      { date: '2023-03-01', amount: 1000 },
      { date: '2023-03-03', amount: 900 },
    ],
  };
};