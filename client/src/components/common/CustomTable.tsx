/** @format */

import * as React from 'react';

import Box from '@mui/material/Box';
import Table, { TablePropsSizeOverrides } from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import type { OverridableStringUnion } from '@mui/types';
import _ from 'underscore';
import { Typography } from '@mui/material';

export type CustomTableColumnType = {
  id: string;
  numeric?: boolean;
  disablePadding?: boolean;
  cellAlignment?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  valign?: 'baseline' | 'middle' | 'top';
  headerColSpan?: number;
  hiddenHeader?: boolean;
  rowSpan?: number;
  label: string | JSX.Element;
  minWidth?: number | string;
  maxWidth?: number | string;
  width?: number | string;
  value?: string;
  hiddenColumn?: boolean;
  cellFormatter?: (columnValue: any, index: number) => JSX.Element | null;
  valueFormatter?: (columnValue: any) => JSX.Element;
};

interface CustomStyles {
  color?: string;
  backgroundColor?: string;
  padding?: string;
}

interface CustomTableProps {
  data: any[];
  count: number;
  columns: CustomTableColumnType[];

  customStyles?: CustomStyles;

  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;

  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;

  stickyHeader?: boolean;
  tableSize?: OverridableStringUnion<'small' | 'medium', TablePropsSizeOverrides>;

  noDataMessage?: string;
}

const CustomTable: React.FunctionComponent<CustomTableProps> = (props) => {
  const _renderTableHeadColumn = (column: CustomTableColumnType) => {
    if (column.hiddenColumn || column.hiddenHeader) {
      return null;
    }

    return (
      <TableCell
        sx={{
          zIndex: 1,
        }}
        style={props.customStyles}
        colSpan={column.headerColSpan || 1}
        key={column.id}
        className={`table-head-cell-${column.id}`}
        variant='head'>
        {column.label}
      </TableCell>
    );
  };

  const _renderTableBodyColumn = (rowData: any, column: CustomTableColumnType, index: number) => {
    if (!rowData || column.hiddenColumn) return null;

    let value: JSX.Element | null = null;

    if (column.value) {
      value = rowData[column.value];
    }

    if (column.cellFormatter) {
      value = column.cellFormatter(rowData, index);
    }

    if (column.valueFormatter) {
      value = column.valueFormatter(rowData);
    }

    return (
      <TableCell
        key={column.id}
        style={{ minWidth: column.minWidth, width: column.width, maxWidth: column.maxWidth }}
        className={`table-body-cell-${column.id}`}
        align={column.cellAlignment}
        rowSpan={column.rowSpan}
        valign={column.valign}>
        {value}
      </TableCell>
    );
  };

  return (
    <Box className='custom-table'>
      <TableContainer className='table-container'>
        <Table stickyHeader={props.stickyHeader} size={props.tableSize} aria-labelledby='tableTitle' className='table'>
          <TableHead className='table-head'>
            <TableRow className='table-head-row'>{props.columns.map(_renderTableHeadColumn)}</TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {_.isEmpty(props.data) && (
              <TableCell className='table-body-cell-no-data' colSpan={props.columns?.length}>
                <Typography fontFamily='Lato' sx={{ fontSize: '14px' }} align='center'>
                  {props.noDataMessage}
                </Typography>
              </TableCell>
            )}

            {props.data.map((rowData, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                  {props.columns.map((column, index) => _renderTableBodyColumn(rowData, column, index))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={props.rowsPerPageOptions}
        component='div'
        count={props.count}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        onPageChange={props.handleChangePage}
        onRowsPerPageChange={props.handleChangeRowsPerPage}
      />
    </Box>
  );
};

CustomTable.defaultProps = {
  noDataMessage: 'No Data to Display',
  rowsPerPage: 20,
  rowsPerPageOptions: [10, 15, 20],

  stickyHeader: true,
};

export default CustomTable;
