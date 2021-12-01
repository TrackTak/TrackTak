import {
  Box,
  IconButton,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItemButton
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useState, useEffect, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { utils, useAuth, api } from '@tracktak/common'
import SearchTickerDialog from './SearchTickerDialog'
import { ProvideSpreadsheetsMetadata } from '../hooks/useSpreadsheetsMetadata'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import SidePanelTabFolders from './SidePanelTabFolders'
import { useNavigate } from 'react-router-dom'
import SidePanel from '../../../tracktak-gatsby/src/components/SidePanel'

const Dashboard = () => {
  const navigate = useNavigate()
  const [folders, setFolders] = useState([])
  const [defaultFolderId, setDefaultFolderId] = useState()
  const { getAccessToken } = useAuth()
  const [showSearchTickerDialog, setShowSearchTickerDialog] = useState(false)

  const newFoldersLength = folders.length === 1 ? true : false

  const handleShowSearchTickerDialog = () => {
    setShowSearchTickerDialog(true)
  }

  const handleCloseSearchTickerDialog = () => {
    setShowSearchTickerDialog(false)
  }

  const fetchFolders = useCallback(async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    const { data } = await api.getFolders(accessToken)
    const folders = data.folders
    const defaultFolderId = folders[0]._id

    setDefaultFolderId(defaultFolderId)
    setFolders(folders)
  }, [getAccessToken, setDefaultFolderId, setFolders])

  const handleOnClickCreateNewFolder = async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.createFolder('New Folder', accessToken)

    await fetchFolders()
  }

  const handleClickDelete = async id => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.deleteFolder(id, accessToken)

    await fetchFolders()
  }

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  return (
    <ProvideSpreadsheetsMetadata
      value={{
        defaultFolderId,
        handleShowSearchTickerDialog,
        folders
      }}
    >
      <Helmet>
        <title>{utils.getTitle('Dashboard')}</title>
      </Helmet>
      <SearchTickerDialog
        open={showSearchTickerDialog}
        onClose={handleCloseSearchTickerDialog}
      />
      <SidePanel
        sidePanelTabs={
          <Box>
            {folders.map(({ _id, name }) => {
              return (
                <SidePanelTabFolders
                  key={_id}
                  id={_id}
                  folderName={name}
                  disabledMenuitem={newFoldersLength}
                  folders={folders}
                  onDelete={handleClickDelete}
                  handleOnClickRouting={() => {
                    navigate(`/${_id}`)
                  }}
                />
              )
            })}
            <Divider sx={{ my: 0.5 }} />
            <ListItem disablePadding>
              <ListItemButton
                sx={{ marginTop: '10px' }}
                onClick={handleOnClickCreateNewFolder}
              >
                <ListItemIcon>
                  <CreateNewFolderIcon />
                </ListItemIcon>
                <ListItemText primary='New Folder' />
              </ListItemButton>
            </ListItem>
          </Box>
        }
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant='h5' gutterBottom>
            My Valuations
          </Typography>
          <IconButton
            sx={{
              ml: 'auto',
              padding: 0,
              backgroundColor: theme => theme.palette.primary.light,
              width: '40px',
              height: '40px',
              '&:hover': {
                backgroundColor: theme => theme.palette.primary.dark
              }
            }}
            onClick={handleShowSearchTickerDialog}
          >
            <AddIcon style={{ color: 'white' }} fontSize='large' />
          </IconButton>
        </Box>
        <Outlet />
      </SidePanel>
    </ProvideSpreadsheetsMetadata>
  )
}

export default Dashboard
