import React, { useContext } from "react";
import SearchContext from '../Context/SearchContext';
import { useLocation } from "react-router-dom";

export default function InputRadioBtn({
  id,
  value,
  labelName,
}) {
    const {
        getDataAboutSpecificRepo,
        handleChangeRadioRepoBtn,
        radioRepoBtn,
      } = useContext(SearchContext);
      const location = useLocation();
  return (
    <div>
      <input
        type="radio"
        id={id}
        value={value}
        name="rButton"
        onChange={(e) => {
          handleChangeRadioRepoBtn(
            e.target.value
          );
          getDataAboutSpecificRepo(
            location.state.name,
            e.target.value
          );
          console.log(
            e.target.value,
            "WARTOSC RADIO USER"
          );
        }}
        defaultChecked={
          radioRepoBtn === value
        }
      />
      <label htmlFor={id}>{labelName}</label>
    </div>
  );
}
