import { styled, Theme } from "@mui/material";
import { ActionSheet } from "react-onsenui";

export type BottomSheetProps = {
  open: boolean;
  onCancel?(): void;
  children: React.ReactNode;
  maxHeight?: string;
};

export function BottomSheet(props: BottomSheetProps) {
  const StyledSheet = styled(ActionSheet)(({ theme, maxHeight }) => ({
    "& .action-sheet--material": {
      maxHeight: maxHeight || "500px",
      overflow: "auto",
      borderRadius: "20px 20px 0px 0px",
      backgroundColor: theme?.palette.background.default,
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      borderTop: `1px solid ${theme.palette.divider}`,
      // borderBottom: "none",
    },
  }));

  return (
    <StyledSheet
      maxHeight={props.maxHeight}
      isOpen={props.open}
      animation="default"
      onCancel={props.onCancel}
      isCancelable={true}
    >
      {props.children}
    </StyledSheet>
  );
}
