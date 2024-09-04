import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const fetchCustomers = async (query) => {
  // TODO: Replace this with actual API call to fetch data from Excel
  await new Promise(resolve => setTimeout(resolve, 500));
  const allCustomers = [
    { id: 'CUST001', name: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
    { id: 'CUST002', name: 'Jane Smith', phone: '234-567-8901', email: 'jane@example.com' },
    { id: 'CUST003', name: 'Bob Johnson', phone: '345-678-9012', email: 'bob@example.com' },
  ];
  return allCustomers.filter(customer => 
    customer.name.toLowerCase().includes(query.toLowerCase()) ||
    customer.phone.includes(query) ||
    customer.email.toLowerCase().includes(query.toLowerCase())
  );
};

const CustomerSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: searchResults, refetch } = useQuery({
    queryKey: ['customerSearch', searchQuery],
    queryFn: () => fetchCustomers(searchQuery),
    enabled: false,
  });

  useEffect(() => {
    if (searchQuery.length > 2) {
      refetch();
    }
  }, [searchQuery, refetch]);

  const handleSearchResultClick = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search by name, phone, email, or reference number"
        className="pl-10 pr-4 py-2 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      {searchResults && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSearchResultClick(result.id)}
            >
              {result.name} - {result.phone}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;