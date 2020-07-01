import React, { useState } from "react";
import { Pagination, Container } from "semantic-ui-react";
import BookItem from "./Book_item";

const PaginationI = () => {
  const [page, setActivePage] = useState(0); // manage the state of activePage

  function PageChange(event, data) {
    setActivePage(data.activePage); // update the state in event handler
    
  }

  return (
    <Container style={{ textAlign: "center", padding: "4rem" }}>
      <BookItem page={page} /> {/* render your component */}
      <Pagination
        defaultActivePage={5}
        totalPages={10}
        onPageChange={PageChange} /> {/* pass event handler */}
    </Container>
  );
};

export default PaginationI;