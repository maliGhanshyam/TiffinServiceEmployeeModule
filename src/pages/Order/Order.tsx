import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  TablePagination,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { formatDate } from "../../utils/formatDate";
import { buttonStyles, getStatusBadgeStyle, styles } from "./Order.styles";
import { useSnackbar } from "../../hook";
import { OrderValue } from "../../services/Order/Order.types";
import { getAllOrders, searchOrders } from "../../services/Order/Order";
// import { ConfirmationDialog } from "../../components/ConfirmationDialog";

export default function Order() {
  const [page, setPage] = useState(0); // Current page
  const [orders, setOrders] = useState<OrderValue[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmOpenDialog, setConfirmOpenDialog] = useState(false); //confirmation dialog
  const [selectedOrder, setSelectedOrder] = useState<OrderValue | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<any>(null);
  const limit = rowsPerPage; // Set limit to 2 items per page
  const { showSnackbar } = useSnackbar();

  const fetchOrders = async (
    page: number,
    limit: number,
    status: string | null = null
  ) => {
    try {
      const { data, totalItems, totalPages } = status
        ? await getAllOrders(page + 1, limit, status)
        : await getAllOrders(page + 1, limit);
      console.log(statusFilter, data);
      setOrders(data || []);
      setTotalItems(totalItems);
      setTotalPages(totalPages);
    } catch (error) {
      showSnackbar("Error fetching orders", "error");
      setOrders([]);
    }
  };
  // Search orders
  const searchOrder = async (
    query: string = "",
    page: number = 0,
    limit: number = 2
  ) => {
    try {
      const { data, totalItems, totalPages } = await searchOrders(
        query,
        page + 1,
        limit
      );
      setOrders(data || []);
      setTotalItems(totalItems);
      setTotalPages(totalPages);
    } catch (error) {
      showSnackbar("Search error", "error");
      setOrders([]);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchOrder(searchTerm, page, limit);
    } else {
      fetchOrders(page, limit, statusFilter);
    }
  }, [searchTerm, page, limit, statusFilter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when rows per page change
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      searchOrder(event.target.value);
    }, 300);
    setDebounceTimeout(timeout);
  };
  useEffect(() => {
    if (!searchTerm) {
      setOrders([]); // Clear the orders when there's no search term
    }
  }, [searchTerm]);
  const openOrderDetails = (order: OrderValue) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };
  const closeDialogConfirm = () => {
    setConfirmOpenDialog(false);
    setSelectedOrder(null);
  };
  // const handleApprove = async (orderId: string) => {
  //   await confirmOrders(orderId);
  //   showSnackbar("Order Confirm Sucessfully.", "success");
  //   await fetchOrders(page, limit);
  // };

  // const handleReject = async (orderId: string) => {
  //   await cancelOrders(orderId);
  //   showSnackbar("Order Rejected Sucessfully.", "success");
  //   await fetchOrders(page, limit);
  // };
  const Row = ({ order }: { order: OrderValue }) => {
    const [open, setOpen] = useState(false);

    // const handleApproveClick = () => {
    //   setActionType("approve");
    //   setSelectedOrder(order);
    //   setConfirmOpenDialog(true);
    // };

    // const handleRejectClick = () => {
    //   setActionType("reject");
    //   setSelectedOrder(order);
    //   setConfirmOpenDialog(true);
    // };
    const isApproved = order.delivery_status === "delivered";
    const isRejected = order.delivery_status === "cancelled";
    return (
      <>
        <TableRow sx={styles.tableRowStyle}>
          <TableCell sx={styles.tableCellStyleNone}>
            {formatDate(order.created_at)}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNone}>
            {order.cart.retailer_name}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            {order.payment_mode}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            {order.cart.total_amount}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            <span
              style={
                getStatusBadgeStyle(order.payment_status) as React.CSSProperties
              }
            >
              {order.payment_status}
            </span>
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            <span
              style={
                getStatusBadgeStyle(
                  order.delivery_status
                ) as React.CSSProperties
              }
            >
              {order.delivery_status}
            </span>
          </TableCell>
          {/* <TableCell sx={styles.tableCellStyleNormal}>
            {order.cart.customer_contact}
          </TableCell> */}
          <TableCell sx={styles.tableCellStyleNone}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => openOrderDetails(order)}
            >
              {open ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </TableCell>
          {/* <TableCell sx={styles.tableCellStyleNone}>
            <IconButton
              onClick={handleApproveClick}
              // onClick={() => handleApprove(order._id)}
              color="success"
              sx={styles.iconButtonStyle}
              disabled={isApproved || isRejected}
            >
              <CheckCircle />
            </IconButton>
            <IconButton
              onClick={handleRejectClick}
              // onClick={() => handleReject(order._id)}
              color="error"
              sx={styles.iconButtonRejectStyle}
              disabled={isRejected || isApproved}
            >
              <Cancel />
            </IconButton>
          </TableCell> */}
        </TableRow>
      </>
    );
  };

  return (
    <Paper sx={styles.paperStyle}>
      <Box sx={styles.boxStyle}>
      <Box sx={styles.boxStyleButton}>
        <Button
          onClick={() => {
            setStatusFilter("pending");
            setPage(0);
            fetchOrders(0, limit, "pending");
          }}
          sx={{
            ...buttonStyles.baseButton,
            ...(statusFilter === "pending"
              ? buttonStyles.activeButton
              : buttonStyles.defaultButton),
          }}
          variant="outlined"
        >
          Pending
        </Button>
        <Button
          onClick={() => {
            setStatusFilter("cancelled");
            setPage(0);
            fetchOrders(0, limit, "cancelled");
          }}
          sx={{
            ...buttonStyles.baseButton,
            ...(statusFilter === "cancelled"
              ? buttonStyles.activeButton
              : buttonStyles.defaultButton),
          }}
          variant="outlined"
        >
          Cancelled
        </Button>
        <Button
          onClick={() => {
            setStatusFilter("delivered");
            setPage(0);
            fetchOrders(0, limit, "delivered");
          }}
          sx={{
            ...buttonStyles.baseButton,
            ...(statusFilter === "delivered"
              ? buttonStyles.activeButton
              : buttonStyles.defaultButton),
          }}
          variant="outlined"
        >
          Delivered
        </Button>
        <Button
          onClick={() => {
            setStatusFilter(null);
            setPage(0);
            fetchOrders(0, limit);
          }}
          sx={{
            ...buttonStyles.baseButton,
            ...(statusFilter === null
              ? buttonStyles.activeButton
              : buttonStyles.defaultButton),
          }}
          variant="outlined"
        >
          All Orders
        </Button>
        </Box>
        <Box sx={styles.boxStyleSearch}>
        <TextField
          fullWidth
          label="Search by Names & Type"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "auto" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      </Box>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={styles.background}>
            <TableRow>
              <TableCell sx={styles.fontWeightBold}>Date</TableCell>
              <TableCell sx={styles.fontWeightBold}>Retailer Name</TableCell>
              <TableCell sx={styles.tableCellStyleFont}>Payment Mode</TableCell>
              <TableCell sx={styles.tableCellStyleFont}>Total Amount</TableCell>
              <TableCell sx={styles.tableCellStyleFont}>Payment Status</TableCell>
              <TableCell sx={styles.tableCellStyleFont}>Delivery Status</TableCell>
              <TableCell sx={styles.fontWeightBold}>View Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => <Row key={order._id} order={order} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{ display: searchTerm ? "none" : "block" }}
      />
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Items in Cart</DialogTitle>
        <DialogContent>
          <Table size="small" aria-label="items">
            <TableHead sx={styles.background}>
              <TableRow>
                <TableCell sx={styles.fontWeightBold}>Tiffin Name</TableCell>
                <TableCell sx={styles.fontWeightBold}>
                  Quantity
                </TableCell>
                <TableCell sx={styles.tableCellStyleFont}>
                  Type
                </TableCell>
                <TableCell sx={styles.fontWeightBold}>
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrder?.cart.items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.tiffin_name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell sx={styles.tableCellStyleNormal}>
                    {item.tiffin_type}
                  </TableCell>
                  <TableCell>{item.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
