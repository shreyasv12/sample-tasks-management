/** @format */

import * as React from 'react';
import * as _ from 'underscore';
import { useMutation, useQuery } from '@tanstack/react-query';

import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';

import CustomLoading from '../../components/common/CustomLoading';
import DeleteTasksModal from '../../components/tasks/DeleteTasksModal';
import AddEditTasksModal from '../../components/tasks/AddEditTasksModal';
import UserPermissionPage from '../../components/common/UserPermissionPage';
import CustomTable, { CustomTableColumnType } from '../../components/common/CustomTable';

import { TasksStatusType, TasksType } from '../../types/tasks';

import { CustomToastContext } from '../../context/CustomToast';

import { createTasks, deleteTasks, getAllTasks, updateTasks, updateTasksStatus } from '../../services/tasks';
import { getAllUsers } from '../../services/login';

import './Tasks.scss';

import { TasksStatusOptions } from '../../constants/tasks';
import { APP_ADMIN, APP_CREATE_TASKS, APP_DELETE_TASKS, APP_EDIT_TASKS } from '../../constants/user-roles';
import { Link } from 'react-router-dom';

interface TasksProps {}

const Tasks: React.FunctionComponent<TasksProps> = () => {
  const appTheme = useTheme();

  const [tasksFilters, setTasksFilter] = React.useState<{ limit: number; offset: number; status: TasksStatusType }>({ limit: 10, offset: 0, status: 'ALL' });

  const [isOpenDeleteTasksModal, setIsOpenDeleteTasksModal] = React.useState<boolean>(false);

  const [isOpenAddEditTasksModal, setIsOpenAddEditTasksModal] = React.useState<boolean>(false);
  const [editTasksDeatils, setEditTasksDeatils] = React.useState<TasksType | null>(null);
  const [isEditTasksDeatils, setIsEditTasksDeatils] = React.useState<boolean>(false);

  const [anchorElShowMenu, setAnchorElShowMenu] = React.useState<null | HTMLElement>(null);

  const { handleAddAlerts } = React.useContext(CustomToastContext);

  const tasksQuery = useQuery<{ data: TasksType[]; count: number }>({
    queryKey: ['tasksQuery', tasksFilters.limit, tasksFilters.offset, tasksFilters.status],
    queryFn: async () => getAllTasks({ status: tasksFilters.status }, tasksFilters.limit, tasksFilters.offset * tasksFilters.limit),
  });

  const usersQuery = useQuery<{ username: string; userId: string }[]>({
    queryKey: ['getAllUsers'],
    queryFn: async () => getAllUsers(),
  });

  const createTasksMutate = useMutation({
    mutationFn: async ({ tasksPayload }: { tasksPayload: TasksType }) => {
      await createTasks(tasksPayload);
    },
    onSuccess: () => {
      tasksQuery.refetch();
      handleAddAlerts({ message: 'Successfully Create Task', code: 'success', id: new Date().getTime() });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.errorMessage || 'Something went wrong. Please try again later';
      handleAddAlerts({ message, code: 'error', id: new Date().getTime() });
    },
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

  const handleClickCreateTasks = () => {
    setEditTasksDeatils(null);
    setIsEditTasksDeatils(true);
    toggleAddEditTasksModal();
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElShowMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElShowMenu(null);
  };

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
    if (!_.isEmpty(editTasksDeatils) && editTasksDeatils?.taskId) {
      await updateTasksMutate.mutateAsync({ taskId: editTasksDeatils?.taskId, tasksPayload: tasks });
    } else {
      await createTasksMutate.mutateAsync({ tasksPayload: tasks });
    }
    setEditTasksDeatils(null);
    setIsEditTasksDeatils(false);
    toggleAddEditTasksModal();
  };

  const handleSubmitTasksStatus = async (status: string) => {
    if (!_.isEmpty(editTasksDeatils) && editTasksDeatils?.taskId) {
      await updateTasksStatusMutate.mutateAsync({ taskId: editTasksDeatils?.taskId, status });
    }
    setEditTasksDeatils(null);
    setIsEditTasksDeatils(false);
    toggleAddEditTasksModal();
  };

  const handleSubmitDeleteTasks = async () => {
    if (!_.isEmpty(editTasksDeatils) && editTasksDeatils?.taskId) {
      await deleteTasksMutate.mutateAsync({ taskId: editTasksDeatils?.taskId });
    }

    setEditTasksDeatils(null);
    setIsEditTasksDeatils(false);
    toggleDeleteTasksModal();
  };

  const handleClickViewTasks = () => {
    if (!_.isEmpty(editTasksDeatils) && !_.isEmpty(editTasksDeatils?.taskId)) {
      setIsEditTasksDeatils(false);
      toggleAddEditTasksModal();
    }
    handleCloseMenu();
  };

  const handleClickUpdateTasks = () => {
    if (!_.isEmpty(editTasksDeatils) && !_.isEmpty(editTasksDeatils?.taskId)) {
      setIsEditTasksDeatils(true);
      toggleAddEditTasksModal();
    }
    handleCloseMenu();
  };

  const handleClickDeleteTasks = () => {
    if (!_.isEmpty(editTasksDeatils) && !_.isEmpty(editTasksDeatils?.taskId)) {
      toggleDeleteTasksModal();
    }
    handleCloseMenu();
  };

  const columnDefs: CustomTableColumnType[] = [
    {
      minWidth: 150,
      width: '15%',
      id: 'title',
      label: 'Title',
      cellFormatter: (data: TasksType, rowIndex: number) => (
        <Link to={`/tasks/${data.taskId}`}>
          <Typography color={appTheme.palette.primary.main} variant='fontSemiBold16' sx={{ wordBreak: 'break-all' }} key={rowIndex}>
            {data.title}
          </Typography>
        </Link>
      ),
    },

    {
      id: 'description',
      label: 'Description',
      minWidth: 300,
      width: '30%',
      cellFormatter: (data: TasksType, rowIndex: number) => (
        <Typography color={appTheme.palette.primary.main} noWrap={false} sx={{ wordBreak: 'break-all' }} variant='fontReg14' key={rowIndex}>
          {data.descriptions}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      width: '10%',
      cellFormatter: (data: TasksType, rowIndex: number) => {
        const status = TasksStatusOptions.find((item) => item.value === data.status)?.label || '';
        return (
          <Typography color={appTheme.palette.primary.main} noWrap={false} variant='fontSemiBold14' key={rowIndex}>
            {status}
          </Typography>
        );
      },
    },
    {
      id: 'assigee',
      label: 'Assignee',
      minWidth: 100,
      width: '10%',
      cellFormatter: (data: TasksType, rowIndex: number) => {
        let assigneeUser = '';

        if (data.assignee) {
          const user = usersQuery.data?.find((item) => item.userId === data.assignee);
          if (!_.isEmpty(user) && user?.username) {
            assigneeUser = user?.username;
          }
        }
        return (
          <Typography color={appTheme.palette.primary.main} variant='fontSemiBold14' key={rowIndex}>
            {assigneeUser}
          </Typography>
        );
      },
    },
    {
      id: 'actions',
      label: (
        <UserPermissionPage roles={[APP_ADMIN, APP_CREATE_TASKS]} showNoAccessMessage={false}>
          <Button onClick={handleClickCreateTasks} variant='outlined' startIcon={<AddIcon />} sx={{ ml: 'auto' }}>
            Tasks
          </Button>
        </UserPermissionPage>
      ),
      minWidth: 30,
      width: '2%',
      cellAlignment: 'right',
      cellFormatter: (data: TasksType, rowIndex: number) => (
        <>
          <IconButton
            key={rowIndex}
            onClick={(event) => {
              handleClickMenu(event);
              setEditTasksDeatils(data);
            }}>
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container id='task-container' maxWidth='md'>
      {Boolean(anchorElShowMenu) && (
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorElShowMenu}
          open={Boolean(anchorElShowMenu)}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}>
          <MenuItem onClick={handleClickViewTasks}>
            <VisibilityIcon htmlColor={appTheme.palette.primary.light} fontSize='small' />
            <Typography color={appTheme.palette.primary.main} sx={{ ml: 2 }} variant='fontSemiBold14'>
              View
            </Typography>
          </MenuItem>
          <UserPermissionPage roles={[APP_ADMIN, APP_EDIT_TASKS]} showNoAccessMessage={false}>
            <MenuItem onClick={handleClickUpdateTasks}>
              <EditIcon htmlColor={appTheme.palette.primary.light} fontSize='small' />
              <Typography color={appTheme.palette.primary.main} sx={{ ml: 2 }} variant='fontSemiBold14'>
                Edit
              </Typography>
            </MenuItem>
          </UserPermissionPage>
          <UserPermissionPage roles={[APP_ADMIN, APP_DELETE_TASKS]} showNoAccessMessage={false}>
            <MenuItem onClick={handleClickDeleteTasks}>
              <DeleteIcon htmlColor={appTheme.palette.primary.light} fontSize='small' />
              <Typography color={appTheme.palette.primary.main} sx={{ ml: 2 }} variant='fontSemiBold14'>
                Delete
              </Typography>
            </MenuItem>
          </UserPermissionPage>
        </Menu>
      )}

      <Typography variant='h3' color={appTheme.palette.primary.main} sx={{ mt: 3 }}>
        Tasks
      </Typography>

      {tasksQuery.isPending && <CustomLoading />}

      {isOpenAddEditTasksModal && (
        <AddEditTasksModal
          isOpen={isOpenAddEditTasksModal}
          handleClose={toggleAddEditTasksModal}
          isNewTasks={_.isEmpty(editTasksDeatils)}
          tasks={editTasksDeatils}
          isEdit={isEditTasksDeatils}
          users={usersQuery.data || []}
          disabled={updateTasksStatusMutate.isPending || updateTasksMutate.isPending || createTasksMutate.isPending}
          handleSubmitTasksStatus={handleSubmitTasksStatus}
          isUpdatingTasks={createTasksMutate.isPending || updateTasksMutate.isPending}
          handleSubmit={handleSubmitTasks}
        />
      )}

      {isOpenDeleteTasksModal && (
        <DeleteTasksModal isOpen={isOpenDeleteTasksModal} handleClose={toggleDeleteTasksModal} isUpdatingTasks={deleteTasksMutate.isPending} handleSubmit={handleSubmitDeleteTasks} />
      )}

      <Paper elevation={8} sx={{ my: 3 }}>
        <CustomTable
          columns={columnDefs}
          tableSize='medium'
          customStyles={{ color: appTheme.palette.primary.main }}
          data={tasksQuery.data?.data || []}
          count={tasksQuery.data?.count || 0}
          page={tasksFilters.offset}
          handleChangePage={handleChangePage}
          rowsPerPage={tasksFilters.limit}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default Tasks;
