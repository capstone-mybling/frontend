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
    axios
      .delete(`api/follows/${delAddr}`)
      .then((response) => console.log(response));
    console.log("addr = ", delAddr);
  };

  return (
    <>
      <button onClick={handleModalOpen}>
        <span className="mr-2 font-bold">{userFollower.length}</span>
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
              {userFollower.map((follower: any) => {
                if (follower) {
                  return (
                    <li key={follower.id} className="list-none mb-2">
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
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
