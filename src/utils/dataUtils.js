import { v4 as uuidv4 } from 'uuid';

// Simulated in-memory database
let customerData = [];

// Initialize with some dummy data
const initializeData = () => {
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
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
        pdfUrl: `https://example.com/customer${i}_report.pdf`,
        imageUrl: `https://example.com/customer${i}_device.jpg`
      });
    }
  }
};

// Function to fetch all customer data
export const fetchCustomersFromExcel = () => {
  initializeData();
  return Promise.resolve(customerData);
};

// Function to add new customer data
export const addCustomerData = (newCustomer) => {
  const customerWithId = { ...newCustomer, id: uuidv4() };
  customerData.push(customerWithId);
  return Promise.resolve(customerData);
};

// Function to edit customer data
export const editCustomerData = (customerId, updatedData) => {
  customerData = customerData.map(customer => 
    customer.id === customerId ? { ...customer, ...updatedData } : customer
  );
  return Promise.resolve(customerData);
};

// Function to delete customer data
export const deleteCustomerData = (customerId) => {
  customerData = customerData.filter(customer => customer.id !== customerId);
  return Promise.resolve(customerData);
};

// Function to save new job
export const saveJobToExcel = (jobData) => {
  const newJob = {
    id: uuidv4(),
    ...jobData,
    date: new Date().toISOString().split('T')[0],
  };
  return addCustomerData(newJob);
};

// Function to fetch customer jobs
export const fetchCustomerJobs = (customerId) => {
  return Promise.resolve(customerData.filter(job => job.id === customerId));
};

// Function to generate PDF (placeholder)
export const generateJobPDF = async (jobData, signature) => {
  console.log('Generating PDF for job:', jobData);
  console.log('With signature:', signature);
  return new Blob(['Simulated PDF content'], { type: 'application/pdf' });
};

// Function to send WhatsApp message (placeholder)
export const sendWhatsAppMessage = async (phoneNumber, pdfBlob) => {
  console.log(`Simulating sending WhatsApp message to ${phoneNumber}`);
  console.log('PDF Blob:', pdfBlob);
  return 'MESSAGE_SID_12345';
};

// Function to fetch revenue data
export const fetchRevenueData = () => {
  const productRevenue = {};
  const dailyRevenue = {};
  const monthlyRevenue = {};

  customerData.forEach(job => {
    // Product Revenue
    productRevenue[job.device] = (productRevenue[job.device] || 0) + 100; // Assuming $100 per job

    // Daily Revenue
    dailyRevenue[job.date] = (dailyRevenue[job.date] || 0) + 100;

    // Monthly Revenue
    const month = job.date.substring(0, 7); // YYYY-MM
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + 100;
  });

  return Promise.resolve({
    productRevenue: Object.entries(productRevenue).map(([name, revenue]) => ({ name, revenue })),
    dailyRevenue: Object.entries(dailyRevenue).map(([date, revenue]) => ({ date, revenue })),
    monthlyRevenue: Object.entries(monthlyRevenue).map(([month, revenue]) => ({ month, revenue })),
    highestPayments: customerData.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map(job => ({
      date: job.date,
      amount: 100 // Assuming $100 per job
    }))
  });
};

// Initialize the data when the module is imported
initializeData();