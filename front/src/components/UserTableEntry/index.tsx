import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../contexts/UserContext'
import userResource from '../../services/api/userResource'
import { User } from '../../types'
import UserDeleteModal from '../UserDeleteModal'

type Props = {
  user: User
  deleteCallback: () => void
}

const UserTableEntry: FC<Props> = ({ user, deleteCallback }) => {
  const { showToast } = useUser()
  const { id, username, email } = user
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  const [rowClickEnabled, setRowClickEnabled] = useState(true)
  const allowRowClick = () => setRowClickEnabled(true)
  const disallowRowClick = () => setRowClickEnabled(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  
  const handleRowClick = () => {
    if (!rowClickEnabled || isModalOpen) return
    navigate('/dash/users/' + id)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const success = await userResource.delete(id)

    if (!success) {
      showToast({
        severity: 'error',
        message: 'Failed to delete user',
      })
      setIsDeleting(false)
      return
    }

    deleteCallback()
    closeModal()
    showToast({
      severity: 'success',
      message: 'User deleted',
    })
  }

  return (
    <TableRow
      hover={rowClickEnabled}
      role="button"
      onClick={handleRowClick}
      sx={{ '&:hover': { cursor: 'pointer' } }}
    >
      <TableCell component="th">{username}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell align="right">
        <IconButton
          aria-label="delete user"
          onClick={openModal}
          onMouseEnter={disallowRowClick}
          onMouseLeave={allowRowClick}
        >
          <DeleteIcon color="warning" />
        </IconButton>
        <UserDeleteModal
          user={user}
          isOpen={isModalOpen}
          isDeleting={isDeleting}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      </TableCell>
    </TableRow>
  )
}

export default UserTableEntry
