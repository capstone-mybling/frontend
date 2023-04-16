import React from "react";
import ResponsiveAppBar from "./AppTopBar";
import { useRouter } from "next/dist/client/router";
import BottomNavBar from "./BottomNavBar";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  alarmBtnDisable?: boolean;
  isFooterVisible?: boolean;
  children: React.ReactNode;
}

export default function Layout({ children, isFooterVisible = true }: LayoutProps) {
  return (
    <>
      <ResponsiveAppBar />
      {/* 본문 */}
      <main className={"pt-16"}>{children}</main>
      <footer className="sticky bottom-0 bg-white z-10 border-b">
        {isFooterVisible && <BottomNavBar />}
      </footer>
    </>
  );
}
