import React, { useContext} from "react";
import SearchContext from "../Context/SearchContext";
import "./FilterPanel.css";

function FilterPanelUser() {
  const {setValueToSelectedOrder, selectedOrder,} = useContext(
    SearchContext
  );

  return (
    <div class="customSelect">
      <p>Order By</p>
      <select onChange={(e)=>{
          setValueToSelectedOrder(e.target.value);
          console.log(e.target.value);
      }}>
        <option value="best-match" selected={selectedOrder==='best-match'}>Best match</option>
        <option value="followers" selected={selectedOrder==='followers'}>Followers</option>
        <option value="repositories" selected={selectedOrder==='repositories'}>Repositories</option>
      </select>
    </div>
  );
}

export default FilterPanelUser;
