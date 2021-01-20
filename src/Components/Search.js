import "./Search.css";
import React, { useContext } from "react";
import SearchContext from "../Context/SearchContext";
import PaginationContext from "../Context/PaginationContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function Search() {
  const {
    handleSetUserInput,
    selectedOrder,
    userInput,
    searchByName,
    handleSetUserRadioBtn,
    userRadioBtn,
    searchByNameRepos,
    handleSetRepos,
    handleSetUsers,
  } = useContext(SearchContext);

  const { setNextPage } = useContext(
    PaginationContext
  );
  const notify = () =>
    toast.warn(
      "search place is empty, please write what you looking for!"
    );

  const handleKeyPress = (event) => {
    try {
      if (
        event.key === "Enter"
      ) {
        if (userRadioBtn === "User") {
          searchByName(userInput, selectedOrder);
        } else {
          searchByNameRepos(
            userInput,
            selectedOrder
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="container">
      <div class="radioButtons">
        <ul class="choose">
          <li>
            <input
              type="radio"
              id="user"
              value="User"
              name="rButton"
              onChange={() => {
                handleSetUserRadioBtn("User");
                handleSetUserInput("");
                handleSetRepos([]);
                setNextPage(null);
              }}
              defaultChecked={
                userRadioBtn === "User"
              }
            />
            <label htmlFor="user">User</label>
          </li>
          <li>
            <input
              type="radio"
              id="repos"
              value="Repos"
              name="rButton"
              onChange={() => {
                handleSetUserRadioBtn("Repos");
                handleSetUserInput("");
                handleSetUsers([]);
                setNextPage(null);
              }}
              defaultChecked={
                userRadioBtn === "Repos"
              }
            />
            <label htmlFor="repos">Repos</label>
          </li>
        </ul>
      </div>

      <div class="input">
        <input
          value={userInput}
          type="text"
          onChange={(e) => {
            handleSetUserInput(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <label>Search</label>
      </div>

      <button
        class="btn"
        type="submit"
        onClick={() => {
          if (userInput !== "") {
            if (userRadioBtn === "User") {
              searchByName(
                userInput,
                selectedOrder
              );
            } else {
              searchByNameRepos(
                userInput,
                selectedOrder
              );
            }
          }else{
            notify();
          }
        }}
      >
        <span>Submit</span>
      </button>
    </div>
  );
}
