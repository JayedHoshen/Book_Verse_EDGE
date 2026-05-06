import AdminLayout from "@/components/layout/AdminLayout";

export const metadata = {
  title: "Admin Dashboard - StyleGen",
  description: "StyleGen admin dashboard for artisan managers",
};

export default function AdminRootLayout({
  children,
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
