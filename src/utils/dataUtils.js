import { readExcelFile, addCustomerData, generateDummyData } from './excelUtils';

export const fetchCustomersFromExcel = async () => {
  let customers = readExcelFile();
  if (customers.length === 0) {
    customers = generateDummyData();
  }
  return customers;
};

export const saveJobToExcel = async (jobData) => {
  const newJob = {
    id: `JOB${Math.floor(Math.random() * 1000)}`,
    ...jobData,
    date: new Date().toISOString().split('T')[0],
  };
  return addCustomerData(newJob);
};

export const fetchCustomerJobs = async (customerId) => {
  const allJobs = readExcelFile();
  return allJobs.filter(job => job.id === customerId);
};

export const sendWhatsAppMessage = async (phoneNumber, pdfBlob) => {
  console.log(`Simulating sending WhatsApp message to ${phoneNumber}`);
  console.log('PDF Blob:', pdfBlob);
  return 'MESSAGE_SID_12345';
};

export const fetchRevenueData = async () => {
  const allJobs = readExcelFile();
  const productRevenue = {};
  const dailyRevenue = {};
  const monthlyRevenue = {};

  allJobs.forEach(job => {
    // Product Revenue
    productRevenue[job.device] = (productRevenue[job.device] || 0) + 100; // Assuming $100 per job

    // Daily Revenue
    dailyRevenue[job.date] = (dailyRevenue[job.date] || 0) + 100;

    // Monthly Revenue
    const month = job.date.substring(0, 7); // YYYY-MM
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + 100;
  });

  return {
    productRevenue: Object.entries(productRevenue).map(([name, revenue]) => ({ name, revenue })),
    dailyRevenue: Object.entries(dailyRevenue).map(([date, revenue]) => ({ date, revenue })),
    monthlyRevenue: Object.entries(monthlyRevenue).map(([month, revenue]) => ({ month, revenue })),
    highestPayments: allJobs.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map(job => ({
      date: job.date,
      amount: 100 // Assuming $100 per job
    }))
  };
};