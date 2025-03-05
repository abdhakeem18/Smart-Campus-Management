import { useContext, useState } from "react";

// mui
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AlertDialog from "../dialog/AlertDialogComponent";
import AppContext from "../../../../AppContext";
import { Button, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import SettingsBackupRestoreRoundedIcon from "@mui/icons-material/SettingsBackupRestoreRounded";
import { useTheme } from "@mui/material/styles";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  padding: 0,
  p: {
    color: theme.palette.text.primary,
    margin: 0,
  },
  td: {
    borderBottom: "none",
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };
  
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CommonTable(props) {
  const {
    columns,
    rows,
    handleEdit,
    handleDelete,
    handleRefund,
    handleCancel,
    handlePickUp,
    grantAccess,
    revokeAceess,
    children,
  } = props;

  const [contextData, setContextData] = useContext(AppContext);

  const [alertOptions, setAlertOptions] = useState({
    open: false,
    data: {},
    type: "delete",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    event, newPage;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function getColor(status) {
    let color = "info";

    switch (status) {
      case "In progress":
        color = "primary";
        break;

      case "Completed":
        color = "success";
        break;

      case "Pending":
        color = "warning";
        break;

      case "Processing":
        color = "info";
        break;

      case "Accepted":
        color = "info";
        break;

      case "Cancel":
        color = "error";
        break;
      default:
        break;
    }

    return color;
  }

  function isSuperUser() {
    const superUser = contextData?.user_info?.superUser;

    return superUser;
  }

  return (
    <>
      <Paper
        className="shipment-table"
        sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns &&
                  columns.map((column) => {
                    if (column.adminOnly && !isSuperUser()) return null;

                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    );
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];

                          if (column.adminOnly && !isSuperUser()) return null;

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "status" ? (
                                <Chip
                                  size="small"
                                  label={
                                    row.refund === "Accepted"
                                      ? "Accepted"
                                      : value
                                  }
                                  color={getColor(
                                    row.refund === "Accepted"
                                      ? "Accepted"
                                      : value
                                  )}
                                />
                              ) : (
                                <>
                                  {column.format
                                    ? column.format(value, row)
                                    : value}
                                </>
                              )}
                            </TableCell>
                          );
                        })}

                        <TableCell>
                          <Stack
                            justifyContent="flex-end"
                            direction="row"
                            spacing={1}
                          >
                            {isSuperUser() ? (
                              <>
                                {grantAccess && (
                                  <>
                                    {row.superUserStatus === "Pending" && (
                                      <Tooltip title="Approve">
                                        <IconButton
                                          color="success"
                                          onClick={() => grantAccess(row)}
                                        >
                                          <VerifiedUserRoundedIcon />
                                        </IconButton>
                                      </Tooltip>
                                    )}

                                    {row.superUserStatus === "Active" && (
                                      <Tooltip title="Revoke">
                                        <IconButton
                                          color="danger"
                                          onClick={() => revokeAceess(row)}
                                        >
                                          <SettingsBackupRestoreRoundedIcon />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                  </>
                                )}

                                {handleRefund && row.refund === "Requested" && (
                                  <Stack spacing={1}>
                                    <Stack direction="row" spacing={1}>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        color="success"
                                        disableElevation
                                        onClick={() => {
                                          setAlertOptions({
                                            open: true,
                                            data: row,
                                            type: "accept",
                                          });
                                        }}
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        color="error"
                                        disableElevation
                                        onClick={() => {
                                          setAlertOptions({
                                            open: true,
                                            data: row,
                                            type: "reject",
                                          });
                                        }}
                                      >
                                        Reject
                                      </Button>
                                    </Stack>
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="textSecondary"
                                      mt={1}
                                    >
                                      <em>Refund requested</em>
                                    </Typography>
                                  </Stack>
                                )}
                              </>
                            ) : (
                              ""
                            )}

                            {row.user_id === contextData?.user_info?.id && (
                              <>
                                {handleRefund &&
                                  row.status === "Completed" &&
                                  row.refund !== "Accepted" && (
                                    <>
                                      {!isSuperUser() && (
                                        <Button
                                          variant="contained"
                                          size="small"
                                          color="success"
                                          disableElevation
                                          onClick={() => {
                                            setAlertOptions({
                                              open: true,
                                              data: row,
                                              type: "request",
                                            });
                                          }}
                                        >
                                          Refund
                                        </Button>
                                      )}

                                      {row.pickup_date &&
                                      (row.pickup_request_status ===
                                        "Created" ||
                                        row.pickup_request_status ===
                                          "Failed to Cancel") ? (
                                        <Button
                                          variant="contained"
                                          size="small"
                                          color="warning"
                                          disableElevation
                                          onClick={() => {
                                            setAlertOptions({
                                              open: true,
                                              data: row,
                                              type: "cancel",
                                            });
                                          }}
                                        >
                                          Cancel Pickup
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="contained"
                                          size="small"
                                          color="warning"
                                          disableElevation
                                          onClick={() => {
                                            setAlertOptions({
                                              open: true,
                                              data: row,
                                              type: "Schedule",
                                            });
                                          }}
                                        >
                                          Schedule Pickup
                                        </Button>
                                      )}
                                    </>
                                  )}

                                {handleEdit && (
                                  <IconButton
                                    color="primary"
                                    size="small"
                                    aria-label="edit"
                                    onClick={() => handleEdit(row)}
                                  >
                                    <EditRoundedIcon fontSize="inherit" />
                                  </IconButton>
                                )}

                                {handleDelete && (
                                  <IconButton
                                    color="error"
                                    size="small"
                                    aria-label="delete"
                                    onClick={() =>
                                      setAlertOptions({
                                        open: true,
                                        data: row,
                                        type: "delete",
                                      })
                                    }
                                  >
                                    <DeleteRoundedIcon fontSize="inherit" />
                                  </IconButton>
                                )}
                                {children}
                              </>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {console.log(alertOptions.data)} */}
        {alertOptions.open ? (
          <AlertDialog
            title={
              alertOptions.type === "delete"
                ? "Delete"
                : alertOptions.type === "reject" ||
                  alertOptions.type === "accept"
                ? `${
                    alertOptions.type.charAt(0).toUpperCase() +
                    alertOptions.type.slice(1)
                  } Refund Request`
                : alertOptions.type === "cancel"
                ? "Cancel Pick-up"
                : alertOptions.type === "Schedule"
                ? "Schedule Pick-up"
                : `Request Refund`
            }
            open={alertOptions.open}
            desc={
              alertOptions.type === "delete"
                ? "Are you sure want to delete this? <br /> This can't be undone."
                : alertOptions.data.refund === "Requested" && !isSuperUser()
                ? "Your refund request is being processed. The admin will update you during the weekdays. Thank you."
                : alertOptions.type === "cancel"
                ? "Are you sure want to cancel pickup? <br /> This can't be undone."
                : alertOptions.type === "Schedule"
                ? "Please set the pickup date and time to schedule your pickup request."
                : !isSuperUser()
                ? "Are you sure you want to request a refund? <br />Could you please tell us the reason for your refund request?"
                : contextData?.user_info?.id != alertOptions.data?.user_id
                ? `Name: ${alertOptions.data.username}<br /> Email: ${alertOptions.data.user_email} <br /> Reqested Reason: ${alertOptions.data.refund_request_reason}`
                : "Are you sure you want to request a refund? <br />Could you please tell us the reason for your refund request?"
            }
            reasonField={
              (alertOptions.data.refund === "Requested" && !isSuperUser()) ||
              alertOptions.type === "accept"
                ? false
                : true
            }
            data={alertOptions.data}
            type={`${alertOptions.type}`}
            closeDialog={() => setAlertOptions({ open: false, data: {} })}
            inputLable={alertOptions.type === "reject" ? true : false}
            handleConfirm={(value) => {
              setAlertOptions({ open: false, data: {} });
          
              alertOptions.type === "delete"
                ? handleDelete(alertOptions?.data?.id)
                : alertOptions.type === "cancel"
                ? handleCancel(alertOptions.data, value, alertOptions.type)
                : alertOptions.type === "request"
                ? handleRefund(alertOptions.data, value, alertOptions.type)
                : alertOptions.type === "accept"
                ? handleRefund(alertOptions.data, "", alertOptions.type)
                : alertOptions.type === "Schedule" ? handlePickUp(alertOptions.data, value, alertOptions.type): handleRefund(alertOptions.data, value, alertOptions.type);
            }}
          />
        ) : null}
      </Paper>

      <br />

      <StyledPaper
        sx={{
          boxShadow: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="d-flex justify-content-center">
          <TablePagination
            sx={{
              p: {
                margin: 0,
              },
            }}
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={rows ? rows.length : 1}
            rowsPerPage={rowsPerPage}
            page={page}
            slotProps={{
              select: {
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              },
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </div>
      </StyledPaper>

      {/* <br />

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </>
  );
}
