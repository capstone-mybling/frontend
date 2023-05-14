/**
 * Todo
 * - 모달에서 삭제버튼 눌렀을 때 DELETE 요청 시 404 에러
 */

import { useState } from "react";
import { FileType } from "@prisma/client";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserAvatar from "./UserAvatar";

export default function FollowerModal(userFollower: any[]) {
  const followerList = Object.values(userFollower);
  // console.log("팔로워목록 = ", followerList);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
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
  const handleDeleteFollower = (delAddr: string) => {
    // axios
    //   .delete(`api/follows/${delAddr}`)
    //   .then((response) => console.log(response));
    console.log("addr = ", delAddr);
  };

  return (
    <>
      <button onClick={handleModalOpen}>
        <span className="mr-2 font-bold">{followerList[0].length}</span>
        <span className="font-semibold text-gray-400">Followers</span>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex border-b-[2px] border-gray-200 pb-2 justify-between">
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ alignSelf: "center", marginX: "auto" }}
              >
                팔로워
              </Typography>
              <button onClick={handleModalClose} className="hover:text-red-300">
                X
              </button>
            </div>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {followerList[0].map((follower: any) => (
                <li key={follower.id} className="list-none mb-2">
                  <div className="flex justify-between">
                    <UserAvatar
                      size="small"
                      UserImage={follower?.avatar!}
                      UserName={follower?.username!}
                    />
                    <button
                      className="px-4 py-2 bg-gray-300 rounded-xl font-black hover:text-violet-500"
                      onClick={(e) => {
                        handleDeleteFollower(follower.address);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
