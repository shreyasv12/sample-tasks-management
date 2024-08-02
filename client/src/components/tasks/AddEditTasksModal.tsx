/** @format */

import * as React from 'react';
import * as _ from 'underscore';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled, useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import CloseIcon from '@mui/icons-material/Close';

import FormFields, { FormFieldsProps } from '../common/CustomFormFiled';

import { TasksType } from '../../types/tasks';

import { tasksPayloadSchema } from '../../validations/tasks';
import { validateJoiObjectSchema } from '../../validations';

import { TasksPriorityOptions, TasksStatusOptions } from '../../constants/tasks';
import { TEXT_AREA_INPUT_COMPONENT, TEXT_INPUT_COMPONENT, TEXT_SELECT_COMPONENT } from '../../constants/custom-form-field';

import './AddEditTasksModal.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface AddEditTasksModalProps {
  isNewTasks: boolean;

  tasks?: TasksType | null;

  users: { username: string; userId: string }[];

  isOpen: boolean;
  handleClose: () => void;

  isUpdatingTasks: boolean;
  handleSubmit: (tasks: TasksType) => void;

  handleSubmitTasksStatus: (status: string) => void;

  disabled?: boolean;

  isEdit?: boolean;
}

const AddEditTasksModal: React.FunctionComponent<AddEditTasksModalProps> = (props) => {
  const appTheme = useTheme();
  const [tasks, setTasks] = React.useState<TasksType>({ priority: 'HIGH' } as TasksType);
  const [tasksError, setTasksError] = React.useState<Partial<TasksType>>({});

  const usersOptions = React.useMemo(() => {
    return props.users.map((item) => ({ label: item.username, value: item.userId }));
  }, [props.users]);

  const handleChange = (value: string, variable: keyof TasksType) => {
    setTasks((prev) => ({ ...prev, [variable]: value }));
  };

  const handleChangeStatus = (value: string) => {
    props.handleSubmitTasksStatus(value);
  };

  const handleSubmit = (event: any) => {
    event.stopPropagation();
    const errors = validateJoiObjectSchema(tasksPayloadSchema, tasks, { abortEarly: false });

    if (!_.isEmpty(errors)) {
      setTasksError(errors);
      return;
    }
    setTasksError({});
    props.handleSubmit(tasks);
  };

  React.useEffect(() => {
    if (!_.isEmpty(props.tasks)) {
      setTasks({
        title: props.tasks?.title!,
        descriptions: props.tasks?.descriptions!,

        priority: props.tasks?.priority!,
        assignee: props.tasks?.assignee!,
      } as TasksType);
    }
  }, [props.tasks]);

  const titleFormField: FormFieldsProps = {
    id: 'title',
    label: (
      <span>
        Title <sup style={{ color: 'red' }}>*</sup>
      </span>
    ),
    dataTestIdPrefix: 'title',
    componentType: TEXT_INPUT_COMPONENT,
    fullWidth: true,
    input: {
      disabled: props.isUpdatingTasks || props.disabled || !props.isEdit,
      value: tasks.title,
      errorMessage: tasksError.title,
      onChange: (event: any) => handleChange(event.target.value, 'title'),
    },
  };

  const descriptionFormField: FormFieldsProps = {
    id: 'description',
    label: 'Description',
    dataTestIdPrefix: 'description',
    componentType: TEXT_AREA_INPUT_COMPONENT,
    fullWidth: true,
    input: {
      disabled: props.isUpdatingTasks || props.disabled || !props.isEdit,
      value: tasks.descriptions,
      errorMessage: tasksError.descriptions,
      onChange: (event: any) => handleChange(event.target.value, 'descriptions'),
    },
  };

  const priorityFormField: FormFieldsProps = {
    id: 'priority',
    label: 'Priority',
    dataTestIdPrefix: 'priority',
    componentType: TEXT_SELECT_COMPONENT,
    fullWidth: true,
    input: {
      disabled: props.isUpdatingTasks || props.disabled || !props.isEdit,
      options: TasksPriorityOptions,
      value: tasks.priority,
      errorMessage: tasksError.priority,
      onChange: (event: any) => handleChange(event.target.value, 'priority'),
    },
  };

  const assigneeFormField: FormFieldsProps = {
    id: 'assignee',
    label: 'Assignee',
    dataTestIdPrefix: 'Assignee',
    componentType: TEXT_SELECT_COMPONENT,
    fullWidth: true,
    input: {
      disabled: props.isUpdatingTasks || props.disabled || !props.isEdit,
      options: [{ label: 'Unassigned', value: '' }].concat(usersOptions || []),
      value: tasks.assignee || '',
      errorMessage: tasksError.assignee,
      onChange: (event: any) => handleChange(event.target.value, 'assignee'),
    },
  };

  const statusFormField: FormFieldsProps = {
    id: 'status',
    label: '',
    dataTestIdPrefix: 'status',
    componentType: TEXT_SELECT_COMPONENT,
    fullWidth: true,
    input: {
      disabled: props.isUpdatingTasks || props.disabled,
      options: TasksStatusOptions,
      value: props.tasks?.status || '',
      errorMessage: tasksError.status,
      onChange: (event: any) => handleChangeStatus(event.target.value),
    },
  };

  console.log('>>D>SCD>SC>DSC>SD', tasks, props.tasks);

  return (
    <BootstrapDialog id='add-edit-tasks-modal' onClose={props.handleClose} aria-labelledby='customized-dialog-title' open={props.isOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        <Grid item xs={8} container gap={2} justifyContent='space-between'>
          <Grid item xs>
            <Typography variant='fontSemiBold16' color={appTheme.palette.primary.main}>
              {props.isNewTasks ? 'New Tasks' : 'Update Tasks'}
            </Typography>
          </Grid>
          <Grid item xs={5} className='status-container'>
            {!props.isNewTasks && <FormFields {...statusFormField} />}
          </Grid>
        </Grid>
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={props.handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}>
        <CloseIcon />
      </IconButton>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid item xs={12} container gap={2} alignItems='center'>
            <Grid item xs={12}>
              <FormFields {...titleFormField} />
            </Grid>

            <Grid item xs={12}>
              <FormFields {...descriptionFormField} />
            </Grid>

            <Grid item xs={12}>
              <FormFields {...priorityFormField} />
            </Grid>

            <Grid item xs={12}>
              <FormFields {...assigneeFormField} />
            </Grid>
          </Grid>
        </DialogContent>
        {props.isEdit && (
          <DialogActions>
            <Button disabled={props.isUpdatingTasks || props.disabled} color='error' variant='outlined' onClick={props.handleClose}>
              Cancel
            </Button>
            <Button disabled={props.isUpdatingTasks || props.disabled} type='submit' variant='contained'>
              {props.isUpdatingTasks && <CircularProgress sx={{ mr: 2 }} />}
              {props.isUpdatingTasks ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogActions>
        )}
      </form>
    </BootstrapDialog>
  );
};

export default AddEditTasksModal;
