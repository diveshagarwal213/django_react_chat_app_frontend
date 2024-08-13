import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { BasicButton } from "../../UI/Buttons/CustomButton";

interface SimpleConfirmDialogI {
  open: boolean;
  handleClose: () => void;
  action: () => void;
  context: {
    title: React.ReactNode;
    message?: React.ReactNode;
    cancel_btn_text?: string;
    agree_btn_text?: string;
  };
  is_loading?: boolean;
}

export function SimpleConfirmDialog(props: SimpleConfirmDialogI) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.context.title}</DialogTitle>

      {props.context.message && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.context.message}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button color="inherit" onClick={props.handleClose}>
          {props.context.cancel_btn_text || "Cancel"}
        </Button>
        <BasicButton
          isLoading={props.is_loading === true}
          disabled={props.is_loading === true}
          onClick={props.action}
        >
          {props.context.agree_btn_text || "Confirm"}
        </BasicButton>
      </DialogActions>
    </Dialog>
  );
}
