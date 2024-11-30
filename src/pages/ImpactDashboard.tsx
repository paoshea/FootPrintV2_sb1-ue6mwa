import React, { useEffect } from 'react';
import { Zap, TrendingUp } from 'lucide-react';
import { useImpactStore } from '../store/useImpactStore';
import { ImpactScoreCard } from '../components/impact/ImpactScoreCard';
import { ImpactMetricGrid } from '../components/impact/ImpactMetricGrid';
import { ImpactTrendChart } from '../components/impact/ImpactTrendChart';
import { ImpactHighlightList } from '../components/impact/ImpactHighlightList';

export function ImpactDashboard() {
  const { metrics, score, highlights, loading, error, fetchImpactData } = useImpactStore();

  useEffect(() => {
    fetchImpactData();
  }, [fetchImpactData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading impact data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center space-x-3 mb-8">
        <Zap className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Impact Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ImpactScoreCard score={score} />
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Overall Progress</span>
                <span className="text-sm font-medium text-gray-900">
                  {score.overall}%
                </span>
              </div>
              {Object.entries(score.categories).map(([category, value]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ImpactMetricGrid metrics={metrics} />
          <ImpactTrendChart trends={score.trends} />
        </div>
        <div>
          <ImpactHighlightList highlights={highlights} />
        </div>
      </div>
    </div>
  );
}