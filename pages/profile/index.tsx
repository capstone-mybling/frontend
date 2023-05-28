import Layout from "@/components/Layout";
import Thumbnail from "@/components/Thumbnail";
import UserAvatar from "@components/UserAvatar";
import { ChangeEvent, Fragment, useState } from "react";
import axios from "axios";
import FollowerModal from "@/components/FollowerModal";
import FollowingModal from "@/components/FollowingModal";
import { User } from "@libs/client/types";
import MypageLoading from "@/components/MypageLoading";
import { FieldErrors, useForm } from "react-hook-form";
import Image from "next/image";
import { cls } from "@/libs/client/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface UserWithFollow extends User {
  followings: string[];
  followers: string[];
  posts: any[];
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
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery<UserWithFollow>({
    queryKey: ["users", "me"],
    queryFn: () =>
      axios.get("api/users/me").then((response) => response.data.data),
  });

  const [edit, setEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("프로필 편집");
  const [uploadImg, setUploadImg] = useState<File | null>();
  const [activeTab, setActiveTab] = useState(1);

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
    if (files && files.length > 0) {
      setUploadImg(files.item(0));
      setValue("image", files.item(0)!);
    }
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

  const editProfileMutation = useMutation(
    (formData: FormData) => axios.patch("api/users/me", formData),
    {
      onSuccess: () => {
        console.log("프로필변경 성공!");
        queryClient.invalidateQueries(["users", "me"]);
      },
    }
  );

  const onNotValid = (errors: FieldErrors) => console.log(errors);
  const onValid = async (data: UploadForm) => {
    const { name, description } = data;
    const form = new FormData();
    form.append("avatar", data.image);
    form.append("username", name);
    form.append("description", description);

    await editProfileMutation.mutateAsync(form);

    resetForm();
    handleProfileEditSave();
  };

  const customTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return isLoading || data == undefined ? (
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
                  value="저장하기"
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
                  className="border-2 border-violet-200 rounded-xl w-full"
                  id="input-name"
                  type="text"
                  placeholder="edit your name"
                  defaultValue={data.username!}
                />
              </div>
              <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl ">
                <FollowerModal userFollower={data?.followers} />
                <FollowingModal userFollowing={data?.followings} />
              </div>
              <div className="text-gray-500">
                <div className="py-4 font-extrabold">About</div>
                <input
                  {...register("description", { required: true })}
                  type="text"
                  placeholder="edit your description"
                  className="w-full border-2 border-violet-200 rounded-xl"
                  defaultValue={data.description!}
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
              size="XLarge"
              UserImage={data?.avatar || ""}
              UserName={data?.username || ""}
              UserAddr={data?.address || ""}
              isMine={true}
            />
            <div className="w-2/3 flex gap-6 justify-around my-6 mx-auto px-10 py-2 rounded-xl ">
              <FollowerModal userFollower={data?.followers} />
              <FollowingModal userFollowing={data?.followings} />
            </div>
            <div className="text-gray-500">
              <div className="py-4 font-extrabold">About</div>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col">
          <div className="mx-auto my-5">
            <button
              className={`px-4 py-2 ${
                activeTab === 1 ? "text-violet-500" : "text-violet-300"
              }`}
              onClick={() => customTabChange(1)}
            >
              생성한 NFT
              <p
                className={`${
                  activeTab === 1
                    ? "mt-1 mx-auto border-b w-2 h-2 rounded-full bg-violet-500"
                    : ""
                }`}
              ></p>
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === 2 ? "text-violet-500" : "text-violet-300"
              }`}
              onClick={() => customTabChange(2)}
            >
              소유한 NFT
              <p
                className={`${
                  activeTab === 2
                    ? "mt-1 mx-auto border-b w-2 h-2 rounded-full bg-violet-500"
                    : ""
                }`}
              ></p>
            </button>
          </div>
          {activeTab === 1 && (
            <div>
              {data.posts.length === 0 ? (
                <div className="text-center font-extrabold text-gray-400 mx-auto mt-10">
                  <h1 className="text-2xl">생성한 NFT가 없습니다</h1>
                  <p className="mt-6 underline ">
                    <Link href={"/upload"}>NFT 생성하러가기</Link>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {data.posts
                    .slice(0)
                    .reverse()
                    .map((post) => (
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
              )}
            </div>
          )}
          {activeTab === 2 && (
            <div>
              {data.ownedPosts.length === 0 ? (
                <div className="text-center font-extrabold text-gray-400 mx-auto mt-10">
                  <h1 className="text-2xl">소유한 NFT가 없습니다</h1>
                  <p className="mt-6 underline ">
                    <Link href={"/explore"}>NFT 둘러보기</Link>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {data.ownedPosts
                    .slice(0)
                    .reverse()
                    .map((post) => (
                      <li key={post.id} className="list-none">
                        <Thumbnail
                          thumbnail={post.thumnail}
                          address={post.address}
                          option="Thumnail"
                          link={post.address}
                        />
                      </li>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
