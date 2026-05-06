import React from "react";
import UserLayout from "@/components/layout/UserLayout";
export default function UserRootLayout({
  children,
}) {
  return <UserLayout>{children}</UserLayout>;
}
