import { ProgressCircular } from "react-onsenui";

export const LoadingScreen = () => {
  return (
    <ProgressCircular
      indeterminate
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "40px",
        height: "40px",
        WebkitTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};
