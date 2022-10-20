import { Fragment, forwardRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { ModalProps } from "types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props: ModalProps) {
  const {
    CustomButton,
    title,
    open,
    handleClose,
    children,
    Actions,
    maxWidth,
  } = props;

  return (
    <Fragment>
      {CustomButton}
      <Dialog
        maxWidth={maxWidth || "lg"}
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>{Actions}</DialogActions>
      </Dialog>
    </Fragment>
  );
}
