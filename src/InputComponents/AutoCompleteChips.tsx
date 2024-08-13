import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from "use-debounce";
import { OptionsT } from "../interfaces/interface";

interface AutoCompleteChipsPropsI {
  options?: Array<OptionsT>;
  defaultValue?: Array<OptionsT>;

  debounce_wait?: number;
  debounce_action?: (value: string) => void;
  on_selection_change?: (data: Array<OptionsT>) => void;

  placeholder?: string;
  label?: string;
  loading?: boolean;
}

function callBack(value: string) {
  console.log(value);
}

export function AutoCompleteChips(props: AutoCompleteChipsPropsI) {
  const {
    options,
    debounce_wait,
    defaultValue,
    placeholder,
    label,
    debounce_action,
    on_selection_change,
    loading,
  } = props;

  //hooks
  const searchDebouncedCallback = useDebouncedCallback(
    debounce_action || callBack,
    debounce_wait || 500
  );

  function handle_on_selection_change(data: Array<OptionsT>) {
    if (!on_selection_change) return;
    on_selection_change(data);
  }

  return (
    <Autocomplete
      multiple
      limitTags={3}
      id="tags-outlined"
      options={options || []}
      getOptionLabel={(option) => option.label}
      defaultValue={defaultValue || []}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(_, v) => handle_on_selection_change(v)}
      onInputChange={(_, v) => searchDebouncedCallback(v)}
      loading={loading || false}
    />
  );
}
