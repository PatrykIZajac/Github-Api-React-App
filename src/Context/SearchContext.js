import React, {
  useContext,
  useState,
} from "react";
import axios from "axios";
import PaginationContext from "../Context/PaginationContext";
import { toast } from "react-toastify";

const SearchContext = React.createContext();
export const SearchProvider = ({ children }) => {
  const { page } = useContext(PaginationContext);
  const [userInput, setUserInput] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [reposList, setReposList] = useState([]);
  const [
    userRadioBtn,
    setUserRadioBtn,
  ] = useState("User");
  const [currentUser, setCurrentUser] = useState(
    ""
  );
  const [
    currentUserRepos,
    setCurrentUserRepos,
  ] = useState([]);
  const [
    selectedOrder,
    setSelectedOrder,
  ] = useState("best-match");
  const [repoCommits, setRepoCommits] = useState(
    []
  );
  const setRepoCommitsHandler = () => {
    setRepoCommits([]);
  };
  const [
    radioRepoBtn,
    setRadioRepoBtn,
  ] = useState("commits");

  const [
    resultsCount,
    setResultsCount,
  ] = useState(1);
  const [
    commitsStatus,
    setCommitsStatus,
  ] = useState(false);

  const setCommitsStatusHandler = (value) => {
    setCommitsStatus(value);
  };

  const [
    reposUserStatus,
    setReposUserStatus,
  ] = useState(false);

  const setReposUserHandler = (value) => {
    setReposUserStatus(value);
  };

  const notify = () =>
    toast.error(
      "End of the free requests! Please try again for a few minutes"
    );

  const handleSetUserInput = (value) => {
    setUserInput(value);
  };

  const handleSetUserRadioBtn = (value) => {
    setUserRadioBtn(value);
  };

  const handleSetRepos = (array) => {
    setReposList(array);
  };

  const handleSetUsers = (array) => {
    setUsersList(array);
  };
  const searchByName = async (userName) => {
    try {
      setUsersList([]);
      if (userName !== "") {
        const response = await axios.get(
          "https://api.github.com/search/users?q=" +
            userName +
            "&sort=" +
            selectedOrder +
            "&per_page=" +
            12 +
            "&page=" +
            page,
          {},
          {
            headers: {
              Accept:
                "application/vnd.github.v3+json",
            },
          }
        );
        setUsersList(response.data.items);
        console.log(response.data);
        setResultsCount(
          response.data.total_count
        );
      } else {
        toast.warn(
          "search place is empty, please write what you looking for!"
        );
      }
    } catch (error) {
      notify();
    }
  };

  const searchByNameRepos = async (reposName) => {
    try {
      setReposList([]);
      if (reposName !== "") {
        const response = await axios.get(
          "https://api.github.com/search/repositories?q=" +
            reposName +
            "&sort=" +
            selectedOrder +
            "&per_page=" +
            6 +
            "&page=" +
            page,
          {},
          {
            headers: {
              Accept:
                "application/vnd.github.cloak-preview+json",
            },
          }
        );
        setReposList(response.data.items);
        setResultsCount(
          response.data.total_count
        );
      }
    } catch (error) {
      notify();
    }
  };

  const searchByNameUserProfile = async (
    nameFromCard
  ) => {
    try {
      const response = await axios.get(
        "https://api.github.com/users/" +
          nameFromCard
      );
      setCurrentUser(response.data);
      setReposUserHandler(true);
    } catch (error) {
      notify();
      setReposUserHandler(false);
    }
  };

  const getReposOfCurrentUser = async (name) => {
    try {
      const response = await axios.get(
        "https://api.github.com/users/" +
          name +
          "/repos"
      );
      setCurrentUserRepos(response.data);
      setReposUserHandler(true);
    } catch (error) {
      setReposUserHandler(false);
    }
  };

  const setValueToSelectedOrder = (value) => {
    setSelectedOrder(value);
  };

  const getDataAboutSpecificRepo = async (
    name,
    parameter
  ) => {
    try {
      const response = await axios.get(
        "https://api.github.com/repos/" +
          name +
          "/" +
          parameter
      );
      setRepoCommits(response.data);
      setCommitsStatusHandler(true);
    } catch (error) {
      setCommitsStatusHandler(false);
      notify();
    }
  };

  const handleChangeRadioRepoBtn = (value) => {
    setRadioRepoBtn(value);
  };
  return (
    <SearchContext.Provider
      value={{
        handleSetUserInput: handleSetUserInput,
        userInput: userInput,
        searchByName: searchByName,
        usersList: usersList,
        userRadioBtn: userRadioBtn,
        handleSetUserRadioBtn: handleSetUserRadioBtn,
        reposList: reposList,
        searchByNameRepos: searchByNameRepos,
        searchByNameUserProfile: searchByNameUserProfile,
        currentUser: currentUser,
        getReposOfCurrentUser: getReposOfCurrentUser,
        currentUserRepos: currentUserRepos,
        setValueToSelectedOrder: setValueToSelectedOrder,
        selectedOrder: selectedOrder,
        getDataAboutSpecificRepo: getDataAboutSpecificRepo,
        handleChangeRadioRepoBtn: handleChangeRadioRepoBtn,
        radioRepoBtn: radioRepoBtn,
        repoCommits: repoCommits,
        setRepoCommitsHandler: setRepoCommitsHandler,
        resultsCount: resultsCount,
        handleSetRepos: handleSetRepos,
        handleSetUsers: handleSetUsers,
        commitsStatus: commitsStatus,
        setCommitsStatusHandler: setCommitsStatusHandler,
        reposUserStatus: reposUserStatus,
        setReposUserHandler: setReposUserHandler,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
