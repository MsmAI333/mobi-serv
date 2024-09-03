import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

const Analytics = () => {
  const [metric, setMetric] = useState('jobs');

  const data = {
    jobs: [
      { name: 'Mon', value: 12 },
      { name: 'Tue', value: 19 },
      { name: 'Wed', value: 3 },
      { name: 'Thu', value: 5 },
      { name: 'Fri', value: 2 },
      { name: 'Sat', value: 3 },
      { name: 'Sun', value: 1 },
    ],
    customers: [
      { name: 'Mon', value: 5 },
      { name: 'Tue', value: 8 },
      { name: 'Wed', value: 2 },
      { name: 'Thu', value: 4 },
      { name: 'Fri', value: 1 },
      { name: 'Sat', value: 2 },
      { name: 'Sun', value: 1 },
    ],
    products: [
      { name: 'Mon', value: 15 },
      { name: 'Tue', value: 22 },
      { name: 'Wed', value: 8 },
      { name: 'Thu', value: 12 },
      { name: 'Fri', value: 5 },
      { name: 'Sat', value: 7 },
      { name: 'Sun', value: 3 },
    ],
    revenue: [
      { name: 'Mon', value: 1200 },
      { name: 'Tue', value: 1900 },
      { name: 'Wed', value: 300 },
      { name: 'Thu', value: 500 },
      { name: 'Fri', value: 200 },
      { name: 'Sat', value: 300 },
      { name: 'Sun', value: 100 },
    ],
  };

  const metricLabels = {
    jobs: 'Jobs',
    customers: 'Customers',
    products: 'Products/Services',
    revenue: 'Revenue ($)',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Weekly {metricLabels[metric]} Analytics</span>
          <Button onClick={() => setMetric(current => {
            const metrics = Object.keys(data);
            const currentIndex = metrics.indexOf(current);
            return metrics[(currentIndex + 1) % metrics.length];
          })}>
            Change Metric
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data[metric]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name={metricLabels[metric]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Analytics;