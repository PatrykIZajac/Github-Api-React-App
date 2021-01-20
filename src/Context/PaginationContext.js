import React, { useState } from "react";
const PaginationContext = React.createContext();
export const PaginationProvider = ({
  children,
}) => {
  const [page, setPage] = useState(null);

  const setNextPage = (value) => {
    setPage(value);
  };

  return (
    <PaginationContext.Provider
      value={{
        setNextPage: setNextPage,
        page: page,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationContext;