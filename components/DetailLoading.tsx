import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

export default function DetailLoading() {
  return (
    <div className="w-full pt-20">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton animation="wave" variant="circular" width={55} height={55} />
        <Skeleton animation="wave" height={20} width="16%" />
      </div>
      <Skeleton sx={{ height: 450 }} animation="wave" variant="rectangular" />
      <div className="flex items-center gap-4 my-4">
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" height={20} width="16%" />
      </div>{" "}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" height={20} width="35%" />
      </div>
      <Skeleton animation="wave" height={80} width={"40%"} />
      <Skeleton animation="wave" height={30} width={"70%"} />
    </div>
  );
}
