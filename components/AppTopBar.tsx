import { useEffect, useState } from "react";
import Image from "next/image";
import Router from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "@public/logo.png";
import MetaMask from "@public/metamask.svg";
import Copyright from "@public/copyright.svg";
import { cls } from "@/libs/client/utils";
import axios, { AxiosResponse } from "axios";
import useWeb3 from "@/hooks/useWeb3";
import EtherIcon from "@public/etherium_icon.svg";
import Backdrop from "@mui/material/Backdrop";
import { User } from "@prisma/client";
import login from "@/pages/api/users/login";

interface UserResponse extends User {
  followings: number[];
  followers: number[];
}

function ResponsiveAppBar() {
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const handleSearchBar = () => {
    setMenuBar(false);
    setSearchBar(!searchBar);
    if (!searchBar) setSearchText("");
  };
  const [menuBar, setMenuBar] = useState<boolean>(false);
  const handleMenuBar = () => {
    setSearchBar(false);
    setMenuBar(!menuBar);
  };
  const [searchText, setSearchText] = useState<string>("");
  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(searchText);
    }
  };
  const Onclick = () => {
    Router.push("/");
  };
  const [logined, setLogined] = useState<boolean>();
  const { isConnected, balance, account, network } = useWeb3();
  // getAccount()를 통해 서버에 유저정보가 담기면 그걸 다시 긁어오는 코드
  const handleLogin = () => {
    axios
      .post("api/users/login", {
        address: `"${account}"`,
      })
      .then((res) => {
        console.log("로그인이 정상적으로 처리되었습니다.");
        setLogined(true);
      })
      .catch((e) => {
        if (e.response.status == 400) {
          alert("이미 로그인 되어있습니다.");
        } else console.log(e);
      });
  };
  const [user, setUser] = useState<UserResponse>();
  useEffect(() => {
    if (logined) {
      axios
        .get("api/users/me")
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((e) => console.log(e));
    }
  }, [logined]);

  return (
    <>
      <AppBar
        color="inherit"
        className="w-[500px] inset-x-0 mx-auto shadow drop-shadow-[0_10px_3px_-2px_rgba(100,100,100,0.25)] h-16 z-20 justify-center"
      >
        <Container className="pr-3 pl-3">
          <Toolbar
            disableGutters
            className="flex justify-between"
          >
            {/* 로고버튼 */}
            <Box>
              <Image
                className="flex-none hover:cursor-pointer mr-6 pr-3"
                src={Logo}
                alt="mybling"
                onClick={Onclick}
                width={70}
              />
            </Box>
            {/* 검색 바 */}
            <input
              className={cls(
                "transition-all glow inset-0 bg-slate-100 duration-500 rounded-3xl flex w-full mx-2 h-10 justify-stretch px-2 outline-none focus:outline-[#333399] focus:outline-2",
                searchBar
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-y-full pointer-events-none"
              )}
              onChange={handleSearchText}
              value={searchText}
              onKeyDown={handleInputKeyDown}
            ></input>
            {/* 검색 버튼 */}
            <div className="flex items-center justify-between">
              <IconButton
                size="large"
                aria-label="search-bar"
                aria-controls="search-appbar"
                aria-haspopup="true"
                onClick={handleSearchBar}
                color="inherit"
              >
                <SearchIcon />
              </IconButton>

              {/* 메뉴버튼 */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuBar}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {/* 검색 박스 */}
      <div
        className={cls(
          "fixed inset-0 top-14 mx-auto bg-white transition-all duration-500 transform z-10 w-[500px]",
          searchBar
            ? "translate-y-0 bg-opacity-70"
            : "-translate-y-full bg-opacity-0 pointer-events-none"
        )}
      >
        <div className="flex-cols-1 items-center justify-center">
          <div className="w-full bg-white h-15 shadow-[0_3px_20px_-10px_rgba(0,0,0,0.25)]">1</div>
          <button onClick={handleSearchBar}>Close</button>
        </div>
      </div>
      {/* 메뉴 박스 */}
      <Backdrop
        sx={{ color: "#ffffff", zIndex: 10 }}
        open={menuBar}
        onClick={() => setMenuBar(false)}
      >
        <div
          className={cls(
            "fixed inset-0 mx-auto top-16 transition-all duration-500 transform z-20 w-[500px]",
            menuBar ? "translate-y-0 " : " -translate-y-1/2 pointer-events-none"
          )}
        >
          <div className="flex-cols-1 items-center justify-center mx-auto z-20">
            <div className="w-full bg-white h-full shadow-[0_3px_20px_-10px_rgba(0,0,0,0.25)] grid grid-cols-1">
              {/* 지갑 연결 버튼  : 연결 성공시, 콘솔창에 자신의 지갑 Address가 출력 됨.*/}
              {/* TODO: 연결된 지갑의 정보 보여주기 */}
              {!logined ? (
                <div
                  className="flex bg-sky-400 w-auto h-14 items-center mx-auto my-8 mt-10 px-10 space-x-7 rounded-full hover:cursor-pointer text-amber-600 transition-colors hover:text-amber-50 hover:bg-sky-600 shadow-md duration-500"
                  onClick={handleLogin}
                >
                  <MetaMask></MetaMask>
                  <button className=" text-center text-xl font-semibold ">Connect wallet</button>
                </div>
              ) : (
                <div className=" flex-1 text-center align-middle my-10">
                  <p className=" font-extrabold font-sans text-sm text-orange-500">
                    블록체인 NET : {isConnected ? "connnected" : "disconnected"}
                  </p>
                  <p className=" font-extrabold font-sans text-sm text-orange-500">
                    최근 접속 IP : {user?.lastLoginIP}
                  </p>
                  <p className=" font-extrabold font-sans text-sm text-orange-500">
                    이름 : {user?.username == null ? "미지정" : user.username}
                  </p>
                  <p className=" font-extrabold font-sans text-sm text-orange-500">
                    지갑 주소 : {user?.address}
                  </p>
                  <p className=" font-extrabold font-sans text-sm text-orange-500">
                    이더리움 : {balance.toFixed(5)} GoerliETH
                  </p>
                </div>
              )}
              <div className="flex justify-center py-4 bg-slate-200 border-t-[1px] border-gray-300 shadow-md">
                <Copyright />
              </div>
            </div>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default ResponsiveAppBar;
