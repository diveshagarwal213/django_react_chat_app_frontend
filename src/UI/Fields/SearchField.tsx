import { TextField, OutlinedTextFieldProps } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";

interface SearchFieldProps extends OutlinedTextFieldProps {
  debounce_action?: (value: string) => void;
  debounce_wait?: number;
}

function SearchField(props: Omit<SearchFieldProps, "variant">) {
  const { debounce_action, debounce_wait, onChange, ...rest } = props;
  const searchDebouncedCallback = useDebouncedCallback(
    debounce_action ||
      ((value: string) => {
        console.log(value);
      }),
    debounce_wait || 500
  );

  //handlers
  function handle_on_change(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    if (onChange) onChange(event);
    if (debounce_action) searchDebouncedCallback(event.target.value);
  }

  return (
    <TextField
      onChange={handle_on_change}
      variant="outlined"
      label="Search"
      {...rest}
    />
  );
}

export default SearchField;
