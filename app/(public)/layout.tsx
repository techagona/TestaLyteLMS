import React, { ReactNode } from "react";
import Navbar from "./_components/Navbar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </div>
  );
}
