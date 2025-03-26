import React from "react";
import Omit from "./DataTable";

const Table = ({ post, table }) => {

  return (
    <div>
      <Omit table={table} postTable={post} />
    </div>

  )
};

export default Table;
