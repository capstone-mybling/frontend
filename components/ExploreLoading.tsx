import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ExploreLoading() {
  return (
    <Stack spacing={1}>
      <div className="flex flex-col justify-between h-screen">
        <Skeleton variant="rectangular" width={"100%"} height={40} />
        <Skeleton variant="rectangular" width={"100%"} height={600} />
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={40}
          sx={{ bottom: 0 }}
        />
      </div>
    </Stack>
  );
}
