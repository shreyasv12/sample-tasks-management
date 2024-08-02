/** @format */

import * as React from 'react';
import * as _ from 'underscore';
import { DateTime } from 'luxon';
import ReactJson from 'react-json-view';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { TasksType } from '../../types/tasks';
import { CustomToastContext } from '../../context/CustomToast';

import DeleteTasksModal from '../../components/tasks/DeleteTasksModal';
import AddEditTasksModal from '../../components/tasks/AddEditTasksModal';
import FormFields, { FormFieldsProps } from '../../components/common/CustomFormFiled';

import { getAllUsers } from '../../services/login';
import { deleteTasks, getTasksById, getTasksLogsById, updateTasks, updateTasksStatus } from '../../services/tasks';

import { TasksStatusOptions } from '../../constants/tasks';
import { TEXT_SELECT_COMPONENT } from '../../constants/custom-form-field';
import CustomTable, { CustomTableColumnType } from '../../components/common/CustomTable';
import UserPermissionPage from '../../components/common/UserPermissionPage';
import { APP_DELETE_TASKS, APP_EDIT_TASKS } from '../../constants/user-roles';

interface TasksDetailsProps {}

const TasksDetails: React.FunctionComponent<TasksDetailsProps> = () => {
  const appTheme = useTheme();

  const { taskId } = useParams();
  const navigate = useNavigate();

  const { handleAddAlerts } = React.useContext(CustomToastContext);

  const [isOpenAddEditTasksModal, setIsOpenAddEditTasksModal] = React.useState<boolean>(false);
  const [isOpenDeleteTasksModal, setIsOpenDeleteTasksModal] = React.useState<boolean>(false);

  const [tasksFilters, setTasksFilter] = React.useState<{ limit: number; offset: number }>({ limit: 10, offset: 0 });

  const tasksQuery = useQuery<TasksType>({
    queryKey: ['tasksByIdQuery', taskId],
    queryFn: async () => getTasksById(taskId!),
  });

  const tasksLogsQuery = useQuery<{ data: any[]; count: number }>({
    queryKey: ['getTasksLogsById', taskId, tasksFilters.limit, tasksFilters.offset],
    queryFn: async () => getTasksLogsById(taskId!, tasksFilters.limit, tasksFilters.limit * tasksFilters.offset),
  });

  const usersQuery = useQuery<{ username: string; userId: string }[]>({
    queryKey: ['getAllUsers'],
    queryFn: async () => getAllUsers(),
  });

  const updateTasksMutate = useMutation({
    mutationFn: async ({ taskId, tasksPayload }: { taskId: string; tasksPayload: TasksType }) => {
      await updateTasks(taskId, tasksPayload);
    },
    onSuccess: () => {
      tasksQuery.refetch();
      handleAddAlerts({ message: 'Successfully Update Task', code: 'success', id: new Date().getTime() });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.errorMessage || 'Something went wrong. Please try again later';
      handleAddAlerts({ message, code: 'error', id: new Date().getTime() });
    },
  });

  const updateTasksStatusMutate = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      await updateTasksStatus(taskId, status);
    },
    onSuccess: () => {
      tasksQuery.refetch();
      handleAddAlerts({ message: 'Successfully Update Task Status', code: 'success', id: new Date().getTime() });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.errorMessage || 'Something went wrong. Please try again later';
      handleAddAlerts({ message, code: 'error', id: new Date().getTime() });
    },
  });

  const deleteTasksMutate = useMutation({
    mutationFn: async ({ taskId }: { taskId: string }) => {
      await deleteTasks(taskId);
    },
    onSuccess: () => {
      tasksQuery.refetch();
      handleAddAlerts({ message: 'Successfully Deleted the Task', code: 'success', id: new Date().getTime() });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.errorMessage || 'Something went wrong. Please try again later';
      handleAddAlerts({ message, code: 'error', id: new Date().getTime() });
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setTasksFilter((prev) => ({ ...prev, offset: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTasksFilter((prev) => ({ ...prev, offset: 0, limit: +event.target.value }));
  };

  const toggleAddEditTasksModal = () => {
    setIsOpenAddEditTasksModal((prev) => !prev);
  };

  const toggleDeleteTasksModal = () => {
    setIsOpenDeleteTasksModal((prev) => !prev);
  };

  const handleSubmitTasks = async (tasks: TasksType) => {
    if (!_.isEmpty(tasksQuery.data) && tasksQuery.data?.taskId) {
      await updateTasksMutate.mutateAsync({ taskId: tasksQuery.data?.taskId, tasksPayload: tasks });
    }

    toggleAddEditTasksModal();
  };

  const handleSubmitTasksStatus = async (status: string) => {
    if (!_.isEmpty(tasksQuery.data) && tasksQuery.data?.taskId) {
      await updateTasksStatusMutate.mutateAsync({ taskId: tasksQuery.data?.taskId, status });
    }
  };

  const handleSubmitDeleteTasks = async () => {
    if (!_.isEmpty(tasksQuery.data) && tasksQuery.data?.taskId) {
      await deleteTasksMutate.mutateAsync({ taskId: tasksQuery.data?.taskId });

      navigate('/tasks');
    }

    toggleDeleteTasksModal();
  };

  const statusFormField: FormFieldsProps = {
    id: 'status',
    label: '',
    dataTestIdPrefix: 'status',
    componentType: TEXT_SELECT_COMPONENT,
    fullWidth: true,
    input: {
      disabled: updateTasksStatusMutate.isPending,
      options: TasksStatusOptions,
      value: tasksQuery.data?.status || '',
      onChange: (event: any) => handleSubmitTasksStatus(event.target.value),
    },
  };

  const assigneeFormField: FormFieldsProps = {
    id: 'assignee',
    label: 'Assignee',
    dataTestIdPrefix: 'Assignee',
    componentType: TEXT_SELECT_COMPONENT,
    fullWidth: true,
    input: {
      readonly: true,
      options: [{ label: 'Unassigned', value: '' }].concat(usersQuery.data?.map((item) => ({ label: item.username, value: item.userId })) || []),
      value: tasksQuery.data?.assignee || '',
      onChange: console.info,
    },
  };

  const reporterFormField: FormFieldsProps = {
    id: 'reporter',
    label: 'Reporter',
    dataTestIdPrefix: 'reporter',
    componentType: TEXT_SELECT_COMPONENT,
    fullWidth: true,
    input: {
      readonly: true,
      options: [{ label: 'Unassigned', value: '' }].concat(usersQuery.data?.map((item) => ({ label: item.username, value: item.userId })) || []),
      value: tasksQuery.data?.reporter || '',
      onChange: console.info,
    },
  };

  const columnDefs: CustomTableColumnType[] = [
    {
      id: 'Payload',
      label: 'Payload',
      cellFormatter: (data: TasksType, rowIndex: number) => <ReactJson collapsed src={data} key={rowIndex} />,
    },
    {
      id: 'Payload',
      label: 'Created At',
      cellFormatter: (data: TasksType, rowIndex: number) => (
        <Typography variant='fontReg16' color={appTheme.palette.primary.main}>
          {DateTime.fromJSDate(new Date(data.createdAt)).toFormat('dd MMM, yyyy HH:mm a')}
        </Typography>
      ),
    },
  ];

  return (
    <Container maxWidth='md'>
      {isOpenAddEditTasksModal && (
        <AddEditTasksModal
          isOpen={isOpenAddEditTasksModal}
          handleClose={toggleAddEditTasksModal}
          tasks={tasksQuery.data}
          isNewTasks={false}
          isEdit
          users={usersQuery.data || []}
          disabled={updateTasksStatusMutate.isPending || updateTasksMutate.isPending}
          handleSubmitTasksStatus={handleSubmitTasksStatus}
          isUpdatingTasks={updateTasksMutate.isPending}
          handleSubmit={handleSubmitTasks}
        />
      )}

      {isOpenDeleteTasksModal && (
        <DeleteTasksModal isOpen={isOpenDeleteTasksModal} handleClose={toggleDeleteTasksModal} isUpdatingTasks={deleteTasksMutate.isPending} handleSubmit={handleSubmitDeleteTasks} />
      )}

      <Typography variant='h3' color={appTheme.palette.primary.main}>
        Tasks Details
      </Typography>

      <Grid item xs={12} container gap={3} sx={{ mt: 2, height: '80vh' }}>
        <Grid item xs={7}>
          <Grid item xs={12} sx={{ my: 2 }}>
            <UserPermissionPage roles={[APP_EDIT_TASKS]} showNoAccessMessage={false}>
              <Button onClick={toggleAddEditTasksModal} variant='contained' startIcon={<EditIcon />}>
                Edit
              </Button>
            </UserPermissionPage>
            <UserPermissionPage roles={[APP_DELETE_TASKS]} showNoAccessMessage={false}>
              <Button onClick={toggleDeleteTasksModal} variant='contained' color='error' startIcon={<DeleteIcon />} sx={{ ml: 2 }}>
                Delete
              </Button>
            </UserPermissionPage>
          </Grid>

          <Typography component='div' variant='fontSemiBold14' color={appTheme.palette.primary.main} sx={{ pt: 5 }}>
            Title:
          </Typography>
          <Typography component='div' variant='fontSemiBold18' color={appTheme.palette.primary.main} sx={{ pt: 1 }}>
            {tasksQuery.data?.title}
          </Typography>

          <Typography component='div' variant='fontSemiBold12' color={appTheme.palette.primary.main} sx={{ pt: 5 }}>
            Description:
          </Typography>
          <Typography component='div' variant='fontSemiBold18' color={appTheme.palette.primary.main} sx={{ pt: 1 }}>
            {tasksQuery.data?.descriptions || 'NA'}
          </Typography>

          <Divider sx={{ my: 5 }} />

          <Typography component='div' variant='fontSemiBold12' color={appTheme.palette.primary.main} sx={{ pt: 2 }}>
            Activity:
          </Typography>

          <Paper elevation={1} sx={{ my: 3 }}>
            <CustomTable
              columns={columnDefs}
              tableSize='medium'
              customStyles={{ color: appTheme.palette.primary.main }}
              data={tasksLogsQuery.data?.data || []}
              count={tasksLogsQuery.data?.count || 0}
              page={tasksFilters.offset}
              handleChangePage={handleChangePage}
              rowsPerPage={tasksFilters.limit}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>

        <Grid item xs={4} gap={1} container justifyContent='space-between' sx={{ borderLeft: '1px solid', borderColor: appTheme.palette.customColor.stroke, px: 3 }}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <FormFields {...statusFormField} />
            </Grid>
            <Grid item xs={12}>
              <FormFields {...assigneeFormField} />
            </Grid>
            <Grid item xs={12}>
              <FormFields {...reporterFormField} />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 'auto' }}>
            <Divider />

            <Typography sx={{ pt: 2 }} variant='fontReg12' component='div' color={appTheme.palette.primary.main}>
              Created
              <Typography sx={{ pl: 1 }} variant='fontSemiBold14'>
                {DateTime.fromJSDate(new Date(tasksQuery.data?.createdAt!)).toFormat('dd MMMM, yyyy hh:mm a')}
              </Typography>
            </Typography>
            <Typography sx={{ pt: 2 }} variant='fontReg12' component='div' color={appTheme.palette.primary.main}>
              Updated
              <Typography sx={{ pl: 1 }} variant='fontSemiBold14'>
                {DateTime.fromJSDate(new Date(tasksQuery.data?.updatedAt!)).toFormat('dd MMMM, yyyy hh:mm a')}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TasksDetails;
