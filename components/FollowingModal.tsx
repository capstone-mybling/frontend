import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserAvatar from "./UserAvatar";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "@/hooks/useWeb3";

interface Props {
  userFollowing: string[];
  delBtn?: boolean;
}

export default function FollowingModal({
  userFollowing,
  delBtn = true,
}: Props) {
  const { account } = useWeb3();
  // console.log("팔로잉목록 = ", userFollowing);
  const [isModal, setIsModal] = useState(false);
  const handleModalOpen = () => setIsModal(true);
  const handleModalClose = () => setIsModal(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 12,
    p: 2,
  };
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (delAddr: string) => axios.delete(`api/users/follows/${delAddr}`),
    {
      onSuccess: async () => {
        console.log("following 삭제 성공!");
        await queryClient.invalidateQueries(["users", "me"]);
      },
    }
  );

  const handleDeleteFollower = (delAddr: string) => {
    deleteMutation.mutate(delAddr);
    // axios
    //   .delete(`api/users/follows/${delAddr}`)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
    console.log("addr = ", delAddr);
  };

  return (
    <>
      <button onClick={handleModalOpen}>
        <span className="mr-2 font-bold">{userFollowing.length}</span>
        <span className="font-semibold text-gray-400">Followings</span>
      </button>
      {isModal && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full">
          <div className="w-full h-full bg-black opacity-50"></div>
          <div className="absolute max-w-[400px] w-[80%] h-[300px] bg-white shadow-lg border p-4 flex flex-col overflow-auto">
            <h1 className="text-center text-xl font-black pb-4">
              Following
              <button
                className="text-right absolute right-5"
                onClick={handleModalClose}
              >
                X
              </button>
            </h1>
            <hr className="py-2" />
            <div className="overflow-auto">
              {userFollowing.map((following: any) => {
                if (following) {
                  return (
                    <li key={following.address} className="list-none mb-3">
                      <div className="flex justify-between">
                        <UserAvatar
                          size="small"
                          UserImage={following.avatar}
                          UserName={following.username}
                          UserAddr={following.address}
                          isMine={account === following.address}
                        />
                        {delBtn ? (
                          <button
                            className="px-4 py-2 bg-gray-200 rounded-xl font-extrabold hover:text-violet-500"
                            onClick={(e) => {
                              handleDeleteFollower(following.address);
                            }}
                          >
                            삭제
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </li>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
