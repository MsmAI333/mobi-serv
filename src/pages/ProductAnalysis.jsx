import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductAnalysis = () => {
  const frequentRepairs = [
    { name: 'iPhone 12', count: 50 },
    { name: 'Samsung Galaxy S21', count: 40 },
    { name: 'MacBook Pro', count: 30 },
    { name: 'iPad Air', count: 25 },
    { name: 'Google Pixel 5', count: 20 },
  ];

  const highestRevenue = [
    { name: 'MacBook Pro', revenue: 10000 },
    { name: 'iPhone 12', revenue: 8000 },
    { name: 'iPad Pro', revenue: 6000 },
    { name: 'Samsung Galaxy S21', revenue: 5000 },
    { name: 'iMac', revenue: 4000 },
  ];

  const longestRepairTime = [
    { name: 'MacBook Pro', time: 5 },
    { name: 'iMac', time: 4 },
    { name: 'iPad Pro', time: 3 },
    { name: 'iPhone 12', time: 2 },
    { name: 'Samsung Galaxy S21', time: 2 },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Product Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Most Frequently Repaired Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={frequentRepairs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Highest Revenue Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={highestRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Longest Repair Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={longestRepairTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="time" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductAnalysis;