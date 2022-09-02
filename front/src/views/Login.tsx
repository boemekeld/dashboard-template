import { Button, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Reaptcha from 'reaptcha'
import useToast from '../hooks/useToast'
import loginResource from '../services/api/loginResource'

import styles from '../styles/Home.module.css'

const REACAPTCHA_SITE_KEY = "6Lc2OG4hAAAAAF_Wx9HXq3O-FKTmyG_eOamPyykl"

const Login: FC = () => {
  const { Toast, showToast } = useToast()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const isLoginDisabled = !recaptchaToken

  const updateRecaptchaToken = (token: string) => setRecaptchaToken(token)
  const clearRecaptchaToken = () => setRecaptchaToken('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const loginSuccess = await loginResource.login({
      username,
      password,
      recaptchaToken,
    })

    if (loginSuccess) navigate('/dash/home')
    else showToast({
      severity: 'error',
      message: 'Login fail'
    })
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant="h1">
          Dashboard - Login
        </Typography>

        <form
          onSubmit={handleSubmit}
          className={styles.loginForm}
        >
          <TextField
            id="user"
            label="User"
            type="text"
            size="small"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            size="small"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Reaptcha
            sitekey={REACAPTCHA_SITE_KEY}
            onVerify={updateRecaptchaToken}
            onExpire={clearRecaptchaToken}
          />
          <Button
            type="submit"
            disabled={isLoginDisabled}
          >
            Login
          </Button>
        </form>
      </main>
      <Toast />
    </div>
  )
}

export default Login
