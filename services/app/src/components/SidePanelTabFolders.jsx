import React, { useState, useRef, useEffect } from 'react'
import { ListItem, ListItemText, ListItemIcon } from '@mui/material'
import Folder from '@mui/icons-material/Folder'
import OptionsMenu from './OptionsMenu'
import ContentEditable from 'react-contenteditable'
import { useAuth, api } from '@tracktak/common'
import { setCaretToEndOfElement } from '../../../../packages/common/src/shared/utils'

const SidePanelTabFolders = ({
  id,
  folderName,
  onDelete,
  disabledMenuitem,
  disabledModal,
  handleOnClickRouting,
  folders
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  const { getAccessToken } = useAuth()
  const open = Boolean(anchorEl)
  const editableRef = useRef()
  const textRef = useRef(folderName)

  const handleOnClickOpenModal = () => {
    setOpenModal(true)
    setAnchorEl(null)
  }
  const handleOnClickCloseModal = () => {
    setOpenModal(false)
  }

  const handleOnChangeContentEditable = e => {
    textRef.current = e.target.value
  }

  const handleClickAnchor = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleAnchorClose = () => {
    setAnchorEl(null)
  }

  const handleClickEdit = () => {
    setDisabled(false)
    setAnchorEl(null)
  }

  const handleBlur = async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.updateFolder(id, textRef.current, accessToken)

    setDisabled(true)
  }

  const handleClickDelete = async () => {
    setAnchorEl(null)

    onDelete(id)
  }

  const handleClickMoveTo = async () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (editableRef.current && !disabled) {
      editableRef.current.focus()

      setCaretToEndOfElement(editableRef.current)
    }
  }, [editableRef, disabled])

  return (
    <ListItem onClick={handleOnClickRouting} button>
      <ListItemIcon>
        <Folder />
      </ListItemIcon>
      <ListItemText
        sx={{
          '& [contenteditable=true]:focus': {
            outline: '2px solid #43cea2',
            borderRadius: '2px'
          }
        }}
        primary={
          <ContentEditable
            tabIndex={1}
            innerRef={editableRef}
            disabled={disabled}
            onBlur={handleBlur}
            onChange={handleOnChangeContentEditable}
            html={textRef.current}
          />
        }
      />
      <OptionsMenu
        handleClickAnchor={handleClickAnchor}
        handleAnchorClose={handleAnchorClose}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
        handleClickMoveTo={handleClickMoveTo}
        handleOnClickOpenModal={handleOnClickOpenModal}
        handleOnClickCloseModal={handleOnClickCloseModal}
        disabledMenuitem={disabledMenuitem}
        disabledModal={disabledModal}
        folders={folders}
        open={open}
        openModal={openModal}
        anchorEl={anchorEl}
      />
    </ListItem>
  )
}

export default SidePanelTabFolders
