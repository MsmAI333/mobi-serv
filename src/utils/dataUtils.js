import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';

const EXCEL_FILE_PATH = '/data/customer_data.xlsx';

let customerData = [];

const readExcelFile = () => {
  try {
    const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return [];
  }
};

const writeExcelFile = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
};

const initializeData = () => {
  customerData = readExcelFile();
  if (customerData.length === 0) {
    for (let i = 1; i <= 10; i++) {
      const customerId = uuidv4();
      for (let j = 1; j <= 2; j++) {
        customerData.push({
          id: uuidv4(),
          customerId: customerId,
          customerName: `Customer ${i}`,
          email: `customer${i}@example.com`,
          phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          device: ['iPhone', 'Samsung', 'Google Pixel', 'OnePlus'][Math.floor(Math.random() * 4)],
          problem: ['Screen Repair', 'Battery Replacement', 'Water Damage', 'Software Issue'][Math.floor(Math.random() * 4)],
          status: ['Pending', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)],
          date: new Date().toISOString(),
          serialNumber: `JOB-${i}-${j}`,
          photoUrl: `https://example.com/job${i}_${j}_photo.jpg`,
          pdfUrl: `https://example.com/job${i}_${j}_report.pdf`
        });
      }
    }
    writeExcelFile(customerData);
  }
};

export const fetchCustomersFromExcel = async () => {
  initializeData();
  return customerData;
};

export const addCustomerData = async (newCustomer) => {
  const customerWithId = { 
    ...newCustomer, 
    id: uuidv4(), 
    customerId: newCustomer.customerId || uuidv4(),
    date: new Date().toISOString(),
    serialNumber: `JOB-${customerData.length + 1}`
  };
  customerData.push(customerWithId);
  writeExcelFile(customerData);
  return customerData;
};

export const editCustomerData = async (customerId, updatedData) => {
  customerData = customerData.map(customer => 
    customer.id === customerId ? { ...customer, ...updatedData, date: new Date().toISOString() } : customer
  );
  writeExcelFile(customerData);
  return customerData;
};

export const deleteCustomerData = async (customerId) => {
  customerData = customerData.filter(customer => customer.id !== customerId);
  writeExcelFile(customerData);
  return customerData;
};

export const saveJobToExcel = async (jobData) => {
  const newJob = {
    id: uuidv4(),
    ...jobData,
    date: new Date().toISOString(),
    serialNumber: `JOB-${customerData.length + 1}`
  };
  await addCustomerData(newJob);
  return newJob;
};

export const fetchCustomerJobs = async (customerId) => {
  initializeData();
  return customerData.filter(job => job.customerId === customerId);
};

export const generateJobPDF = async (jobData, signature) => {
  console.log('Generating PDF for job:', jobData);
  console.log('With signature:', signature);
  return new Blob(['Simulated PDF content'], { type: 'application/pdf' });
};

export const sendWhatsAppMessage = async (phoneNumber, pdfBlob) => {
  console.log(`Simulating sending WhatsApp message to ${phoneNumber}`);
  console.log('PDF Blob:', pdfBlob);
  return 'MESSAGE_SID_12345';
};

export const fetchRevenueData = async () => {
  initializeData();
  const productRevenue = {};
  const dailyRevenue = {};
  const monthlyRevenue = {};

  customerData.forEach(job => {
    productRevenue[job.device] = (productRevenue[job.device] || 0) + 100;
    const jobDate = new Date(job.date).toISOString().split('T')[0];
    dailyRevenue[jobDate] = (dailyRevenue[jobDate] || 0) + 100;
    const month = jobDate.substring(0, 7);
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + 100;
  });

  return {
    productRevenue: Object.entries(productRevenue).map(([name, revenue]) => ({ name, revenue })),
    dailyRevenue: Object.entries(dailyRevenue).map(([date, revenue]) => ({ date, revenue })),
    monthlyRevenue: Object.entries(monthlyRevenue).map(([month, revenue]) => ({ month, revenue })),
    highestPayments: customerData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(job => ({
      date: new Date(job.date).toISOString().split('T')[0],
      amount: 100
    }))
  };
};

initializeData();