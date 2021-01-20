import React, { useContext } from "react";
import Cards from "../Components/Cards";
import SearchContext from "../Context/SearchContext";
import "./UsersList.css";

function UsersList() {
  const { usersList } = useContext(SearchContext);
  const listItems = usersList.map((element) => {
    return (
      <li>
        <Cards
          avatar={element.avatar_url}
          login={element.login}
        />
      </li>
    );
  });
  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}

export default UsersList;
