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
export const writeExcelFile = (data) => {
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

// Generate 50 dummy customer data
export const generateDummyData = () => {
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
  writeExcelFile(dummyData);
  return dummyData;
};