import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserAvatar from "./UserAvatar";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  userFollowing: string[];
  delBtn?: boolean;
}

export default function FollowingModal({
  userFollowing,
  delBtn = true,
}: Props) {
  // console.log("팔로잉목록 = ", userFollowing);
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
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (delAddr: string) => axios.delete(`api/users/follows/${delAddr}`),
    {
      onSuccess: () => {
        console.log("following 삭제 성공!");
        queryClient.invalidateQueries("userInfo");
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
                팔로잉
              </Typography>
              <button onClick={handleModalClose} className="hover:text-red-300">
                X
              </button>
            </div>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {userFollowing.map((following: any) => (
                <li key={following.address} className="list-none mb-2">
                  <div className="flex justify-between">
                    <UserAvatar
                      size="small"
                      UserImage={following.avatar}
                      UserName={following.username}
                      UserAddr={following.address}
                    />
                    {delBtn ? (
                      <button
                        className="px-4 py-2 bg-gray-300 rounded-xl font-black hover:text-violet-500"
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
              ))}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
