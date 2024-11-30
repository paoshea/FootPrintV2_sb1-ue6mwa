import React, { useEffect } from 'react';
import { Building, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useGroupStore } from '../store/useGroupStore';
import { GroupMetricsGrid } from '../components/group/GroupMetricsGrid';
import { SubsidiaryList } from '../components/group/SubsidiaryList';
import { ConsolidatedMetrics } from '../components/group/ConsolidatedMetrics';
import { GroupPerformanceChart } from '../components/group/GroupPerformanceChart';

export function GroupDashboard() {
  const { selectedGroup, consolidatedReports, fetchConsolidatedReport } = useGroupStore();

  useEffect(() => {
    if (selectedGroup) {
      fetchConsolidatedReport(selectedGroup.id, 'current');
    }
  }, [selectedGroup, fetchConsolidatedReport]);

  if (!selectedGroup) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Select a group to view dashboard</div>
      </div>
    );
  }

  const currentReport = consolidatedReports[consolidatedReports.length - 1];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Building className="h-8 w-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedGroup.name}</h1>
            <p className="text-sm text-gray-500">Group Dashboard</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <GroupMetricsGrid group={selectedGroup} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ConsolidatedMetrics report={currentReport} />
          <GroupPerformanceChart reports={consolidatedReports} />
        </div>
        <div>
          <SubsidiaryList group={selectedGroup} />
        </div>
      </div>
    </div>
  );
}