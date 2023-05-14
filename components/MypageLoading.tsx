import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function MypageLoading() {
  return (
    <Stack spacing={1}>
      {/* For other variants, adjust the size with `width` and `height` */}
      <div className="flex justify-center pt-[100px]">
        <Skeleton variant="circular" width={100} height={100} />
      </div>
      <div className="flex justify-center pt-4 rounded-full">
        <Skeleton variant="rounded" width={180} height={60} />
      </div>
      <div className="flex justify-center pt-3 rounded-xl">
        <Skeleton variant="rounded" width={200} height={50} />
      </div>
      <div className="flex flex-col items-center pt-16 gap-3">
        <Skeleton animation="wave" height={20} width="80%" />
        <Skeleton animation="wave" height={20} width="80%" />
        <Skeleton animation="wave" height={20} width="80%" />
      </div>
      <div className="grid grid-cols-3 gap-1 place-content-center pt-[100px]">
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={130}
          className="mx-auto"
        />
      </div>
    </Stack>
  );
}
