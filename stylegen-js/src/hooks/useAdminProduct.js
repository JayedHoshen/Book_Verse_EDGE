import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAdminProductFormStore } from "@/lib/store/adminProductStore";
import toast from "react-hot-toast";


export function useAdminProduct({ mode, productId }) {
  const router = useRouter();
  const store = useAdminProductFormStore();

  // Initialize store with mode and load data
  useEffect(() => {
    store.setMode(mode, productId);
    store.loadCategories();

    if (mode === "edit" && productId) {
      store.fetchProduct(productId);
    }
  }, [mode, productId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      store.resetForm();
    };
  }, []);

  // Image upload handler
  const handleImageUpload = useCallback(
    async (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      try {
        await store.addImages(files);
      } catch (error) {
        toast.error(error.message);
      }

      // Reset input so same file can be re-uploaded
      e.target.value = "";
    },
    [store],
  );

  // Remove image handler
  const handleRemoveImage = useCallback(
    (index) => {
      store.removeImage(index);
    },
    [store],
  );

  // Submit handler
  const handleSubmit = useCallback(
    async (data) => {
      // Validate before submit
      const isValid = await store.validateBeforeSubmit(data);
      if (!isValid) {
        toast.error(store.error || "Validation failed");
        return;
      }

      try {
        if (mode === "create") {
          const newProductId = await store.saveProduct(data);
          toast.success("Product created successfully!");
          router.push(`/admin/products/${newProductId}`);
        } else {
          await store.saveProduct(data);
          toast.success("Product updated successfully!");
          router.push(`/admin/products/${productId}`);
        }
      } catch (error) {
        toast.error(error.message || "Failed to save product");
      }
    },
    [mode, productId, store, router],
  );

  // Toggle preview (create mode only)
  const handleTogglePreview = useCallback(() => {
    if (mode === "create") {
      store.setPreviewMode(!store.previewMode);
    }
  }, [mode, store]);

  // Return unified interface
  return {
    // Mode
    mode,

    // Common state
    images: store.images,
    categories: store.categories,
    isSubmitting: store.isSubmitting,
    isUploading: store.isUploading,
    error: store.error,

    // Create mode specific
    ...(mode === "create" && {
      previewMode: store.previewMode,
      handleTogglePreview,
    }),

    // Edit mode specific
    ...(mode === "edit" && {
      product: store.productDetails,
      isLoading: store.isLoading,
      activeTab: store.activeTab,
      productStatus: store.productStatus,
      featured: store.featured,
      seoTitle: store.seoTitle,
      metaDescription: store.metaDescription,
      tags: store.tags,
      setActiveTab: store.setActiveTab,
      setProductStatus: store.setProductStatus,
      setFeatured: store.setFeatured,
      setSeoTitle: store.setSeoTitle,
      setMetaDescription: store.setMetaDescription,
      setTags: store.setTags,
    }),

    // Common actions
    handleSubmit,
    handleImageUpload,
    handleRemoveImage,
    clearError: store.clearError,
    resetForm: store.resetForm,
  };
}
