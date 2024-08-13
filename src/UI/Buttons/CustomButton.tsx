import { Button, ButtonProps } from "@mui/material";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";

interface AddressButtonProps extends ButtonProps {
  showDropDownIcon?: boolean;
  truncateText?: string;
}

interface BasicButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export function AddressButton(props: AddressButtonProps) {
  const { showDropDownIcon, truncateText, sx, ...rest } = props;
  return (
    <Button
      {...rest}
      sx={{
        textAlign: "left",
        display: "block",
        overflow: "hidden",
        ...sx,
      }}
    >
      <span className="inline-flex capitalize text-base items-center ">
        {props.children}
        {showDropDownIcon && <BiChevronDown size={16} />}
      </span>
      <span className="block font-normal text-text_secondary text-xs truncate">
        {truncateText}
      </span>
    </Button>
  );
}
export function AddButton(props: ButtonProps) {
  return (
    <Button {...props} startIcon={<AiOutlinePlus size={20} />}>
      {props.children}
    </Button>
  );
}

export function BasicButton(props: BasicButtonProps) {
  const { children, isLoading, size, ...rest } = props;
  const circular_progress_size = 24;
  return (
    <Button size={size} {...rest}>
      {isLoading ? (
        <CircularProgress color="inherit" size={circular_progress_size} />
      ) : (
        children
      )}
    </Button>
  );
}
