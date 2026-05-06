import { create } from 'zustand';
import { adminOrderAPI } from '@/lib/mock/adminOrderApi';

export const useAdminOrderStore = create((set, get) => ({
  // Initial State
  orders: [],
  selectedOrder: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
  searchTerm: '',
  statusFilter: 'all',
  showStatusModal: false,
  newStatus: '',
  showOrderModal: false,
  showExportConfirm: false,

  // Data Actions
  fetchOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await adminOrderAPI.getAll();
      set({ orders: response.orders, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchOrderDetails: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await adminOrderAPI.getById(id);
      set({ selectedOrder: response.order, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateStatus: async (orderId, newStatus) => {
    set({ isSubmitting: true, error: null });

    try {
      await adminOrderAPI.updateStatus(orderId, newStatus);

      set((state) => ({
        orders: state.orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
        selectedOrder: state.selectedOrder ? { ...state.selectedOrder, status: newStatus } : null,
        isSubmitting: false,
        showStatusModal: false,
      }));
    } catch (error) {
      set({ error: error.message, isSubmitting: false });
      throw error;
    }
  },

  exportOrders: async () => {
    try {
      const response = await adminOrderAPI.exportOrders();
      return response.downloadUrl;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  printInvoice: async (orderId) => {
    try {
      await adminOrderAPI.printInvoice(orderId);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // UI Actions
  setSearchTerm: (term) => set({ searchTerm: term }),

  setStatusFilter: (status) => set({ statusFilter: status }),

  openStatusModal: () => {
    const { selectedOrder } = get();
    set({
      showStatusModal: true,
      newStatus: selectedOrder?.status || 'pending',
    });
  },

  closeStatusModal: () => set({ showStatusModal: false }),

  setNewStatus: (status) => set({ newStatus: status }),

  openOrderModal: async (order) => {
    set({ showOrderModal: true });
    await get().fetchOrderDetails(order.id);
  },

  closeOrderModal: () => set({ showOrderModal: false, selectedOrder: null }),

  // Utils
  clearError: () => set({ error: null }),

  getFilteredOrders: () => {
    const { orders, searchTerm, statusFilter } = get();

    return orders.filter((order) => {
      const matchesSearch =
        !searchTerm ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  },

  getStats: () => {
    const { orders } = get();

    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      processing: orders.filter((o) => o.status === 'processing').length,
      shipped: orders.filter((o) => o.status === 'shipped').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    };
  },
}));
