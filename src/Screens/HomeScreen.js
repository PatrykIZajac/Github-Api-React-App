import Header from "../Components/Header";
import Search from "../Components/Search";
import React, {
  useContext,
  useEffect,
} from "react";
import SearchContext from "../Context/SearchContext";
import UsersList from "../Components/UsersList";
import ReposList from "../Components/ReposList";
import FilterPanel from "../Components/FilterPanel";
import FilterPanelUser from "../Components/FilterPanelUser";
import PaginationBar from "../Components/paginationBar";
import PaginationContext from "../Context/PaginationContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomeScreen() {
  const {
    searchByName,
    searchByNameRepos,
    userInput,
    selectedOrder,
    usersList,
    userRadioBtn,
    reposList,
  } = useContext(SearchContext);
  const { page } = useContext(PaginationContext);

  useEffect(() => {
    try {
      if (userInput !== "") {
        switch (userRadioBtn) {
          case "User":
            searchByName(userInput);
            break;
          case "Repos":
            searchByNameRepos(userInput);
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [page, selectedOrder]);

  return (
    <div>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />
      <Search />
      {usersList.length === 0 ||
      userRadioBtn === "Repos" ? null : (
        <>
          <FilterPanelUser />
          <UsersList />
          <PaginationBar />
        </>
      )}

      {reposList.length === 0 ||
      userRadioBtn === "User" ? null : (
        <>
          <FilterPanel />
          <ReposList />
          <PaginationBar />
        </>
      )}
    </div>
  );
}

export default HomeScreen;
