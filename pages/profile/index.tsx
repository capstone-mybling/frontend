import Layout from "@/components/Layout";
import Thumbnail from "@/components/Thumbnail";
import UserAvatar from "@components/UserAvatar";
import { ChangeEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import FollowerModal from "@/components/FollowerModal";
import FollowingModal from "@/components/FollowingModal";
import { User, Post } from "@libs/client/types";
import MypageLoading from "@/components/MypageLoading";
import { useForm, FieldErrors } from "react-hook-form";
import Image from "next/image";
import { cls } from "@/libs/client/utils";

interface UserWithFollow extends User {
  followings: string[];
  followers: string[];
}

enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  METADATA = "metadata",
}
interface UploadForm {
  image: File;
  name: string;
  description: string;
  fileType: FileType;
}

export default function MyPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserWithFollow>({
    id: 0,
    address: "",
    username: "",
    avatar: "",
    description: "",
    lastLoginIP: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    followers: [],
    followings: [],
  });
  const [tabValue, setTabValue] = useState("1");
  const [userPost, setUserPost] = useState<Post[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("프로필 편집");
  const [uploadImg, setUploadImg] = useState<File | null>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useForm<UploadForm>({ mode: "onChange" });

  // image 업로드 시 동작하는 함수
  const uploadNewImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    console.log(files);
    if (files && files.length > 0) {
      setUploadImg(files.item(0));
      setValue("image", files.item(0)!);
    }
  };
  // console.log(uploadImg);

  useEffect(() => {
    axios
      .get("api/users/me")
      .then((response) => {
        setUserData(response.data.data);
        setUserPost(response.data.data.posts.reverse());
        // console.log(response.data.data);
        // console.log(userData.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      // console.log("로딩 끝, 받아온 데이터 = ", userData);
    }
  }, [userData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const handleProfileEdit = () => {
    setEdit(!edit);
    setEditTitle("저장하기");
  };
  const handleProfileEditSave = () => {
    setEdit(!edit);
    setEditTitle("프로필 편집");
  };

  const resetForm = () => {
    reset();
    setUploadImg(null);
  };
  const onNotValid = (errors: FieldErrors) => console.log(errors);
  const onValid = async (data: UploadForm) => {
    const { name, description } = data;
    const form = new FormData();
    form.append("image", data.image);
    form.append("name", name);
    form.append("description", description);

    axios.fetch("api/users");

    resetForm();
    handleProfileEditSave();
  };

  return isLoading ? (
    <MypageLoading />
  ) : (
    <Layout>
      <section className="flex flex-col justify-center items-center pt-4 pb-12 border-b border-neutral-300 px-6">
        {/* 프로필 편집 누르면 나타나는 화면 */}
        {edit ? (
          <>
            <form
              onSubmit={handleSubmit(onValid, onNotValid)}
              className="px-5 grid-cols-1 grid w-full mx-auto space-y-4 my-2"
            >
              <div className="flex flex-row justify-end w-full">
                <input
                  placeholder={editTitle}
                  className={cls(
                    isValid ? "cursor-pointer" : "cursor-pointer",
                    " rounded-2xl text-violet-500 font-extrabold"
                  )}
                  type="submit"
                />
              </div>
              {/* 프로필사진 변경 업로드 전/후 */}
              {!uploadImg ? (
                <div>
                  <input
                    {...register("image")}
                    className="hidden"
                    name="input"
                    id="input-upload"
                    type="file"
                    accept="image/*"
                    onChange={uploadNewImg}
                  />
                  <label
                    htmlFor="input-upload"
                    className="w-[100px] h-[100px] flex flex-col mx-auto justify-center text-center border-2 border-violet-200 rounded-full py-4"
                  >
                    <span className="text-violet-500 hover:cursor-pointer">
                      click for edit
                    </span>
                  </label>
                </div>
              ) : (
                <div className="relative mx-auto w-[100px] aspect-square rounded-full">
                  <Image
                    className="object-contain"
                    src={URL.createObjectURL(uploadImg)}
                    alt="local file"
                    fill
                  />
                </div>
              )}
              <div className="mx-auto">
                <input
                  {...register("name", { required: true })}
                  className="border-2 border-violet-200 rounded-xl"
                  id="input-name"
                  type="text"
                  placeholder="edit your name"
                />
              </div>
              <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl ">
                <FollowerModal userFollower={userData?.followers} />
                <FollowingModal userFollowing={userData?.followings} />
              </div>
              <div className="text-gray-500">
                <div className="py-4 font-extrabold">About</div>
                <input
                  {...register("description", { required: true })}
                  type="text"
                  placeholder="edit your description"
                  className="w-full border-2 border-violet-200 rounded-xl"
                ></input>
              </div>
            </form>
          </>
        ) : (
          // 프로필 편집 누르기 전 (default상태)
          <div className="px-5 grid-cols-1 grid w-full mx-auto space-y-4 my-2">
            <div className="flex flex-row justify-end w-full py-2">
              <button
                onClick={handleProfileEdit}
                className="opacity-30 rounded-2xl text-violet-500 hover:opacity-70 font-extrabold"
              >
                {editTitle}
              </button>
            </div>
            <UserAvatar
              size="Xlarge"
              UserImage={userData?.avatar || ""}
              UserName={userData?.username || ""}
              UserAddr={userData?.address || ""}
              route={false}
            />
            <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl ">
              <FollowerModal userFollower={userData?.followers} />
              <FollowingModal userFollowing={userData?.followings} />
            </div>
            <div className="text-gray-500">
              <div className="py-4 font-extrabold">About</div>
              <p>{userData?.description}</p>
            </div>
          </div>
        )}
        <div className="w-full">
          <Box sx={{ width: "100%", typography: "body1", marginTop: 2 }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab label="내가만든NFT" value="1" />
                  <Tab label="구매한NFT" value="2" />
                </Tabs>
              </Box>
              <TabPanel value="1" sx={{ paddingTop: 3, paddingX: 0 }}>
                <div className="grid grid-cols-3 gap-1">
                  {userPost.map((post) => (
                    <li key={post.id} className="list-none">
                      <Thumbnail
                        thumbnail={post.thumbnail}
                        address={post.address}
                        option="Thumnail"
                        link={post.address}
                      />
                    </li>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value="2" sx={{ paddingTop: 3, paddingX: 0 }}>
                <div className="grid grid-cols-3 gap-4">
                  <Thumbnail
                    thumbnail={userData?.avatar}
                    address={`posts/${2}`}
                    option="Thumnail"
                    link={userData?.address}
                  />
                  <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-sm hover:cursor-pointer">
                    test
                  </div>
                  <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-sm hover:cursor-pointer">
                    test
                  </div>
                  <div className="flex items-center justify-center aspect-square bg-gray-300 rounded-sm hover:cursor-pointer">
                    test
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </section>
    </Layout>
  );
}
