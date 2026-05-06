import { create } from "zustand";
import {
  adminCategoryAPI,
} from "@/lib/mock/adminCategoryApi";

export const useAdminCategoryStore = create((set, get) => ({
  categories: [],
  selectedCategory: null,
  isLoading: false,
  isSubmitting: false,
  isUploading: false,
  error: null,
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  formData: {
    name: "",
    description: "",
    status: "active",
  },
  selectedImage: null,
  imageFile: null,
  searchTerm: "",

  fetchCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await adminCategoryAPI.getAll();
      set({ categories: response.categories, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCategory: async () => {
    const { formData, imageFile } = get();

    set({ isSubmitting: true, error: null });

    try {
      const validation = await adminCategoryAPI.validateData(formData);
      if (!validation.success) {
        throw new Error(Object.values(validation.errors || {}).join(", "));
      }

      let imageUrl;
      if (imageFile) {
        const uploadResponse = await adminCategoryAPI.uploadImage(imageFile);
        imageUrl = uploadResponse.url;
      }

      const response = await adminCategoryAPI.create(formData, imageUrl);

      set((state) => ({
        categories: [...state.categories, response.category],
        isSubmitting: false,
        showAddModal: false,
      }));

      get().resetForm();
    } catch (error) {
      set({ error: error.message, isSubmitting: false });
      throw error;
    }
  },

  updateCategory: async () => {
    const { selectedCategory, formData, imageFile } = get();

    if (!selectedCategory) return;

    set({ isSubmitting: true, error: null });

    try {
      const validation = await adminCategoryAPI.validateData(formData);
      if (!validation.success) {
        throw new Error(Object.values(validation.errors || {}).join(", "));
      }

      let imageUrl;
      if (imageFile) {
        const uploadResponse = await adminCategoryAPI.uploadImage(imageFile);
        imageUrl = uploadResponse.url;
      }

      const response = await adminCategoryAPI.update(
        selectedCategory.id,
        formData,
        imageUrl,
      );

      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === selectedCategory.id ? response.category : c,
        ),
        isSubmitting: false,
        showEditModal: false,
      }));

      get().resetForm();
    } catch (error) {
      set({ error: error.message, isSubmitting: false });
      throw error;
    }
  },

  deleteCategory: async () => {
    const { selectedCategory } = get();
    if (!selectedCategory) return;

    set({ isSubmitting: true, error: null });

    try {
      await adminCategoryAPI.delete(selectedCategory.id);

      set((state) => ({
        categories: state.categories.filter(
          (c) => c.id !== selectedCategory.id,
        ),
        isSubmitting: false,
        showDeleteModal: false,
        selectedCategory: null,
      }));
    } catch (error) {
      set({ error: error.message, isSubmitting: false });
      throw error;
    }
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  openAddModal: () => {
    get().resetForm();
    set({ showAddModal: true, error: null });
  },

  openEditModal: (category) => {
    set({
      selectedCategory: category,
      formData: {
        name: category.name,
        description: category.description,
        status: category.status,
      },
      selectedImage: category.image,
      showEditModal: true,
      error: null,
    });
  },

  openDeleteModal: (category) => {
    set({
      selectedCategory: category,
      showDeleteModal: true,
      error: null,
    });
  },

  closeModals: () => {
    set({
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      selectedCategory: null,
    });
    get().resetForm();
  },

  setFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  },

  handleImageUpload: async (file) => {
    set({ isUploading: true });

    const reader = new FileReader();
    reader.onloadend = () => {
      set({ selectedImage: reader.result });
    };
    reader.readAsDataURL(file);

    set({ imageFile: file, isUploading: false });
  },

  removeImage: () => {
    set({ selectedImage: null, imageFile: null });
  },

  resetForm: () => {
    set({
      formData: {
        name: "",
        description: "",
        status: "active",
      },
      selectedImage: null,
      imageFile: null,
      selectedCategory: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),

  getFilteredCategories: () => {
    const { categories, searchTerm } = get();

    if (!searchTerm.trim()) return categories;

    const term = searchTerm.toLowerCase();
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(term) ||
        cat.description.toLowerCase().includes(term),
    );
  },
}));
