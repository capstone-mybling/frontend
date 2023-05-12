import { useState } from "react";
import { FileType } from "@prisma/client";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserAvatar from "./UserAvatar";

type UserFollow = {};
type UserLog = {};
type Post = {};
type PostLike = {};
type PostComment = {};
type PostCommentLike = {};
type User = {
  id: number;
  address: string;
  avatar: string;
  description: string;
  lastLoginIP: string;
  following: UserFollow[];
  followers: UserFollow[];
  userLogs: UserLog[];
  posts: Post[];
  postLikes: PostLike[];
  comments: PostComment[];
  commentLikes: PostCommentLike[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

interface Props {
  userFollowing: User[];
}

export default function FollowerModal() {
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
  const handleDeleteFollower = () => {
    console.log("팔로우삭제");
  };

  return (
    <>
      <button onClick={handleModalOpen}>
        <span className="mr-2 font-bold">220</span>
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
              <div className="flex justify-between">
                <UserAvatar
                  size="small"
                  UserImage="data:image/jpeg;base64,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"
                  UserName="test"
                />
                <button
                  className="px-4 py-2 bg-gray-300 rounded-xl font-black hover:text-violet-500"
                  onClick={handleDeleteFollower}
                >
                  삭제
                </button>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
