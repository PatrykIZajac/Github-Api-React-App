import React, {
  useContext,
  useEffect,
} from "react";
import "./UserProfileScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import SearchContext from "../Context/SearchContext";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import {
  useHistory,
  useParams,
} from "react-router-dom";
import Loader from "react-loader-spinner";

function UserProfileScreen() {
  const {
    currentUser,
    currentUserRepos,
    getDataAboutSpecificRepo,
    handleChangeRadioRepoBtn,
    searchByNameUserProfile,
    getReposOfCurrentUser,
    reposUserStatus,
  } = useContext(SearchContext);

  const history = useHistory();
  const { login } = useParams();

  useEffect(() => {
    try {
      searchByNameUserProfile(login);
      getReposOfCurrentUser(login);
    } catch (error) {
    }
  }, []);

  const repos = currentUserRepos.slice(0, 4);
  const reposList = repos.map((element) => {
    return (
      <div
        class="repoCard"
        onClick={() => {
          getDataAboutSpecificRepo(
            element.full_name,
            "commits"
          );
          handleChangeRadioRepoBtn("commits");
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
        }}
      >
        <span class="repository__name">
          {element.name}
        </span>

        {element.description !== "" ? (
          <p>{element.description}</p>
        ) : null}

        <div class="statsInUserRepo">
          <div class="singleIconWithDesc">
            <FontAwesomeIcon
              icon={faStar}
              color="grey"
            />
            <span>
              {element.stargazers_count}
            </span>
          </div>

          <div class="singleIconWithDesc">
            <FontAwesomeIcon
              icon={faCodeBranch}
              color="grey"
            />
            <span>{element.forks}</span>
          </div>

          <div class="singleIconWithDesc">
            <FontAwesomeIcon
              icon={faLockOpen}
              color="grey"
            />
            <span>{element.open_issues}</span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      {currentUser.login !== login ||
      reposUserStatus === false ? (
        <div class="loader">
          <Loader
            type="Puff"
            color="#03ff4b"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div class="mainContainer">
          <div class="container2">
            <img
              src={currentUser.avatar_url}
              alt="Avatar"
              class="avatar"
            />
            <div class="nameContainer">
              <span class="name">
                {currentUser.name}
              </span>
              <span class="login">
                {currentUser.login}
              </span>
            </div>
            {currentUser.bio == null ? null : (
              <p>{currentUser.bio}</p>
            )}
            <div class="stats">
              <div class="rowInStats">
                <FontAwesomeIcon icon={faUsers} />
                <span>
                  <a>{currentUser.followers}</a>
                  followers
                </span>
              </div>
              <div class="rowInStats">
                <FontAwesomeIcon
                  icon={faUserFriends}
                />
                <span>
                  <a>{currentUser.following}</a>
                  following
                </span>
              </div>
              <div class="rowInStats">
                <FontAwesomeIcon icon={faBook} />
                <span>
                  <a>
                    {currentUser.public_repos}
                  </a>
                  repos
                </span>
              </div>
            </div>
            {currentUser.location !== null && (
              <div class="countryText">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                />
                <span>
                  {currentUser.location}
                </span>
              </div>
            )}
          </div>
          {currentUserRepos.length !== 0 && (
            <div class="reposBox">
              <span class="headerSpan">
                Pinned Repositories
              </span>
              <>{reposList}</>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfileScreen;
