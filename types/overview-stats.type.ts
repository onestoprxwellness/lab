export type DashboardMetric = {
  value: number;
  change: number;
  label: string;
};

export type DashboardMetrics = {
  total_inventory: DashboardMetric;
  total_sales: DashboardMetric;
  out_of_stock: DashboardMetric;
  expired: DashboardMetric;
};

export type EarningsChart = {
  labels: string[];
  platform_earnings: number[];
  offline_earnings: number[];
};

export type RecentActivity = Record<string, unknown>;

export type PharmacyOverview = {
  metrics: DashboardMetrics;
  earnings_chart: EarningsChart;
  recent_activity: RecentActivity[];
};
