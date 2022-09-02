import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useUser from '../contexts/UserContext';
import userResource from '../services/api/userResource';

const initialFormData = {
  username: '',
  email: '',
  password: '',
}

export default function UserDetail() {
  const navigate = useNavigate()
  const { userId: idParam } = useParams()
  const { users, fetchUsers, showToast } = useUser()
  const [formData, setFormData] = useState(initialFormData)

  const user = users.find((user) => user.id === idParam)

  useEffect(() => {
    if (!user) return
    setFormData({ ...user })
  }, [user])

  const handleSubmit: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault()
    const success = await userResource.post({
      ...formData,
      id: user ? user.id : null
    })

    if (!success) {
      showToast({
        severity: 'error',
        message: 'Failed to update user'
      })
      return
    }
    
    showToast({
      severity: 'success',
      message: user ? 'User updated' : 'User created'
    })

    fetchUsers()
    navigate('/dash/users')
  }

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setFormData((old) => ({
      ...old,
      [name]: value
    }))
  }

  return (
    <main>
      <Link to="/dash/users">
        <Button startIcon={<ArrowBackIosIcon />}>
          Back
        </Button>
      </Link>
      <Typography variant="h1">
        {user ? `User: ${user.username}` : 'New User' }
      </Typography>
      <Card
        component="form"
        onSubmit={handleSubmit}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {user && (<TextField
            id="id"
            label="id"
            name="id"
            value={user?.id}
            inputProps={{
              readOnly: true
            }}
          />)}
          <TextField
            id="username"
            label="username"
            name="username"
            value={formData.username}
            onChange={handleFormChange}
          />
          <TextField
            id="password"
            label="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
          />
          <TextField
            id="email"
            label="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </CardContent>
        <CardActions>
          <Link to="/dash/users">
            <Button>
              Cancel
            </Button>
          </Link>          
          <Button type="submit">
            Submit
          </Button>
        </CardActions>
      </Card>
    </main>
  )
}
