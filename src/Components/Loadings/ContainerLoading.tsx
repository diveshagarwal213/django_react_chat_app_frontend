import { CircularProgress } from "@mui/material";

function ContainerLoading() {
  return (
    <div
      style={{
        width: "inherit",
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="text-primary mt-5"
    >
      <CircularProgress size={"20px"} />
      <p className="ml-2">Loading</p>
    </div>
  );
}

export default ContainerLoading;
