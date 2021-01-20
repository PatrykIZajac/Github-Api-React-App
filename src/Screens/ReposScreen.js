import React, { useContext } from "react";
import "./ReposScreen.css";
import SearchContext from "../Context/SearchContext";
import { useLocation } from "react-router-dom";
import Cards from "../Components/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import InputRadioBtn from "../Components/InputRadioBtn";

function ReposScreen() {
  const {
    radioRepoBtn,
    repoCommits,
  } = useContext(SearchContext);
  const location = useLocation();

  const listItemsCommits = repoCommits.map(
    (element) => {
      return (
        <li class="commitsTable">
          <div
            class="singleRow"
            onClick={() => {
              window.open(element.html_url);
            }}
          >
            {element.author ===
            undefined ? null : (
              <div class="tableRow">
                <div class="elementColumn">
                  <span class="commitMessage">
                    {element.commit.message}
                  </span>

                  {element.committer != null ? (
                    <div class="authorRow">
                      <img
                        class="commitImage"
                        src={
                          element.committer
                            .avatar_url
                        }
                        alt="avatar"
                      />
                      <span>
                        {element.committer.login}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div class="elementStats">
                  <span>
                    {element.commit.author.date.substr(
                      0,
                      10
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </li>
      );
    }
  );

  const listItemsContributors = repoCommits.map(
    (element) => {
      return (
        <li>
          <Cards
            avatar={element.avatar_url}
            login={element.login}
          />
        </li>
      );
    }
  );

  const listItemsIssues = repoCommits.map(
    (element) => {
      return (
        <li
          class="commitsTable"
          onClick={() => {
            window.open(element.html_url);
          }}
        >
          <div class="singleRow">
            <div class="tableRow">
              <div class="elementColumn">
                <span class="commitMessage">
                  {element.title}
                </span>
              </div>

              {element.labels !== undefined && (
                <div class="elementTag">
                  {element.labels[0] !==
                    undefined && (
                    <span>
                      {element.labels[0].name}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </li>
      );
    }
  );

  return (
    <div class="ContainerRepos">
      <div class="navBar">
        <span>{location.state.name}</span>
        <div class="statsBar">
          <div class="singleRowStats">
            <FontAwesomeIcon
              icon={faEye}
              color="grey"
            />
            <span>{location.state.watchers}</span>
          </div>

          <div class="singleRowStats">
            <FontAwesomeIcon
              icon={faStar}
              color="gold"
            />
            <span>{location.state.stars}</span>
          </div>

          <div class="singleRowStats">
            <FontAwesomeIcon
              icon={faLockOpen}
              color="black"
            />
            <span>{location.state.issues}</span>
          </div>

          <div class="singleRowStats">
            <FontAwesomeIcon
              icon={faCodeBranch}
              color="green"
            />
            <span>{location.state.forks}</span>
          </div>
        </div>
      </div>

      <div class="radioContainer">
        <div class="radioButtons">
          <ul class="choose">
            <li>
              <InputRadioBtn
                id={"commits"}
                value={"commits"}
                labelName={"Commits"}
              />
            </li>
            <li>
              <InputRadioBtn
                id={"issues"}
                value={"issues"}
                labelName={"Issues"}
              />
            </li>
            <li>
              <InputRadioBtn
                id={"contributors"}
                value={"contributors"}
                labelName={"Contributors"}
              />
            </li>
          </ul>
        </div>
      </div>

      {repoCommits.length !== 0 &&
      radioRepoBtn === "commits" ? (
        <ul>{listItemsCommits}</ul>
      ) : null}

      {repoCommits.length !== 0 &&
      radioRepoBtn === "issues" ? (
        <ul>{listItemsIssues}</ul>
      ) : null}

      {repoCommits.length !== 0 &&
      radioRepoBtn === "contributors" ? (
        <ul>{listItemsContributors}</ul>
      ) : null}
    </div>
  );
}

export default ReposScreen;
