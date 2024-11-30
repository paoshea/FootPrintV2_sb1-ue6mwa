import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ConsolidatedReport } from '../../types/group';

interface ConsolidatedMetricsProps {
  report: ConsolidatedReport;
}

export function ConsolidatedMetrics({ report }: ConsolidatedMetricsProps) {
  if (!report) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">Consolidated Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              ${(report.metrics.revenue.total / 1000000).toFixed(1)}M
            </p>
            <div className={`ml-2 flex items-center text-sm ${
              report.metrics.revenue.growth >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {report.metrics.revenue.growth >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(report.metrics.revenue.growth)}%
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Employees</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {report.metrics.employees.total.toLocaleString()}
            </p>
            <div className={`ml-2 flex items-center text-sm ${
              report.metrics.employees.growth >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {report.metrics.employees.growth >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(report.metrics.employees.growth)}%
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Overall Performance</h3>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-gray-900">
              {report.metrics.performance.overall}%
            </p>
          </div>
        </div>
      </div>

      {report.highlights.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Highlights</h3>
          <div className="space-y-4">
            {report.highlights.map((highlight) => (
              <div
                key={highlight.id}
                className="bg-gray-50 rounded-lg p-4"
              >
                <h4 className="font-medium text-gray-900">{highlight.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {highlight.description}
                </p>
                <div className="mt-2 flex items-center text-sm text-indigo-600">
                  Impact Score: {highlight.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}