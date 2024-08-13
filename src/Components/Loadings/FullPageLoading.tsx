import { CircularProgress } from "@mui/material";

function FullPageLoading() {
  return (
    <div className="flex justify-center items-center text-2xl flex-col  text-primary min-h-dynamic">
      <CircularProgress />
      <p className="mt-5">Loading</p>
    </div>
  );
}

export default FullPageLoading;
