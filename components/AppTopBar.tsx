import { useState } from "react";
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
import { cls } from "@/libs/client/utils";

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
          "fixed inset-0 mx-auto top-14 bg-white transition-all duration-500 transform z-10 w-[500px]",
          menuBar
            ? "translate-y-0 bg-opacity-70"
            : "-translate-y-full bg-opacity-0 pointer-events-none"
        )}
      >
        <div className="flex-cols-1 items-center justify-center">
          <div className="w-full my-auto bg-white h-15 shadow-[0_3px_20px_-10px_rgba(0,0,0,0.25)]">
            menu contents
          </div>
          <button onClick={handleMenuBar}>Close</button>
        </div>
      </div>
    </>
  );
}
export default ResponsiveAppBar;