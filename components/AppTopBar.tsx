import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "@public/logo.png";
import { cls } from "@/libs/client/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UserAvatar from "./UserAvatar";
import useWeb3 from "@/hooks/useWeb3";

interface SearchForm {
  username: string;
}
type User = {
  username: string;
  address: string;
  avatar: string;
  isFollowing: boolean;
};
interface SearchResponse {
  success: boolean;
  data: User[];
}

function ResponsiveAppBar() {
  const router = useRouter();
  const { account } = useWeb3();
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const { register, reset, handleSubmit } = useForm<SearchForm>();

  const Onclick = async () => {
    await router.push("/");
  };

  const handleSearchBar = () => {
    setSearchBar(!searchBar);
    if (!searchBar) reset();
  };

  const onSubmit = async (data: SearchForm) => {
    console.log(data.username);
    mutate(data);
    console.log(searchData);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: SearchForm) => {
      return axios.get(`/api/users/search/${data.username}`);
    },
    onSuccess: (newSearchResponse) => {
      setSearchData(newSearchResponse.data);
    },
  });

  const showSearchResult = () => {
    if (!searchData) return;
    return searchData.data.map((user) => {
      <UserAvatar
        UserAddr={user.address}
        UserName={user.username}
        UserImage={user.avatar}
        size="medium"
        isMine={account === user.address}
      />;
    });
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
            <form
              className="w-full"
              onSubmit={handleSubmit(onSubmit)}
              onChange={handleSubmit(onSubmit)}
            >
              <input
                className={cls(
                  "transition-all glow inset-0 bg-slate-100 duration-500 rounded-3xl flex w-full mx-2 h-10 justify-stretch px-2 outline-none focus:outline-[#333399] focus:outline-2",
                  searchBar
                    ? "translate-x-0 opacity-100"
                    : "opacity-0 -translate-y-full pointer-events-none"
                )}
                {...register("username", { required: true, maxLength: 25 })}
              ></input>
            </form>
            {/* 검색 버튼 */}
            <div className="flex items-center justify-between">
              <IconButton
                size="large"
                onClick={handleSearchBar}
                color="inherit"
              >
                <SearchIcon />
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
        <div className="flex-cols-1 items-center justify-center mt-5 mx-4 h-screen space-y-3">
          {isLoading ? (
            <h1>loading</h1>
          ) : (
            !searchData ||
            (searchData.data.length > 0 &&
              searchData.data.map((user) => (
                <UserAvatar
                  key={user.address}
                  UserAddr={user.address}
                  UserName={user.username}
                  UserImage={user.avatar}
                  size="medium"
                  isMine={account === user.address}
                />
              )))
          )}
        </div>
      </div>
    </>
  );
}

export default ResponsiveAppBar;
