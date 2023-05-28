/**
 * Todo
 * - 팔로워 목록에서 삭제버튼은 어떻게 처리할지?
 *
 */

import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserAvatar from "./UserAvatar";
import axios from "axios";

import useWeb3 from "@/hooks/useWeb3";

interface Props {
  userFollower: string[];
}

export default function FollowerModal({ userFollower }: Props) {
  const { account } = useWeb3();
  // console.log("팔로워목록 = ", userFollower);
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

  return (
    <>
      <button onClick={handleModalOpen}>
        <span className="mr-2 font-bold">{userFollower.length}</span>
        <span className="font-semibold text-gray-400">Followers</span>
      </button>
      {isModal && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full">
          <div className="w-full h-full bg-black opacity-50"></div>
          <div className="overflow-hidden absolute max-w-[400px] w-[80%] h-[300px] bg-white shadow-lg border p-4 flex flex-col overflow-auto">
            <h1 className="text-center text-xl font-extrabold pb-4">
              Follower
              <button
                className="text-right absolute right-5"
                onClick={handleModalClose}
              >
                X
              </button>
            </h1>
            <hr className="py-2" />
            <div className="overflow-auto">
              {userFollower.map((follower: any) => {
                if (follower) {
                  return (
                    <li key={follower.id} className="list-none mb-3">
                      <div className="flex justify-between">
                        <UserAvatar
                          size="small"
                          UserImage={follower?.avatar!}
                          UserName={follower?.username!}
                          UserAddr={follower.address}
                          isMine={account === follower.address}
                        />
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
