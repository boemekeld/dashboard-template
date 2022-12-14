import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Logo = () => (
  <Link to="/dash/home">
    <Box
      sx={{
        paddingBlock: 4.25,
        paddingInline: 4.75,
        mb: 5.125,
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Dashboard
      </Typography>
    </Box>
  </Link>
)

const SideBar = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const linkCategorys = {
    data: [
      { name: 'types', to: '/dash/types' },
      { name: 'records', to: '/dash/records' },
    ],
    system: [
      { name: 'users', to: '/dash/users' },
    ]
  }

  return (
    <Box
      component="aside"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        minWidth: '255px',
        minHeight: '100vh',
      }}
    >
      <Logo />
      <nav>
        <List>
          {Object.entries(linkCategorys).map(([category, links]) => (
            <ListItem key={category} sx={{ flexWrap: 'wrap', p: 0 }}>
              <ListItemText
                primary={category}
                primaryTypographyProps={{
                  textTransform: 'capitalize',
                  fontSize: 18
                }}
                sx={{ pl: 4.75 }}
              />
              <List sx={{ width: '100%' }}>
                {links.map(({ name, to }) => (
                  <ListItem key={name}
                    disablePadding
                    sx={{ '&:hover .MuiTypography-root': { fontWeight: 700 } }}
                  >
                    <ListItemButton
                      key={name}
                      LinkComponent='a'
                      href={to}
                      sx={{
                        pl: 4.75,
                        paddingBlock: 1.3125,
                        '&:hover': { backgroundColor: 'primary.light' },
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(to)
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: '32px' }}>
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                          <rect width="6" height="6" rx="6" fill={theme.palette.primary.contrastText} />
                        </svg>
                      </ListItemIcon>
                      <ListItemText
                        primary={name}
                        primaryTypographyProps={{
                          textTransform: 'capitalize',
                          fontSize: 18
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  )
}

export default SideBar
