import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Switch,
  Tooltip,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { api, useAuth } from '@tracktak/common'

const ShareModelDialog = ({
  openShareModelDialog,
  handleOnClickCloseShareModelDialog,
  selectedSpreadsheet,
  checked,
  setChecked
}) => {
  const [copiedText, setCopiedText] = useState()
  const { getAccessToken } = useAuth()

  const updateSharedSpreadsheet = async spreadsheet => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken
    const response = await api.getSpreadsheet(spreadsheet._id, token?.jwtToken)

    await api.saveSpreadsheet(
      {
        ...response.data.spreadsheet,
        globalPublicEntitlements: {
          isPublic: true,
          entitlements: 'read'
        }
      },
      accessToken
    )
  }

  const handleOnChangeSwitch = spreadsheet => async e => {
    setChecked(e.target.checked)
    await updateSharedSpreadsheet(spreadsheet)
  }

  const handleOnClickCopy = async () => {
    const sharedSpreadsheet = `${window.location.origin}/shared/spreadsheets/${selectedSpreadsheet._id}`
    await navigator.clipboard.writeText(sharedSpreadsheet)

    setCopiedText(sharedSpreadsheet)
  }

  return (
    <Modal
      open={openShareModelDialog}
      onClose={handleOnClickCloseShareModelDialog}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 550,
          maxHeight: 500,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          overflow: 'auto',
          p: 4,
          '&:focus': {
            outline: 0,
            border: 0
          }
        }}
      >
        <Typography
          variant='h6'
          component='h2'
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          {`Share "${selectedSpreadsheet?.sheetData.name}"`}
        </Typography>
        <Divider />
        <Grid container wrap='nowrap' spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Avatar sx={{ width: 32, height: 32 }}>
              <LinkRoundedIcon />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap fontWeight='bold'>
              Share privately
            </Typography>
            <Typography noWrap sx={{ color: '#6F6F6F' }}>
              Anyone with the link can access in viewer mode.
            </Typography>
          </Grid>
          <Grid item>
            <Switch
              checked={checked}
              sx={{ display: 'flex', alignItems: 'center' }}
              onClick={handleOnChangeSwitch(selectedSpreadsheet)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
        </Grid>
        {checked ? (
          <Grid
            item
            lg={3}
            md={6}
            mt={2}
            xs={12}
            component={Box}
            paddingLeft='15px'
            paddingRight='15px'
          >
            <Tooltip
              title={copiedText ? 'Copied!' : 'Copy To Clipboard'}
              placement='top'
              arrow
            >
              <Button
                variant='contained'
                size='medium'
                startIcon={<ContentCopyIcon />}
                sx={{ textTransform: 'none' }}
                onClick={handleOnClickCopy}
              >
                Copy
              </Button>
            </Tooltip>
          </Grid>
        ) : null}
      </Box>
    </Modal>
  )
}

export default ShareModelDialog