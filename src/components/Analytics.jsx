import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const data = [
    { name: 'Mon', jobs: 12 },
    { name: 'Tue', jobs: 19 },
    { name: 'Wed', jobs: 3 },
    { name: 'Thu', jobs: 5 },
    { name: 'Fri', jobs: 2 },
    { name: 'Sat', jobs: 3 },
    { name: 'Sun', jobs: 1 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Job Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="jobs" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Analytics;