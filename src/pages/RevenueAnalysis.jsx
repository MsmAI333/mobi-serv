import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Navigation from '../components/Navigation';
import { useQuery } from '@tanstack/react-query';

const fetchRevenueData = async () => {
  // TODO: Replace this with actual API call to fetch data from Excel
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    productRevenue: [
      { name: 'iPhone Repair', revenue: 5000 },
      { name: 'Samsung Repair', revenue: 4000 },
      { name: 'MacBook Repair', revenue: 3000 },
      { name: 'iPad Repair', revenue: 2000 },
      { name: 'Other', revenue: 1000 },
    ],
    dailyRevenue: [
      { date: '2023-03-01', revenue: 1000 },
      { date: '2023-03-02', revenue: 1500 },
      { date: '2023-03-03', revenue: 1200 },
      { date: '2023-03-04', revenue: 1800 },
      { date: '2023-03-05', revenue: 2000 },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 30000 },
      { month: 'Feb', revenue: 35000 },
      { month: 'Mar', revenue: 40000 },
      { month: 'Apr', revenue: 38000 },
      { month: 'May', revenue: 42000 },
    ],
    highestPayments: [
      { date: '2023-03-05', amount: 500 },
      { date: '2023-03-02', amount: 450 },
      { date: '2023-03-04', amount: 400 },
    ],
  };
};

const RevenueAnalysis = () => {
  const { data: revenueData, isLoading, isError } = useQuery({
    queryKey: ['revenueAnalysis'],
    queryFn: fetchRevenueData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching revenue data</div>;

  return (
    <div className="container mx-auto py-10">
      <header className="bg-white dark:bg-gray-800 shadow mb-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Revenue Analysis</h1>
            <Navigation />
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Revenue Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData.productRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData.dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Highest Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {revenueData.highestPayments.map((payment, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{payment.date}</span>
                  <span className="font-bold">${payment.amount}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueAnalysis;