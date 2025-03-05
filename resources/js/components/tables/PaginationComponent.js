import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ itemsPerPage = 10, totalItems }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTotalPages = async () => {
      //   const totalItems = await totalItems(page, itemsPerPage);
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    };

    fetchTotalPages();
  }, [page, itemsPerPage, totalItems]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default PaginationComponent;
