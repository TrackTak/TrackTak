import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  ListItemIcon,
  IconButton,
  Typography,
} from "@material-ui/core";
import GridOnIcon from "@material-ui/icons/GridOn";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTheme } from "@material-ui/styles";
import ConfirmationDialog from "./ConfirmationDialog";
import { useAuth } from "../hooks/useAuth";
import { deleteSpreadsheet, getSpreadsheets } from "../api/api";
import { isEmpty } from "lodash-es";
import { navigate } from "gatsby";
import RoundButton from "./RoundButton";

const SavedSpreadsheets = ({ onNewSpreadsheetClick }) => {
  const theme = useTheme();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const { getAccessToken, userData } = useAuth();
  const [spreadsheets, setSpreadsheets] = useState([]);
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const response = await getSpreadsheets(token?.jwtToken);
      setSpreadsheets(response.data.spreadsheets);
    }
    fetchData();
  }, [getAccessToken]);

  const handleRowClick = (spreadsheet) => {
    navigate(`/${userData.sub}/my-spreadsheets/${spreadsheet._id}`);
  };

  const handleDelete = (spreadsheet) => {
    setSelectedSpreadsheet(spreadsheet);
    setShowConfirmationDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSpreadsheet) {
      const token = await getAccessToken();
      const response = await deleteSpreadsheet(
        selectedSpreadsheet._id,
        token?.jwtToken,
      );
      if (response.status === 200) {
        const updatedSpreadsheets = spreadsheets.filter(
          (spreadsheet) => spreadsheet._id !== selectedSpreadsheet._id,
        );
        setSpreadsheets(updatedSpreadsheets);
      }
    }
  };

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false);
  };

  const cellHeaderStyle = {
    fontSize: theme.typography.table.header,
    fontWeight: "bold",
  };

  return (
    <>
      <ConfirmationDialog
        open={showConfirmationDialog}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleDeleteConfirm}
      >
        Are you sure you want to delete this valuation?
      </ConfirmationDialog>
      {isEmpty(spreadsheets) && (
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(2),
          }}
          textAlign={"center"}
        >
          <Typography gutterBottom variant="h6">
            Create your first valuation!
          </Typography>
          <RoundButton
            variant="contained"
            color="primary"
            onClick={onNewSpreadsheetClick}
            type="button"
            sx={{
              textTransform: "none",
            }}
          >
            New Valuation
          </RoundButton>
        </Box>
      )}
      {!isEmpty(spreadsheets) && (
        <TableContainer
          sx={{
            marginTop: "20px",
          }}
        >
          <Table aria-label="spreadsheet table">
            <TableHead>
              <TableRow>
                <TableCell style={cellHeaderStyle}>Name</TableCell>
                <TableCell style={cellHeaderStyle} align="right">
                  Last Modified
                </TableCell>
                <TableCell style={cellHeaderStyle} align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {spreadsheets?.map((spreadsheet) => (
                <TableRow
                  key={spreadsheet._id}
                  hover
                  onClick={() => handleRowClick(spreadsheet)}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListItemIcon>
                        <GridOnIcon />
                      </ListItemIcon>
                      {spreadsheet.sheetData.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {spreadsheet.lastModifiedTime}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{
                        borderRadius: "2px",
                        color: theme.palette.alert,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(spreadsheet);
                      }}
                      type="button"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default SavedSpreadsheets;
