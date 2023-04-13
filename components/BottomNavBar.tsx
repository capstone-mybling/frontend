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
    href: "/mypage",
    icon: <UserIcon />,
    clickedIcon: <UserFillIcon />,
  },
];

export default function BottomNavBar() {
  const pathName = usePathname(); //현재 경로를 받아와줌 -> 3항연산자에 활용
  return (
    <nav className="border-t-[3px] border-slate-100">
      <ul className="flex gap-4 items-center p-4 justify-around">
        {menu.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{pathName === item.href ? item.clickedIcon : item.icon}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
