// src/app/admin/submissions/page.tsx

'use client';

import { useState } from 'react';
import SubmissionsFilters from '@/components/admin/submissions-filters';
import SubmissionsTable from '@/components/admin/submissions-table';

export default function SubmissionsPage() {
  const [filters, setFilters] = useState({});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
        <p className="text-gray-600 mt-2">
          View and manage application submissions from Fillout forms
        </p>
      </div>

      <SubmissionsFilters onFiltersChange={setFilters} />
      <SubmissionsTable filters={filters} />
    </div>
  );
}
