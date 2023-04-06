import React from "react";
import ResponsiveAppBar from "./appTopBar";
import BottomNav from "./appBottomBar";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  alarmBtnDisable?: boolean;
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <ResponsiveAppBar />
      {/* 본문 */}
      <div className={"pt-12"}>{children}</div>
      <BottomNav />
    </>
  );
}
