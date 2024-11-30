import React from 'react';
import { Building, Users, TrendingUp, DollarSign } from 'lucide-react';
import type { Group } from '../../types/group';

interface GroupMetricsGridProps {
  group: Group;
}

export function GroupMetricsGrid({ group }: GroupMetricsGridProps) {
  const metrics = [
    {
      label: 'Total Subsidiaries',
      value: group.metrics.subsidiaryCount,
      icon: <Building className="h-6 w-6 text-indigo-600" />,
      change: 0,
    },
    {
      label: 'Total Employees',
      value: group.metrics.totalEmployees.toLocaleString(),
      icon: <Users className="h-6 w-6 text-green-600" />,
      change: 5,
    },
    {
      label: 'Growth Rate',
      value: `${group.metrics.growthRate}%`,
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      change: group.metrics.growthRate,
    },
    {
      label: 'Performance Index',
      value: group.metrics.performanceIndex,
      icon: <DollarSign className="h-6 w-6 text-purple-600" />,
      change: 3,
    },
  ];

  return (
    <>
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-gray-50">{metric.icon}</div>
            {metric.change !== 0 && (
              <div
                className={`flex items-center ${
                  metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <span className="text-sm font-medium">
                  {metric.change >= 0 ? '+' : ''}
                  {metric.change}%
                </span>
              </div>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {metric.value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}