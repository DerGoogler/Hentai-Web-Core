import { ConfirmationDialogRaw } from "@Components/ConfirmationDialogRaw";
import { ListItemButton } from "@mui/material";
import React from "react";
import { useActivity } from "../../../hooks/useActivity";
import { AccentColors, accent_colors, useScheme } from "../../../hooks/useDarkmode";
import { useStrings } from "../../../hooks/useStrings";
import { StyledListItemText } from "./StyledListItemText";

export function AccentColorPickerItem() {
  const { strings } = useStrings();
  const [open, setOpen] = React.useState(false);
  const { scheme, setScheme } = useScheme();
  const [value, setValue] = React.useState<AccentColors[0]>(scheme);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (val: any) => {
    setOpen(false);

    if (val.name && val.value) {
      setValue(val);
      setScheme(val);
    }
  };

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <StyledListItemText id="switch-list-label-wifi" primary={strings.accent_color} secondary={value.name} />
      </ListItemButton>
      <ConfirmationDialogRaw
        id="accent-menu"
        title={strings.select_accent_color}
        keepMounted
        open={open}
        contentMap={accent_colors}
        onClose={handleClose}
        value={value}
      />
    </>
  );
}
