import React from "react";
import { cls } from "@libs/client/utils";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../public/logo.png";
import { useRouter } from "next/dist/client/router";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  alarmBtnDisable?: boolean;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  const backgroundColorFAFAFA = ["/profile", "/farecheck", "/car", "/farepay"];

  return (
    <div
      className={cls(
        "h-screen",
        backgroundColorFAFAFA.includes(router.pathname) ? "bg-[#FAFAFA]" : "",
        router.pathname === "/" ? "bg-[#F8F8F8]" : ""
      )}
    >
      {/* Header */}
      <div
        className={
          "z-10 bg-white w-full h-12 max-w-[390px] text-lg px-10 font-medium fixed text-white border-b-2 tp-0 flex items-center"
        }
      >
        <Link href={"/"} className={"absolute left-4"}>
          <Image
            src={logoImage}
            width={50}
            // height={20}
            alt={"소고기"}
          ></Image>
        </Link>

        <span className={"mx-2 text-xl font-bold text-black"}>{title}</span>
        {/* title이 뭐임?? 아무것도 안받아오는데 */}

        <Link className={"absolute right-3"} href={"/notification/"}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 26 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.4736 20.9922L22.6518 15.7732V10.3393C22.6518 4.91389 18.246 0.5 12.8305 0.5C7.41493 0.5 3.00907 4.91389 3.00907 10.3393V15.7732L0.18723 20.9921C0.0592621 21.2288 -0.00514456 21.4947 0.000321028 21.7638C0.00578662 22.0328 0.0809369 22.2959 0.218408 22.5271C0.355879 22.7584 0.550956 22.9498 0.784523 23.0828C1.01809 23.2158 1.28214 23.2857 1.55079 23.2857H7.16804C7.15266 23.4563 7.14433 23.6288 7.14433 23.8036C7.14433 25.3144 7.74339 26.7633 8.80974 27.8316C9.87608 28.8998 11.3224 29.5 12.8304 29.5C14.3384 29.5 15.7847 28.8998 16.8511 27.8316C17.9174 26.7633 18.5165 25.3144 18.5165 23.8036C18.5165 23.6288 18.5081 23.4563 18.4927 23.2857H24.11C24.3786 23.2857 24.6426 23.2157 24.8762 23.0828C25.1097 22.9498 25.3047 22.7583 25.4422 22.5271C25.5796 22.2958 25.6548 22.0328 25.6602 21.7637C25.6657 21.4947 25.6013 21.2288 25.4734 20.9922H25.4736ZM16.4489 23.8036C16.4493 24.3017 16.3472 24.7946 16.149 25.2515C15.9508 25.7084 15.6607 26.1194 15.2968 26.459C14.933 26.7985 14.5032 27.0593 14.0342 27.225C13.5653 27.3908 13.0673 27.4579 12.5713 27.4222C12.0753 27.3865 11.592 27.2488 11.1515 27.0177C10.711 26.7865 10.3228 26.4669 10.0111 26.0788C9.69945 25.6906 9.47096 25.2423 9.33993 24.7617C9.20891 24.2812 9.17815 23.7787 9.24959 23.2857H16.4113C16.4361 23.4572 16.4487 23.6303 16.4489 23.8036ZM2.41862 21.2143L5.07673 16.2982V10.3393C5.07673 8.27912 5.89364 6.30334 7.34775 4.84658C8.80185 3.38983 10.774 2.57143 12.8305 2.57143C14.8869 2.57143 16.8591 3.38983 18.3132 4.84658C19.7673 6.30334 20.5842 8.27912 20.5842 10.3393V16.2982L23.2422 21.2143H2.41862Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>

      {/* 본문 */}
      <div className={"pt-12"}>{children}</div>
    </div>
  );
}
