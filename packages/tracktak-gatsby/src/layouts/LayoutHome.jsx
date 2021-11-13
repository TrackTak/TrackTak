import { Box, Container, useTheme } from '@mui/material'
import { Link, navigate } from 'gatsby'
import React from 'react'
import { LinkButton, Header, headerLinks, useAuth } from '@tracktak/common'

const LayoutHome = ({ children }) => {
  const theme = useTheme()

  const { isAuthenticated } = useAuth()
  const links = []

  if (!isAuthenticated) {
    links.push(headerLinks.signInLink)
  }

  return (
    <Container maxWidth='xl'>
      <Header navigate={navigate}>
        <Box
          sx={{
            marginRight: '-24px',
            marginTop: '-4px',
            marginBottom: '-4px'
          }}
        >
          <LinkButton
            to='sign-up'
            component={Link}
            variant='contained'
            sx={{ color: theme.palette.primary.contrastText, flexGrow: 1 }}
          >
            Go to Spreadsheet
          </LinkButton>
        </Box>
      </Header>
      {children}
    </Container>
  )
}

export default LayoutHome
