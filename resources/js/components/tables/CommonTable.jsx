import React, { useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableFooter,
    TablePagination,
    TableRow,
    Chip,
    IconButton,
    Box,
    useTheme,
    styled,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    FirstPage as FirstPageIcon,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage as LastPageIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";

// Custom styled Paper component
const StyledPaper = styled(Paper)(({ theme }) => ({
    width: "100%",
    overflow: "hidden",
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
}));

// Custom styled TableRow for alternating row colors
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
        backgroundColor: theme.palette.action.selected,
    },
}));

// Custom styled TableCell for header
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

// Pagination actions component
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
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
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
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

export default function CommonTable({
    rows,
    columns,
    handleAction,
    tableType,
    extMenuItems,
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // State for action menu
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Open action menu
    const handleActionClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    // Close action menu
    const handleActionClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    // Function to get color based on status
    const getColor = (status) => {
        switch (status) {
            case "Pending":
                return "warning";
            case "Processing":
                return "info";
            case "Accepted":
                return "info";
            case "Cancel":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <StyledPaper>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table" className="p-4">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align || "left"}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((row) => (
                                <StyledTableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align || "left"}
                                            >
                                                {column.id === "status" ? (
                                                    <Chip
                                                        label={value}
                                                        color={getColor(value)}
                                                        size="small"
                                                        sx={{
                                                            borderRadius: "4px",
                                                        }}
                                                    />
                                                ) : column.id === "action" ? (
                                                    <IconButton
                                                        aria-label="actions"
                                                        onClick={(event) =>
                                                            handleActionClick(
                                                                event,
                                                                row,
                                                            )
                                                        }
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </StyledTableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={columns.length}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{
                                    borderBottom: "none",
                                    "& .MuiTablePagination-toolbar": {
                                        backgroundColor: (theme) =>
                                            theme.palette.background.default,
                                        borderRadius: "0 0 12px 12px",
                                    },
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleActionClose}
            >
                <MenuItem onClick={() => handleAction("Edit", selectedRow)}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => handleAction("Delete", selectedRow)}>
                    Delete
                </MenuItem>
                {tableType === "user"
                    ? extMenuItems.map((value) => {
                          return (
                              <MenuItem
                                  key={value}
                                  onClick={() =>
                                      handleAction(value, selectedRow)
                                  }
                              >
                                  {value}
                              </MenuItem>
                          );
                      })
                    : ""}
            </Menu>
        </StyledPaper>
    );
}
