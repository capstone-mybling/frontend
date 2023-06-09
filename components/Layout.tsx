import React from "react";
import BottomNavBar from "./BottomNavBar";
import ResponsiveAppBar from "@components/AppTopBar";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  disableFooter?: boolean;
  children: React.ReactNode;
}

export default function Layout({ children, disableFooter }: LayoutProps) {
  return (
    <>
      <header className="sticky top-0 bg-white z-10">
        <ResponsiveAppBar />
      </header>
      {/* 본문 */}
      <main className="flex-1">{children}</main>
      {!disableFooter && (
        <footer className="sticky bottom-0 bg-white z-10 border-b">
          <BottomNavBar />
        </footer>
      )}
    </>
  );
}
