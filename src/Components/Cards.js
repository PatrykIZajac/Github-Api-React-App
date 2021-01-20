import "./Cards.css";
import React from "react";
import { Link } from "react-router-dom";


export default function Cards({ avatar, login }) {
  return (
    <div>
      <Link to={`/profile/${login}`}>
        <div class="card">
          <div class="card-image">
            <img src={avatar} alt="avatar" />
          </div>
          <div class="card-text">
            <p>{login}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
