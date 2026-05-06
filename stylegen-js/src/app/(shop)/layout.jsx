import CartDrawer from "@/components/cart/CartDrawer";

export default function ShopLayout({
  children,
}) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}
