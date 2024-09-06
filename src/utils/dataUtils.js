import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';

const EXCEL_FILE_PATH = '/data.xlsx';

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

export const generateReferenceNumber = (prefix) => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

export const fetchCustomersFromExcel = async () => {
  customerData = readExcelFile();
  if (customerData.length === 0) {
    customerData = generateTestData();
  }
  return customerData;
};

export const addCustomerData = async (newCustomer) => {
  customerData.push(newCustomer);
  writeExcelFile(customerData);
  return customerData;
};

export const editCustomerData = async (customerId, updatedData) => {
  customerData = customerData.map(customer => 
    customer.id === customerId ? { ...customer, ...updatedData } : customer
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
    jobNumber: generateReferenceNumber('MSJN')
  };
  await addCustomerData(newJob);
  return newJob;
};

export const fetchCustomerJobs = async (customerId) => {
  await fetchCustomersFromExcel();
  return customerData.filter(job => job.customerId === customerId);
};

export const fetchRevenueData = async () => {
  await fetchCustomersFromExcel();
  const productRevenue = {};
  const dailyRevenue = {};
  const monthlyRevenue = {};

  customerData.forEach(job => {
    const revenue = job.advancePayment || 100;
    productRevenue[job.device] = (productRevenue[job.device] || 0) + revenue;
    const jobDate = job.date.split('T')[0];
    dailyRevenue[jobDate] = (dailyRevenue[jobDate] || 0) + revenue;
    const month = jobDate.substring(0, 7);
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenue;
  });

  return {
    productRevenue: Object.entries(productRevenue).map(([name, revenue]) => ({ name, revenue })),
    dailyRevenue: Object.entries(dailyRevenue).map(([date, revenue]) => ({ date, revenue })),
    monthlyRevenue: Object.entries(monthlyRevenue).map(([month, revenue]) => ({ month, revenue })),
    highestPayments: customerData.sort((a, b) => (b.advancePayment || 0) - (a.advancePayment || 0)).slice(0, 5).map(job => ({
      date: job.date.split('T')[0],
      amount: job.advancePayment || 100
    }))
  };
};

export const getDeviceProblems = () => [
  'Screen Repair',
  'Battery Replacement',
  'Water Damage',
  'Software Issue',
  'Camera Repair',
  'Charging Port Repair',
  'Speaker Repair',
  'Microphone Repair',
  'Button Repair',
  'Data Recovery'
];

const generateTestData = () => {
  const testData = [];
  for (let i = 0; i < 50; i++) {
    testData.push({
      id: uuidv4(),
      customerId: generateReferenceNumber('MSC'),
      customerName: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      device: ['iPhone', 'Samsung', 'Google Pixel', 'OnePlus'][Math.floor(Math.random() * 4)],
      problem: getDeviceProblems()[Math.floor(Math.random() * getDeviceProblems().length)],
      status: ['Pending', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)],
      date: new Date().toISOString(),
      jobNumber: generateReferenceNumber('MSJN'),
      advancePayment: Math.floor(Math.random() * 200),
      deviceConditions: {
        Charging: Math.random() < 0.5 ? 'Yes' : 'No',
        Battery: Math.random() < 0.5 ? 'Yes' : 'No',
        Screen: Math.random() < 0.5 ? 'Yes' : 'No',
        Audio: Math.random() < 0.5 ? 'Yes' : 'No',
        WiFi: Math.random() < 0.5 ? 'Yes' : 'No',
        Camera: Math.random() < 0.5 ? 'Yes' : 'No'
      }
    });
  }
  writeExcelFile(testData);
  return testData;
};