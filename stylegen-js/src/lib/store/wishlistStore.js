import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const exists = state.items.find(
            (i) => i.productId === item.productId,
          );
          if (exists) {
            toast("Already in wishlist");
            return state;
          }
          toast.success("Added to wishlist");
          return { items: [...state.items, item] };
        }),
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      clear: () => set({ items: [] }),
      getCount: () => get().items.length,
    }),
    { name: "wishlist-storage" },
  ),
);
