import * as XLSX from 'xlsx';

const EXCEL_FILE_NAME = 'customer_data.xlsx';

// Function to read data from Excel file
export const readExcelFile = () => {
  try {
    const workbook = XLSX.readFile(EXCEL_FILE_NAME);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return [];
  }
};

// Function to write data to Excel file
const writeExcelFile = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
  XLSX.writeFile(workbook, EXCEL_FILE_NAME);
};

// Function to add new customer data
export const addCustomerData = (newCustomer) => {
  const existingData = readExcelFile();
  existingData.push(newCustomer);
  writeExcelFile(existingData);
  return existingData;
};

// Generate 50 dummy customer data if the file doesn't exist
export const initializeExcelFile = () => {
  const existingData = readExcelFile();
  if (existingData.length === 0) {
    const dummyData = generateDummyData();
    writeExcelFile(dummyData);
    return dummyData;
  }
  return existingData;
};

// Generate 50 dummy customer data
const generateDummyData = () => {
  const dummyData = [];
  for (let i = 1; i <= 50; i++) {
    dummyData.push({
      id: `CUST${i.toString().padStart(3, '0')}`,
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
  return dummyData;
};

export const fetchCustomersFromExcel = () => {
  return initializeExcelFile();
};

export const saveJobToExcel = (jobData) => {
  const newJob = {
    id: `JOB${Math.floor(Math.random() * 1000)}`,
    ...jobData,
    date: new Date().toISOString().split('T')[0],
  };
  return addCustomerData(newJob);
};

export const fetchCustomerJobs = (customerId) => {
  const allJobs = readExcelFile();
  return allJobs.filter(job => job.id === customerId);
};

export const sendWhatsAppMessage = async (phoneNumber, pdfBlob) => {
  console.log(`Simulating sending WhatsApp message to ${phoneNumber}`);
  console.log('PDF Blob:', pdfBlob);
  return 'MESSAGE_SID_12345';
};

export const fetchRevenueData = () => {
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

export const generateJobPDF = async (jobData, signature) => {
  // Simulating PDF generation
  console.log('Generating PDF for job:', jobData);
  console.log('With signature:', signature);
  return new Blob(['Simulated PDF content'], { type: 'application/pdf' });
};

export const editCustomerData = (customerId, updatedData) => {
  const allData = readExcelFile();
  const index = allData.findIndex(customer => customer.id === customerId);
  if (index !== -1) {
    allData[index] = { ...allData[index], ...updatedData };
    writeExcelFile(allData);
  }
  return allData;
};

export const deleteCustomerData = (customerId) => {
  const allData = readExcelFile();
  const updatedData = allData.filter(customer => customer.id !== customerId);
  writeExcelFile(updatedData);
  return updatedData;
};