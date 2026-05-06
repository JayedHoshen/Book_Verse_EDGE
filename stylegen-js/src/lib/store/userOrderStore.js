import { create } from "zustand";
import {
  userOrderAPI,
} from "@/lib/mock/userOrderApi";

export const useUserOrderStore = create((set, get) => ({
  // Initial State
  orders: [],
  selectedOrder: null,
  trackingHistory: [],
  currentTrackingStep: 1,
  isLoading: false,
  error: null,
  searchTerm: "",
  statusFilter: "all",

  // Actions
  fetchOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const authStore = (await import("@/lib/store/authStore")).useAuthStore;
      const user = authStore.getState().user;

      if (!user) {
        set({ orders: [], isLoading: false });
        return;
      }

      const response = await userOrderAPI.getOrders(user.id);
      set({ orders: response.orders, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchOrderDetails: async (orderId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await userOrderAPI.getOrderById(orderId);
      set({ selectedOrder: response.order, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchTrackingInfo: async (orderId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await userOrderAPI.getTrackingInfo(orderId);
      set({
        trackingHistory: response.tracking,
        currentTrackingStep: response.currentStep,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await userOrderAPI.createOrder(orderData);
      const newOrder = response.order;

      set((state) => ({
        orders: [newOrder, ...state.orders],
        isLoading: false,
      }));

      return newOrder.id;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  downloadInvoice: async (orderId) => {
    try {
      const response = await userOrderAPI.downloadInvoice(orderId);
      return response.downloadUrl;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // UI Actions
  setSearchTerm: (term) => set({ searchTerm: term }),

  setStatusFilter: (status) => set({ statusFilter: status }),

  clearError: () => set({ error: null }),

  // Utils
  getFilteredOrders: () => {
    const { orders, searchTerm, statusFilter } = get();

    return orders.filter((order) => {
      const matchesSearch =
        !searchTerm ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  },
}));
