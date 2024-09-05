import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'customer_data';

let customerData = [];

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customerData));
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    customerData = JSON.parse(storedData);
  } else {
    customerData = [];
  }
};

const initializeData = () => {
  loadFromLocalStorage();
  if (customerData.length === 0) {
    for (let i = 1; i <= 50; i++) {
      customerData.push({
        id: uuidv4(),
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
        phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        device: ['iPhone', 'Samsung', 'Google Pixel', 'OnePlus'][Math.floor(Math.random() * 4)],
        problem: ['Screen Repair', 'Battery Replacement', 'Water Damage', 'Software Issue'][Math.floor(Math.random() * 4)],
        status: ['Pending', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)],
        date: new Date().toISOString(),
        pdfUrl: `https://example.com/customer${i}_report.pdf`,
        imageUrl: `https://example.com/customer${i}_device.jpg`
      });
    }
    saveToLocalStorage();
  }
};

export const fetchCustomersFromExcel = async () => {
  initializeData();
  return customerData;
};

export const addCustomerData = async (newCustomer) => {
  const customerWithId = { ...newCustomer, id: uuidv4(), date: new Date().toISOString() };
  customerData.push(customerWithId);
  saveToLocalStorage();
  return customerData;
};

export const editCustomerData = async (customerId, updatedData) => {
  customerData = customerData.map(customer => 
    customer.id === customerId ? { ...customer, ...updatedData, date: new Date().toISOString() } : customer
  );
  saveToLocalStorage();
  return customerData;
};

export const deleteCustomerData = async (customerId) => {
  customerData = customerData.filter(customer => customer.id !== customerId);
  saveToLocalStorage();
  return customerData;
};

export const saveJobToExcel = async (jobData) => {
  const newJob = {
    id: uuidv4(),
    ...jobData,
    date: new Date().toISOString(),
  };
  await addCustomerData(newJob);
  return newJob;
};

export const fetchCustomerJobs = async (customerId) => {
  initializeData();
  return customerData.filter(job => job.id === customerId);
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

// Initialize the data when the module is imported
initializeData();