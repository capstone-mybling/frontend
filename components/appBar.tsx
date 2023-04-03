import * as React from "react";
import Image from "next/image";
import Router from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../public/logo.png";

const pages = ["메뉴내용1", "메뉴내용2", "메뉴내용3"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElSearchr, setAnchorElSearch] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenSearchBar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSearch(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseSearchBar = () => {
    setAnchorElSearch(null);
  };

  const Onclick = () => {
    Router.push("");
  };

  return (
    <AppBar
      position="static"
      color="inherit"
    >
      <Container>
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
              onClick={handleOpenSearchBar}
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
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* 메뉴 내용물 */}
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
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
