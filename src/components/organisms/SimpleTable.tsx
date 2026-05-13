import React from 'react';
import { sortBy, reverse } from 'lodash';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SimpleCardActions from '../molecules/SimpleCardActions';
import SimpleDeleteConfirm from './SimpleDeleteConfirm';
import Icon from '../atoms/Icon';
import SimpleSearch from './SimpleSearch';
// import K from 'Constants';
/*
Usage Example

import { SimpleTable, Menubar, SimpleForm } from 'components';

const columns = [
  {
    header: 'Email',
    cell: 'email',
    sort: 'email',
    align: 'left'
  }
];

<SimpleTable data={list} columns={columns}/>
*/

const SimpleTable = (props: any) => {
  let {
    data,
    columns,
    summaryRow,
    header,
    subheader,
    row_limit = 10,
    fullWidth = true,
  } = props;
  const [rowsPerPage, setRowsPerPage] = React.useState(row_limit);
  const [onConfirmDelete, setOnConfirmDelete] = React.useState<any>(null);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState<'asc' | 'desc' | undefined>('asc');
  const [orderBy, setOrderBy] = React.useState(-1);

  React.useEffect(() => {
    setPage(0); // reset page
  }, [data]);

  if (!data || !columns) {
    return null;
  }

  if (orderBy > -1 && columns[orderBy].sort !== false) {
    let { sort, cell, header } = columns[orderBy];
    data = sortBy(data, sort || cell || header.toLowerCase());
    if (order !== 'asc') {
      data = reverse(data);
    }
  }
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const Content: any = fullWidth
    ? ({ children }: any) => <Box>{children}</Box>
    : CardContent;
  return (
    <Card className={props.className}>
      {(header || subheader) && (
        <>
          <CardHeader
            action={
              props.headeraction ? (
                <IconButton onClick={props.headeraction.onClick}>
                  {props.headeraction.icon}
                </IconButton>
              ) : null
            }
            subheader={subheader}
            title={header}
          />
          <Divider />
        </>
      )}
      {props.onFilter && (
        <>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
            }}>
            <SimpleSearch
              onFilter={props.onFilter}
              initialFilter={props.initialFilter || ''}
            />
            <Box sx={{ my: 1, flex: 1 }}>{props.moreFilters}</Box>
          </div>
          <Divider />
        </>
      )}
      <Content style={props.minHeight ? { minHeight: props.minHeight } : null}>
        <Table size={props.size || 'small'}>
          <TableHead>
            <TableRow>
              {columns.map((c: any, i: number) => {
                if (c.sort !== false && !c.navTo && !c.action && !c.delete) {
                  return (
                    <TableCell
                      key={`table_header_cell_${i}`}
                      align={c.align}
                      style={c.style || null}>
                      <TableSortLabel
                        active={orderBy === i}
                        direction={order}
                        onClick={(event) => {
                          const gotoDesc = orderBy === i && order === 'asc';
                          setOrder(gotoDesc ? 'desc' : 'asc');
                          setOrderBy(i);
                        }}>
                        {c.header}
                      </TableSortLabel>
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={`header${i}`}
                    align={c.align}
                    style={c.style || null}>
                    {c.header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(!data || data.length === 0) && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  No records found.
                </TableCell>
              </TableRow>
            )}
            {data &&
              data
                // .filter(row => { // tbd
                //   if(props.hide){
                //     return props.hide(row);
                //   }
                // })
                .slice(start, end)
                .map((row: any, row_index: number) => {
                  const row_style = props.row_style?.(row);
                  return (
                    <TableRow
                      style={row_style}
                      className={props.row_action ? 'clickable' : undefined}
                      hover={true}
                      key={`row${row.id || row_index}`}
                      onClick={
                        props.row_action
                          ? () => props.row_action(row)
                          : undefined
                      }>
                      {columns.map((c: any, i: number) => {
                        if (typeof c.cell === 'function') {
                          return (
                            <TableCell key={`funcell${i}`} align={c.align}>
                              {c.cell(row)}
                            </TableCell>
                          );
                          // } else if (c.navTo) {
                          //   return (
                          //     <TableCell key={i} align={c.align}>
                          //       <NavLink to={c.navTo(row)}>
                          //         <IconButton size="small">
                          //           <Icon.More />
                          //         </IconButton>
                          //       </NavLink>
                          //     </TableCell>
                          //   );
                        } else if (c.action) {
                          return (
                            <TableCell key={`action${i}`} align={c.align}>
                              <IconButton
                                size="small"
                                onClick={() => c.action(row)}
                                {...(c.icon_props?.(row) || {})}>
                                {c.icon ? c.icon(row) : <MoreHorizIcon />}
                              </IconButton>
                            </TableCell>
                          );
                        } else if (c.delete) {
                          return (
                            <TableCell key={`delete${i}`} align={c.align}>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setOnConfirmDelete({
                                    action: () => {
                                      c.delete(row);
                                      setOnConfirmDelete(null);
                                    },
                                  });
                                }}>
                                {c.icon ? (
                                  c.icon(row)
                                ) : (
                                  <Icon.Delete color="error" />
                                )}
                              </IconButton>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={`plain${i}`} align={c.align}>
                            {row[c.cell || c.header.toLowerCase()]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            {summaryRow && (
              <TableRow>
                {summaryRow.map((c: any, i: number) => {
                  return (
                    <TableCell
                      key={`sum${i}`}
                      colSpan={c.colSpan || 1}
                      align={c.align}>
                      <strong>{c.cell(data)}</strong>
                    </TableCell>
                  );
                })}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Content>
      {!!onConfirmDelete && (
        <SimpleDeleteConfirm
          onDelete={onConfirmDelete.action}
          onCancel={() => setOnConfirmDelete(null)}
        />
      )}
      {data.length > rowsPerPage && (
        <>
          <Divider />
          <CardActions>
            <TablePagination
              component="div"
              count={data.length}
              onPageChange={(event, page) => {
                setPage(page);
              }}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(event.target.value);
              }}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardActions>
        </>
      )}
      <SimpleCardActions
        actionsLeft={props.actionsLeft}
        actionsRight={props.actionsRight}
      />
    </Card>
  );
};

export default SimpleTable;
