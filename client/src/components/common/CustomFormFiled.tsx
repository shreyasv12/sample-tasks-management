/** @format */

// Lib
import * as React from 'react';

import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

// Constant
import { TEXT_INPUT_COMPONENT, TEXT_AREA_INPUT_COMPONENT, TEXT_SELECT_COMPONENT, CUSTOM_INPUT_COMPONENT, TEXT_SELECT_CHECKBOX_MULTI_COMPONENT } from './../../constants/custom-form-field';

export interface FormFieldsProps {
  fullWidth?: boolean;
  dataTestIdPrefix?: string;
  id: string;
  height?: string;
  width?: string;
  componentType: typeof TEXT_INPUT_COMPONENT | typeof TEXT_AREA_INPUT_COMPONENT | typeof TEXT_SELECT_COMPONENT | typeof CUSTOM_INPUT_COMPONENT | typeof TEXT_SELECT_CHECKBOX_MULTI_COMPONENT;
  label: string | JSX.Element;
  inputComponent?: JSX.Element;
  input?: {
    value: unknown;
    onChange: (event: any, newValue?: unknown) => void;
    onKeyDown?: (event: any) => void;
    errorMessage?: string | undefined;
    type?: React.InputHTMLAttributes<unknown>['type'];
    placeholder?: string;
    options?: { label: string; value: string }[];
    required?: boolean;
    disabled?: boolean;
    endAdornment?: React.ReactNode;
    isCreateableSelect?: boolean;
    isMulti?: boolean;
    maxMenuHeight?: number;
    inputMode?: 'email' | 'search' | 'tel' | 'text' | 'url' | 'none' | 'numeric' | 'decimal' | undefined;
    countryCode?: string;
    autoFocus?: boolean;
    length?: number;
    fontSize?: string;

    readonly?: boolean;

    renderValue?: (selectedValue: any) => any;
  };
  noError?: boolean;
  style?: any;
}

const FormFields: React.FunctionComponent<FormFieldsProps> = (props) => {
  const appTheme = useTheme();

  let input: React.ReactNode = null;

  if (props.componentType === TEXT_INPUT_COMPONENT) {
    input = (
      <FormGroup>
        <OutlinedInput
          data-testid={`${props.dataTestIdPrefix}-${props.id}`}
          fullWidth
          disabled={props.input?.disabled}
          type={props.input?.type}
          error={Boolean(props.input?.errorMessage)}
          value={props.input?.value}
          onChange={props.input?.onChange}
          onKeyPress={props.input?.onKeyDown}
          placeholder={props.input?.placeholder}
          endAdornment={props.input?.endAdornment}
          sx={{ height: props.height, width: props.width, fontSize: props.input?.fontSize }}
          autoFocus={props.input?.autoFocus}
          inputMode={props.input?.inputMode}
          inputProps={{
            maxLength: props.input?.length,
          }}
        />
      </FormGroup>
    );
  }

  if (props.componentType === TEXT_SELECT_COMPONENT) {
    input = (
      <FormGroup id={`${props.id}-group`}>
        <Select
          fullWidth={props.fullWidth}
          id={props.id}
          data-testid={`${props.dataTestIdPrefix}-${props.id}`}
          disabled={props.input?.disabled}
          type={props.input?.type}
          error={Boolean(props.input?.errorMessage)}
          value={props.input?.value}
          onChange={props.input?.onChange}
          placeholder={props.input?.placeholder}
          endAdornment={props.input?.endAdornment}
          label={props.label}
          readOnly={props.input?.readonly}
          sx={{ height: props.height, width: props.width, ...props.style }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            // getContentAnchorEl: null
          }}>
          {props.input?.options!.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
    );
  }

  if (props.componentType === TEXT_AREA_INPUT_COMPONENT) {
    input = (
      <FormGroup>
        <OutlinedInput
          multiline
          minRows={3}
          maxRows={3}
          data-testid={`${props.dataTestIdPrefix}-${props.id}`}
          type={props.input?.type}
          error={Boolean(props.input?.errorMessage)}
          value={props.input?.value}
          onChange={props.input?.onChange}
          placeholder={props.input?.placeholder}
        />
      </FormGroup>
    );
  }

  if (props.componentType === TEXT_SELECT_CHECKBOX_MULTI_COMPONENT) {
    const value: any = props.input?.value || [];
    input = (
      <Select
        fullWidth={props.fullWidth}
        data-testid={`${props.dataTestIdPrefix}-${props.id}`}
        disabled={props.input?.disabled}
        type={props.input?.type}
        error={Boolean(props.input?.errorMessage)}
        value={value}
        onChange={props.input?.onChange}
        placeholder={props.input?.placeholder}
        endAdornment={props.input?.endAdornment}
        label={props.label}
        multiple
        renderValue={props.input?.renderValue ? props.input?.renderValue : (selected: any) => selected.join(', ')}>
        {props.input?.options!.map((item) => (
          <MenuItem value={item.value}>
            <Checkbox checked={value && Array.isArray(value) && value?.some((ele: any) => ele === item.value)} />
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Select>
    );
  }

  if (props.componentType === CUSTOM_INPUT_COMPONENT) {
    input = props.inputComponent;
  }

  return (
    <FormControl fullWidth={props.fullWidth} required={props.input?.required} disabled={props.input?.disabled}>
      <FormLabel className={props.label === '' ? 'hiddeErrorMessage' : 'showErrorMessage'} sx={{ pb: '8px' }}>
        <Typography variant='fontSemiBold14' color={appTheme.palette.customColor.pageTitle} component='span' sx={{ marginLeft: '5px' }}>
          {props.label}
        </Typography>
      </FormLabel>

      {input}
      {!props.noError && (
        <FormHelperText
          component='div'
          className={props.label === '' ? 'hiddeErrorMessage' : 'showErrorMessage'}
          error={Boolean(props.input?.errorMessage)}
          sx={{ m: 0, mt: '7px', minHeight: '20px' }}>
          <Typography variant='fontSemiBold12' color={appTheme.palette.customColor.danger}>
            {props.input?.errorMessage}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
};

FormFields.defaultProps = {
  fullWidth: true,
};

export default FormFields;
