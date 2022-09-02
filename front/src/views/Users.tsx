import styled from '@emotion/styled';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTableEntry from '../components/UserTableEntry';
import useUser from '../contexts/UserContext';

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
`

const Users: FC = () => {
  const navigate = useNavigate()
  const { users, fetchUsers } = useUser()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchForm, setSearchForm] = useState({
    username: '',
    email: '',
  })

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0
  const isFirstPage = page === 0
  const isLastPage = page + 1 === Math.ceil(users.length / rowsPerPage)
  const hasOnlyOnePageEntry = rowsPerPage - emptyRows === 1
  
  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(searchForm)
  }  

  const handleSearchFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setPage(0)
    setSearchForm((old) => ({
      ...old,
      [name]: value
    }))
  }

  const deleteCallback = () => {
    if (isLastPage && !isFirstPage && hasOnlyOnePageEntry) setPage((old) => old - 1)
    fetchUsers()
  }  
  
  return (
    <main>
      <HeaderWrapper>
        <Typography variant="h1">
          Users
        </Typography>
        <Button
          aria-label="add user"
          title="add user"
          variant="contained"
          onClick={() => navigate('/dash/users/new')}
          sx={{ ml: 'auto', p: 1, minWidth: 'max-content' }}
        >
          <AddRoundedIcon />
        </Button>
      </HeaderWrapper>
      <Paper
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{ p: 4, mt: 4.5, mb: 3.75, borderRadius: '8px' }}
      >
        <Typography variant="h2" sx={{ mb: 2.375 }}>
          Filter by
        </Typography>
        <TextField
          size="small"
          label="username"
          name="username"
          onChange={handleSearchFormChange}
        />
        <TextField
          size="small"
          label="email"
          name="email"
          onChange={handleSearchFormChange}
          sx={{ ml: 3.75 }}
        />
        <Button
          aria-label="find user"
          title="find user"
          type="submit"
          variant="contained"
          sx={{ ml: 3.75, p: 1, minWidth: 'max-content' }}
        >
          <SearchIcon />
        </Button>
      </Paper>
      <Paper sx={{ minWidth: '100%', borderRadius: '8px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => <UserTableEntry key={user.id} user={user} deleteCallback={deleteCallback} />
              )}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 73 * emptyRows,
                  }}
                >
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          showFirstButton
          showLastButton
          onPageChange={(e: unknown, newPage: number) => { setPage(newPage) }}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </main>
  )
}

export default Users;
