import React, { useContext } from "react";
import SearchContext from "../Context/SearchContext";
import "./ReposList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

function ReposList() {
  const {
    reposList,
    getDataAboutSpecificRepo,
    setRepoCommitsHandler,
    commitsStatus,
  } = useContext(SearchContext);
  const history = useHistory();
  const listItems = reposList.map((element) => {
    return (
      <li>
        <div
          class="cardRepos"
          onClick={() => {
            getDataAboutSpecificRepo(
              element.full_name,
              "commits"
            );
            if (commitsStatus !== false) {
              history.push({
                pathname: "/repo",
                state: {
                  name: element.full_name,
                  forks: element.forks,
                  watchers: element.watchers,
                  issues: element.open_issues,
                  stars: element.stargazers_count,
                },
              });
              setRepoCommitsHandler();
            }
          }}
        >
          <div class="nameOfRepo">
            <FontAwesomeIcon
              icon={faBook}
              color="grey"
            />
            <a>{element.full_name}</a>
          </div>

          <div class="descriptionRepo">
            <span>{element.description}</span>
          </div>

          <div class="statsInRepoCard">
            <div class="singleIconWithDesc">
              <FontAwesomeIcon
                icon={faStar}
                color="gold"
              />
              <span>
                {element.stargazers_count}
              </span>
            </div>

            <div class="singleIconWithDesc">
              <FontAwesomeIcon
                icon={faCodeBranch}
                color="green"
              />
              <span>{element.forks}</span>
            </div>

            <div class="singleIconWithDesc">
              <FontAwesomeIcon
                icon={faLockOpen}
                color="black"
              />
              <span>{element.open_issues}</span>
            </div>

            <div class="singleIconWithDesc">
              <FontAwesomeIcon
                icon={faRuler}
                color="grey"
              />
              <span>{element.size}</span>
            </div>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div class="listContainer">
      <ul>{listItems}</ul>
    </div>
  );
}

export default ReposList;
