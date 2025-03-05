import { useState, useEffect } from "react";
import API from "../../../../config/api";
import dayjs from "dayjs";

// components
import CommonTable from "./CommonTable";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "phone", label: "Phone", minWidth: 100 },
  { id: "company", label: "Company", minWidth: 100 },
  { id: "address", label: "Address", minWidth: 100 },
  { id: "city", label: "City", minWidth: 100 },
  { id: "country", label: "Country", minWidth: 100 },
  { id: "state", label: "State", minWidth: 100 },
  { id: "postal_code", label: "Postal Code", minWidth: 120 },
];

export default function AddressBookTable() {
  const [addressBook, setAddressBook] = useState([]);

  async function fetchAddressBook() {
    const apiv = API("v2");
    const res = await apiv.get(`/address-books`);
    // // console.log(`address => `, res);
    setAddressBook(res.data);
  }

  useEffect(() => {
    fetchAddressBook();
  }, []);

  const editAddress = async (addressbook) => {
    const apiv = API("v2");
    const res = await apiv.get("/address-books/" + addressbook.id);
    buildLocalStorage(res.data[0]);
  };

  const deleteAddress = async (addressbook) => {
    const apiv = API("v2");
    const res = await apiv.delete("/address-books/" + addressbook.id);
    // buildLocalStorage(res.data[0]);
    // console.log("res => ", res);
  };

  return addressBook.length > 0 ? (
    <CommonTable
      columns={columns}
      rows={addressBook}
      handleEdit={editAddress}
      handleDelete={deleteAddress}
    />
  ) : (
    <div className="text-center fw-bold p-5">
      <div>You don't have any addresses.</div>
    </div>
  );
}
