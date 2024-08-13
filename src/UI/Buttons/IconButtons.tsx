import {
  CircularProgress,
  CircularProgressProps,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { BiArrowBack, BiSolidUserCircle } from "react-icons/bi";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  PrimaryActiveNotification,
  PrimaryCheckIcon,
  PrimaryEditIcon,
  PrimaryHistoryOutlinedIcon,
  PrimaryNoNotification,
} from "../Icons/Icons";

export function AddIconButton(props: IconButtonProps) {
  return (
    <IconButton title="Add" {...props}>
      <AddIcon />
    </IconButton>
  );
}
export function HistoryIconButton(props: IconButtonProps) {
  return (
    <IconButton title="History" {...props}>
      <PrimaryHistoryOutlinedIcon />
    </IconButton>
  );
}

interface NotificationIconButtonProps extends IconButtonProps {
  has_new_notifications?: boolean;
}

export function NotificationIconButton(props: NotificationIconButtonProps) {
  const { has_new_notifications, ...rest } = props;
  return (
    <IconButton title="notifications" {...rest}>
      {has_new_notifications ? (
        <PrimaryActiveNotification
          className="vibrate_animation"
          color="primary"
        />
      ) : (
        <PrimaryNoNotification />
      )}
    </IconButton>
  );
}

export function EditIconButton(props: IconButtonProps) {
  return (
    <IconButton title="Edit" {...props}>
      <PrimaryEditIcon />
    </IconButton>
  );
}
export function AcceptIconButton(props: IconButtonProps) {
  return (
    <IconButton title="Accept" {...props}>
      <PrimaryCheckIcon />
    </IconButton>
  );
}
export function DeleteIconButton(props: IconButtonProps) {
  return (
    <IconButton title="delete" {...props}>
      <DeleteIcon />
    </IconButton>
  );
}
export function BackArrowIconButton(props: IconButtonProps) {
  return (
    <IconButton title="Go back" {...props}>
      <BiArrowBack />
    </IconButton>
  );
}

export function FilterIconButton(props: IconButtonProps) {
  return (
    <IconButton title="Filter" {...props}>
      <FilterListIcon />
    </IconButton>
  );
}

export function UserProfileIconButton(props: IconButtonProps) {
  return (
    <IconButton title="user" {...props}>
      <BiSolidUserCircle />
    </IconButton>
  );
}

interface RefreshButtonInterface extends IconButtonProps {
  is_loading?: boolean;
  circular_progress_props?: CircularProgressProps;
}

export function RefreshIconButton(props: RefreshButtonInterface) {
  const {
    is_loading,
    circular_progress_props = {},
    ...icon_button_props
  } = props;
  return (
    <IconButton title="refresh" {...icon_button_props}>
      {is_loading ? (
        <CircularProgress {...circular_progress_props} />
      ) : (
        <RefreshIcon />
      )}
    </IconButton>
  );
}
