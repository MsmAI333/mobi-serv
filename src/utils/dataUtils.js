import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { Twilio } from 'twilio';

const EXCEL_FILE_PATH = '/path/to/your/excel/file.xlsx';

export const fetchCustomersFromExcel = async () => {
  const workbook = XLSX.readFile(EXCEL_FILE_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet);
};

export const saveJobToExcel = async (jobData) => {
  const workbook = XLSX.readFile(EXCEL_FILE_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jobs = XLSX.utils.sheet_to_json(sheet);
  
  const newJob = {
    id: `JOB${jobs.length + 1}`,
    ...jobData,
    date: new Date().toISOString(),
  };
  
  jobs.push(newJob);
  
  const newSheet = XLSX.utils.json_to_sheet(jobs);
  workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
  
  return newJob;
};

export const fetchCustomerJobs = async (customerId) => {
  const workbook = XLSX.readFile(EXCEL_FILE_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jobs = XLSX.utils.sheet_to_json(sheet);
  
  return jobs.filter(job => job.customerId === customerId);
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
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = new Twilio(accountSid, authToken);
  
  const message = await client.messages.create({
    body: 'Welcome to Mobi Serv! Here is your job sheet.',
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${phoneNumber}`,
    mediaUrl: [URL.createObjectURL(pdfBlob)],
  });
  
  return message.sid;
};