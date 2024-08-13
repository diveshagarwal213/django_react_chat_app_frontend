import Autocomplete, {
  AutocompleteInputChangeReason,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from "use-debounce";
import { OptionsT } from "../interfaces/interface";

interface AutoCompleteChipsPropsI {
  options?: Array<OptionsT>;
  defaultValue?: OptionsT;

  debounce_wait?: number;
  debounce_action?: (value: string) => void;
  on_selection_change?: (data: OptionsT | null) => void;

  placeholder?: string;
  label?: string;
  loading?: boolean;
}

function callBack(value: string) {
  console.log(value);
}

export function AutoCompleteBasic(props: AutoCompleteChipsPropsI) {
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

  function handle_on_selection_change(data: OptionsT | null) {
    if (on_selection_change) {
      on_selection_change(data);
    }
  }

  function handle_input_change(
    v: string,
    reason: AutocompleteInputChangeReason
  ) {
    if (reason == "reset") return;
    searchDebouncedCallback(v);
  }

  return (
    <Autocomplete
      options={options || []}
      getOptionLabel={(option) => option.label}
      defaultValue={defaultValue}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(_, v) => handle_on_selection_change(v)}
      onInputChange={(_, v, reason) => handle_input_change(v, reason)}
      loading={loading || false}
    />
  );
}
