import { create } from 'zustand';
import {
  adminProductListAPI,
  adminProductCRUDAPI,
  adminProductDetailsAPI,
} from '@/lib/mock/adminProductApi';

// ============ PRODUCT LIST STORE ============
export const useAdminProductListStore = create((set, get) => ({
  products: [],
  categories: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  categoryFilter: 'all',
  statusFilter: 'all',
  selectedProducts: [],

  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const { searchTerm, categoryFilter, statusFilter } = get();
      const response = await adminProductListAPI.getAll({
        search: searchTerm,
        category: categoryFilter,
        status: statusFilter,
      });

      set({ products: response.products, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  loadCategories: async () => {
    try {
      const response = await adminProductListAPI.getCategories();
      set({ categories: response.categories });
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  },

  deleteProduct: async (id) => {
    try {
      await adminProductListAPI.delete(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        selectedProducts: state.selectedProducts.filter((sid) => sid !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  bulkDelete: async () => {
    const ids = get().selectedProducts;
    if (ids.length === 0) return;

    try {
      await adminProductListAPI.bulkDelete(ids);
      set((state) => ({
        products: state.products.filter((p) => !ids.includes(p.id)),
        selectedProducts: [],
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  bulkUpdateStatus: async (status) => {
    const ids = get().selectedProducts;
    if (ids.length === 0) return;

    try {
      await adminProductListAPI.bulkUpdateStatus(ids, status);
      set((state) => ({
        products: state.products.map((p) => (ids.includes(p.id) ? { ...p, status: status } : p)),
        selectedProducts: [],
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().fetchProducts();
  },

  setCategoryFilter: (category) => {
    set({ categoryFilter: category });
    get().fetchProducts();
  },

  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().fetchProducts();
  },

  toggleSelectProduct: (id) => {
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(id)
        ? state.selectedProducts.filter((sid) => sid !== id)
        : [...state.selectedProducts, id],
    }));
  },

  selectAll: () => {
    set((state) => ({
      selectedProducts: state.products.map((p) => p.id),
    }));
  },

  clearSelection: () => set({ selectedProducts: [] }),

  clearError: () => set({ error: null }),
}));

// ============ PRODUCT FORM STORE (Create & Edit) ============
export const useAdminProductFormStore = create((set, get) => ({
  mode: 'create',
  productId: null,
  productDetails: null,
  images: [],
  categories: [],
  isLoading: false,
  isSubmitting: false,
  isUploading: false,
  error: null,
  previewMode: false,
  activeTab: 'basic',
  productStatus: 'active',
  featured: false,
  seoTitle: '',
  metaDescription: '',
  tags: '',

  // Mode Management
  setMode: (mode, productId) => {
    const prevImages = get().images;
    // Clean up previous object URLs
    prevImages.forEach((url) => {
      if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    });

    set({
      mode,
      productId: productId || null,
      productDetails: null,
      images: [],
      error: null,
      previewMode: false,
      activeTab: 'basic',
      productStatus: 'active',
      featured: false,
      seoTitle: '',
      metaDescription: '',
      tags: '',
    });
  },

  resetForm: () => {
    const images = get().images;
    images.forEach((url) => {
      if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    });

    set({
      productDetails: null,
      images: [],
      error: null,
      previewMode: false,
      activeTab: 'basic',
      productStatus: 'active',
      featured: false,
      seoTitle: '',
      metaDescription: '',
      tags: '',
    });
  },

  // Data Operations
  fetchProduct: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await adminProductCRUDAPI.getById(id);
      const product = response.product;

      set({
        productDetails: product,
        images: product.images,
        productStatus: product.status,
        featured: product.featured,
        seoTitle: product.seoTitle,
        metaDescription: product.metaDescription,
        tags: product.tags,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  loadCategories: async () => {
    try {
      const response = await adminProductListAPI.getCategories();
      set({ categories: response.categories });
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  },

  saveProduct: async (data) => {
    set({ isSubmitting: true, error: null });

    try {
      const { mode, productId, images } = get();

      if (mode === 'create') {
        const response = await adminProductCRUDAPI.create(data, images);
        set({ isSubmitting: false, productId: response.product.id });
        return response.product.id;
      } else if (mode === 'edit' && productId) {
        await adminProductCRUDAPI.update(productId, data, images);
        set({ isSubmitting: false });
      }
    } catch (error) {
      set({ error: error.message, isSubmitting: false });
      throw error;
    }
  },

  // Image Operations
  addImages: async (files) => {
    set({ isUploading: true, error: null });

    try {
      const fileArray = Array.from(files);

      // Validate
      const invalidFiles = fileArray.filter(
        (file) => !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024
      );

      if (invalidFiles.length > 0) {
        throw new Error('Please upload only images under 5MB');
      }

      // Simulate upload and get persistent mock URLs
      const uploadResponse = await adminProductCRUDAPI.uploadImages(fileArray);
      const newImages = uploadResponse.urls;

      set((state) => ({
        images: [...state.images, ...newImages],
        isUploading: false,
      }));
    } catch (error) {
      set({ error: error.message, isUploading: false });
    }
  },

  removeImage: (index) => {
    set((state) => {
      const imageToRemove = state.images[index];
      if (imageToRemove?.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove);
      }
      return {
        images: state.images.filter((_, i) => i !== index),
      };
    });
  },

  // UI Actions
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setProductStatus: (status) => set({ productStatus: status }),
  setFeatured: (featured) => set({ featured }),
  setSeoTitle: (title) => set({ seoTitle: title }),
  setMetaDescription: (desc) => set({ metaDescription: desc }),
  setTags: (tags) => set({ tags }),
  clearError: () => set({ error: null }),

  // Validation
  validateBeforeSubmit: async (data) => {
    const validation = await adminProductCRUDAPI.validateData(data);

    if (!validation.success) {
      set({ error: Object.values(validation.errors || {}).join(', ') });
      return false;
    }

    if (get().images.length === 0) {
      set({ error: 'Please upload at least one product image' });
      return false;
    }

    return true;
  },
}));

export const useAdminProductDetailsStore = create((set, get) => ({
  product: null,
  selectedImageIndex: 0,
  isLoading: false,
  error: null,
  showDeleteModal: false,

  fetchProductDetails: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await adminProductDetailsAPI.getDetails(id);
      set({ product: response.product, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  setSelectedImage: (index) => set({ selectedImageIndex: index }),

  deleteProduct: async () => {
    const { product } = get();
    if (!product) return;

    try {
      await adminProductCRUDAPI.delete(product.id);
      set({ showDeleteModal: false });
      return;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  openDeleteModal: () => set({ showDeleteModal: true }),
  closeDeleteModal: () => set({ showDeleteModal: false }),
  clearError: () => set({ error: null }),
}));
