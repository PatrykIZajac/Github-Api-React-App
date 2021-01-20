import React, {
  useContext,
} from "react";
import SearchContext from "../Context/SearchContext";
import "./FilterPanel.css";

function FilterPanel() {
  const {
    setValueToSelectedOrder,
    selectedOrder,
  } = useContext(SearchContext);

  return (
    <div class="customSelect">
      <p>Order By</p>
      <select
        onChange={(e) => {
          setValueToSelectedOrder(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option value="">Best match</option>
        <option
          value="stars"
          selected={selectedOrder === "stars"}
        >
          Stars
        </option>
        <option
          value="forks"
          selected={selectedOrder === "forks"}
        >
          Forks
        </option>
        <option
          value="help-wanted-issues"
          selected={
            selectedOrder === "help-wanted-issues"
          }
        >
          Help wanted issues
        </option>
        <option value="updated">Updated</option>
      </select>
      <span class="arrow"></span>
    </div>
  );
}

export default FilterPanel;
