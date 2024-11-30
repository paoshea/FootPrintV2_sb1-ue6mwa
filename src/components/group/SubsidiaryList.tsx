import React from 'react';
import { Building, TrendingUp, TrendingDown } from 'lucide-react';
import type { Group } from '../../types/group';

interface SubsidiaryListProps {
  group: Group;
}

export function SubsidiaryList({ group }: SubsidiaryListProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Subsidiaries</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {group.subsidiaries.map((subsidiaryId) => (
          <div key={subsidiaryId} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Subsidiary Name
                  </h3>
                  <p className="text-sm text-gray-500">Location</p>
                </div>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Performance</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          </div>
        ))}
        {group.subsidiaries.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No subsidiaries added yet
          </div>
        )}
      </div>
    </div>
  );
}