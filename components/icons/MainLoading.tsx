import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

export default function MainLoading() {
  return (
    <div className="flex flex-col px-5">
      <div className="w-full pt-20">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton
            animation="wave"
            variant="circular"
            width={55}
            height={55}
          />
          <Skeleton animation="wave" height={20} width="16%" />
        </div>
        <Skeleton sx={{ height: 450 }} animation="wave" variant="rectangular" />
        <CardContent>
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        </CardContent>
      </div>
      <div className="w-full">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton
            animation="wave"
            variant="circular"
            width={55}
            height={55}
          />
          <Skeleton animation="wave" height={20} width="16%" />
        </div>
        <Skeleton sx={{ height: 350 }} animation="wave" variant="rectangular" />
        <CardContent>
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        </CardContent>
      </div>
    </div>
  );
}
