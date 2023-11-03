import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Popover,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { StatusListHead, StatusListToolbar } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'image', label: 'Image', alignRight: false },
  { id: 'oldtag', label: 'Old Tag', alignRight: false },
  { id: 'newtag', label: 'New Tag', alignRight: false },
  { id: 'cluster', label: 'Cluster', alignRight: false },
  { id: 'blob', label: 'Blob Name', alignRight: false },
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, field, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    if ( field === 'image' ) {
      return filter(array, (kw) => kw.image.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    if ( field === 'oldtag' ) {
      return filter(array, (kw) => kw.oldtag.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    if ( field === 'newtag' ) {
      return filter(array, (kw) => kw.newtag.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    if ( field === 'cluster' ) {
      return filter(array, (kw) => kw.cluster.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    if ( field === 'blob' ) {
      return filter(array, (kw) => kw.blob.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function StatusPage() {
  const [anchorEl, setAnchorEl] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('time');

  const [keyword, setKeyword] = useState('');

  const [field, setField] = useState('image');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [stateList, setStateList] = useState([]);

  const [hoverContent, setHoverContent] = useState('N/A');

  const open = Boolean(anchorEl);

  const fieldFromToolbar = (field) => {
    setField(field);
  }

  const handleHoverOpen = (event, metadata) => {
    setAnchorEl(event.currentTarget);
    setHoverContent(metadata);
  };

  const handleHoverClose = () => {
    setAnchorEl(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = stateList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, fieldName) => {
    const selectedIndex = selected.indexOf(fieldName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, fieldName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setKeyword(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stateList.length) : 0;

  const filteredUsers = applySortFilter(stateList, getComparator(order, orderBy), field, keyword);

  const isNotFound = !filteredUsers.length && !!keyword;

  useEffect(() => {
    axios.get("http://localhost:8000/loadState").then((response) => {
      setStateList(response.data)
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> VNGITBOT | Status Management </title>
      </Helmet>

      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Tag Change Log
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <StatusListToolbar numSelected={selected.length} keyword={keyword} setKeyword={setKeyword} onKeyword={handleFilterByName} fieldFromToolbar={fieldFromToolbar} setPage={setPage} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <StatusListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={stateList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, image, oldtag, newtag, cluster, blob, time, status, metadata } = row;
                    const selectedUser = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {image}
                              <IconButton
                                size="large"
                                color="inherit"
                                onMouseEnter={(event) => handleHoverOpen(event, metadata)}
                                onMouseLeave={handleHoverClose}
                              >
                                <Iconify icon={'octicon:info-16'} />
                              </IconButton>
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{oldtag}</TableCell>

                        <TableCell align="left">{newtag}</TableCell>

                        <TableCell align="left">{cluster}</TableCell>

                        <TableCell align="left">{blob}</TableCell>

                        <TableCell align="left">{time}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'FAILED' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        {status === 'SUCCESSFUL' ? (
                        <TableCell align="right">
                          <IconButton disabled size="large" color="inherit">
                            <Iconify icon={'pajamas:retry'} />
                          </IconButton>
                        </TableCell>) : (
                        <TableCell align="right">
                          <IconButton size="large" color="inherit">
                            <Iconify icon={'pajamas:retry'} />
                          </IconButton>
                        </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{keyword}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleHoverClose}
        disableRestoreFocus
      >
        <Typography variant="caption" sx={{ p: 1}}><em>{hoverContent}</em></Typography>
      </Popover>
    </>
  );
}
