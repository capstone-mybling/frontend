import { useState, useEffect } from "react";
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
import { cls } from "@/libs/client/utils";
import detectEthereumProvider from "@metamask/detect-provider";

function ResponsiveAppBar() {
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const handleSearchBar = () => {
    setSearchBar(!searchBar);
    if (!searchBar) setSearchText("");
  };
  const [menuBar, setMenuBar] = useState<boolean>(false);
  const handleMenuBar = () => {
    setMenuBar(!menuBar);
    console.log(menuBar);
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

  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    async function detectProvider() {
      const provider = await detectEthereumProvider();
      if (provider) {
        setProvider(provider);
      } else {
        console.error("브라우저 확장 어플리케이션에 메타마스크를 추가해주시기 바랍니다.");
      }
    }
    detectProvider();
  }, []);

  async function getAccount() {
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    console.log(accounts);
  }

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
      <div
        className={cls(
          "fixed inset-0 mx-auto top-16 bg-white transition-all duration-500 transform z-10 w-[500px]",
          menuBar
            ? "translate-y-0 bg-opacity-70"
            : " -translate-y-1/3 bg-opacity-0 pointer-events-none"
        )}
      >
        <div className="flex-cols-1 items-center justify-center mx-auto">
          <div className="w-full bg-white h-16 shadow-[0_3px_20px_-10px_rgba(0,0,0,0.25)] grid grid-cols-1">
            {/* 지갑 연결 버튼  : 연결 성공시, 콘솔창에 자신의 지갑 Address가 출력 됨.*/}
            {/* TODO: 연결된 지갑의 정보 보여주기 */}
            <div
              className="flex bg-sky-400 w-auto h-14 items-center mx-auto my-3 px-10 space-x-7 rounded-full hover:cursor-pointer"
              onClick={getAccount}
            >
              <MetaMask></MetaMask>
              <button className=" text-center text-xl font-semibold text-amber-600">
                Connect wallet
              </button>
            </div>
            <button onClick={handleMenuBar}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResponsiveAppBar;
