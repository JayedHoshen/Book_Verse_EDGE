import { create } from 'zustand';
import { adminDashboardAPI } from '@/lib/mock/adminDashboardApi';

export const useAdminDashboardStore = create((set, get) => ({
  // Initial State
  data: null,
  isLoading: false,
  isExporting: false,
  error: null,
  timeRange: '7days',
  lastUpdated: null,

  // Actions
  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await adminDashboardAPI.getDashboardData(get().timeRange);

      set({
        data: response.data,
        isLoading: false,
        lastUpdated: response.data.timestamp,
      });
    } catch (error) {
      set({
        error: error.message || 'Failed to load dashboard data',
        isLoading: false,
      });
    }
  },

  setTimeRange: (range) => {
    set({ timeRange: range });
    // Auto-fetch when time range changes
    get().fetchDashboardData();
  },

  exportReport: async () => {
    set({ isExporting: true });

    try {
      const response = await adminDashboardAPI.exportReport(get().timeRange);
      set({ isExporting: false });
      return response.downloadUrl;
    } catch (error) {
      set({
        error: error.message || 'Failed to export report',
        isExporting: false,
      });
      throw error;
    }
  },

  refreshData: async () => {
    await get().fetchDashboardData();
  },

  clearError: () => set({ error: null }),

  // Computed values
  getStatsCards: () => {
    const { data } = get();
    if (!data) return [];

    return [
      {
        label: 'Total Revenue',
        value: `$${data.stats.totalRevenue.toLocaleString()}`,
        growth: data.stats.revenueGrowth,
        icon: 'DollarSign',
        color: 'blue',
      },
      {
        label: 'Total Orders',
        value: data.stats.totalOrders.toLocaleString(),
        growth: data.stats.ordersGrowth,
        icon: 'ShoppingBag',
        color: 'green',
      },
      {
        label: 'Total Customers',
        value: data.stats.totalCustomers.toLocaleString(),
        growth: data.stats.customersGrowth,
        icon: 'Users',
        color: 'purple',
      },
      {
        label: 'Active Products',
        value: data.stats.activeInventory.toLocaleString(),
        growth: -data.stats.lowStock, // Negative to show
        icon: 'Package',
        color: 'orange',
      },
    ];
  },
}));
