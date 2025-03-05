import { useState, useEffect } from "react";
import API from "../../../../config/api";
import dayjs from "dayjs";

// components
import CommonTable from "./CommonTable";

const columns = [
  {
    id: "createdAt",
    label: "Created",
    minWidth: 170,
    format: (value) => dayjs(value).format("YYYY-MM-DD HH:MM"),
  },
  { id: "cid", label: "CID", minWidth: 100 },
  { id: "reason", label: "Reason", minWidth: 100 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 150,
    format: (value) => `$${value ? value : 0.0}`,
  },
  { id: "provider", label: "Provider", minWidth: 120 },
  { id: "type", label: "Type", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
];

const TransactionsTable = (props) => {
  const { handleEdit, handleDelete } = props;
  const [transactions, setTransactions] = useState([]);

  async function fetchTransactions() {
    const apiv = API("v2");
    const res = await apiv.get(`/transactions`);
    // // console.log(`res => `, res);
    setTransactions(res.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return transactions.length > 0 ? (
    <CommonTable
      columns={columns}
      rows={transactions}
      // handleEdit={handleEdit}
      // handleDelete={handleDelete}
    />
  ) : (
    <div className="text-center fw-bold p-5">
      <div>You don't have any transactions</div>
    </div>
  );
};

export default TransactionsTable;
