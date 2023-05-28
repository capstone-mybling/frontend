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
      <ResponsiveAppBar />
      {/* 본문 */}
      <main className={"pt-16"}>{children}</main>
      {!disableFooter && (
        <footer className="sticky bottom-0 bg-white z-10 border-b">
          <BottomNavBar />
        </footer>
      )}
    </>
  );
}
