import HomeIcon from "./icons/HomeIcon";
import HomeFillIcon from "./icons/HomeFillIcon";
import UploadIcon from "./icons/UploadIcon";
import UploadFillIcon from "./icons/UploadFillIcon.tsx";
import GridIcon from "./icons/GridIcon";
import GridFillIcon from "./icons/GridFillIcon";
import UserIcon from "./icons/UserIcon";
import UserFillIcon from "./icons/UserFillIcon";

import { usePathname } from "next/navigation";
import Link from "next/link";
import useWeb3 from "@/hooks/useWeb3";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: "/explore",
    icon: <GridIcon />,
    clickedIcon: <GridFillIcon />,
  },
  {
    href: "/upload",
    icon: <UploadIcon />,
    clickedIcon: <UploadFillIcon />,
  },
  {
    href: "/profile",
    icon: <UserIcon />,
    clickedIcon: <UserFillIcon />,
  },
];

export default function BottomNavBar() {
  const pathName = usePathname(); //현재 경로를 받아와줌 -> 3항연산자에 활용
  const { isLogin } = useWeb3();
  const { data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () =>
      axios.get("/api/users/me").then((response) => response.data.data),
  });
  // console.log(data);

  return (
    <nav className="border-t-[3px] border-slate-100">
      <ul className="flex gap-4 items-center p-4 justify-around">
        {menu.map((item) => {
          if (item.href === "/profile" && isLogin) {
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <Image
                    className="aspect-square rounded-full border-[1px] border-gray-300 z-50"
                    src={data?.avatar}
                    alt="프로필 이미지"
                    width={32}
                    height={32}
                  />
                </Link>
              </li>
            );
          }
          return (
            <li key={item.href}>
              <Link href={item.href}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
