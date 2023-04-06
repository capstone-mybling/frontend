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
    // console.log(searchBar);
  };
  const [menuBar, setMenuBar] = useState<boolean>(false);
  const handleMenuBar = () => {
    setMenuBar(!menuBar);
    console.log(menuBar);
  };

  const Onclick = () => {
    Router.push("/");
  };

  return (
    <AppBar
      color="inherit"
      className="float inset-x-0 mx-auto w-full h-15 shadow-[0_3px_20px_-10px_rgba(0,0,0,0.25)] max-w-[390px] z-20"
    >
      {/* 검색 바 */}
      <div
        className={cls(
          "fixed inset-0 mx-auto bg-white transition-all duration-500 transform z-30 max-w-[390px]",
          searchBar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-center h-full">
          <div className="p-8 bg-gray-100 rounded-lg">
            <p>Search Bar Content</p>
            <button onClick={handleSearchBar}>Close</button>
          </div>
        </div>
      </div>
      <Container className="pr-3 pl-3">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between" }}
        >
          {/* 로고버튼 */}
          <Box>
            <Image
              src={Logo}
              alt="mybling"
              width={50}
              onClick={Onclick}
            />
          </Box>
          {/* 검색 버튼 */}
          <Box>
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
              // onClick={}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* 메뉴 내용물
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
