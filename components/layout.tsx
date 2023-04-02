import React from "react";
import ResponsiveAppBar from "./appBar";
import { useRouter } from "next/dist/client/router";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  alarmBtnDisable?: boolean;
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <ResponsiveAppBar />
      {/* 본문 */}
      <div className={"pt-12"}>{children}</div>
    </div>
  );
}
