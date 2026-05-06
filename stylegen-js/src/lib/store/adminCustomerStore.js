import { create } from 'zustand';
import { adminCustomerAPI } from '@/lib/mock/adminCustomerApi';

export const useAdminCustomerStore = create((set, get) => ({
  // Initial State
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
  searchTerm: '',
  statusFilter: 'all',
  newNote: '',
  showStatusModal: false,
  showDetailsModal: false,

  // Data Actions
  fetchCustomers: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await adminCustomerAPI.getAll();
      set({ customers: response.customers, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchCustomerDetails: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await adminCustomerAPI.getById(id);
      set({ selectedCustomer: response.customer, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateStatus: async (customerId, newStatus) => {
    set({ isSubmitting: true, error: null });

    try {
      await adminCustomerAPI.updateStatus(customerId, newStatus);

      set((state) => ({
        customers: state.customers.map((c) =>
          c.id === customerId ? { ...c, status: newStatus } : c
        ),
        selectedCustomer: state.selectedCustomer
          ? {
              ...state.selectedCustomer,
              status: newStatus,
            }
          : null,
        isSubmitting: false,
        showStatusModal: false,
      }));
    } catch (error) {
      set({ error: error.message, isSubmitting: false });
      throw error;
    }
  },

  addNote: async (content) => {
    const { selectedCustomer } = get();
    if (!selectedCustomer) return;

    set({ isSubmitting: true });

    try {
      const response = await adminCustomerAPI.addNote(selectedCustomer.id, content);

      set((state) => ({
        selectedCustomer: state.selectedCustomer
          ? {
              ...state.selectedCustomer,
              notes: [response.note, ...state.selectedCustomer.notes],
            }
          : null,
        newNote: '',
        isSubmitting: false,
      }));
    } catch (error) {
      set({ error: error.message, isSubmitting: false });
      throw error;
    }
  },

  // UI Actions
  setSearchTerm: (term) => set({ searchTerm: term }),

  setStatusFilter: (status) => set({ statusFilter: status }),

  setNewNote: (note) => set({ newNote: note }),

  openStatusModal: () => set({ showStatusModal: true }),

  closeStatusModal: () => set({ showStatusModal: false }),

  openDetailsModal: async (customer) => {
    set({ showDetailsModal: true });
    await get().fetchCustomerDetails(customer.id);
  },

  closeDetailsModal: () => {
    set({ showDetailsModal: false, selectedCustomer: null });
  },

  // Utils
  clearError: () => set({ error: null }),

  getFilteredCustomers: () => {
    const { customers, searchTerm, statusFilter } = get();

    return customers.filter((customer) => {
      const matchesSearch =
        !searchTerm ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  },

  getCustomerStats: () => {
    const { customers } = get();

    return {
      total: customers.length,
      active: customers.filter((c) => c.status === 'active').length,
      inactive: customers.filter((c) => c.status === 'inactive').length,
      banned: customers.filter((c) => c.status === 'banned').length,
    };
  },
}));
