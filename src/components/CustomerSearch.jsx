import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchCustomersFromExcel } from '../utils/dataUtils';

const CustomerSearch = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: allCustomers, isLoading, isError } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomersFromExcel,
  });

  const searchResults = allCustomers?.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleSearchResultClick = (customer) => {
    if (onSelect) {
      onSelect(customer);
    } else {
      navigate(`/customers/${customer.id}`);
    }
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
      {searchQuery.length > 2 && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSearchResultClick(result)}
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