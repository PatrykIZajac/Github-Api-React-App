import React, {
  useContext,
} from "react";
import SearchContext from "../Context/SearchContext";
import PaginationContext from "../Context/PaginationContext";

export default function PaginationBar() {
  const {
    resultsCount,
  } = useContext(SearchContext);
  const { setNextPage, page } = useContext(
    PaginationContext
  );

  const innerCount = parseInt(resultsCount) / 12;

  const counts = Array.from(
    Array(Math.round(innerCount)).keys()
  );

  const listItems = counts.map(
    (element, index) => {
      return (
          <div>
            {parseInt(element) < 10 ? (
                <li>
                  {parseInt(element) < 10 ? (
                    <>
                      <input
                        defaultChecked={
                          page === index + 1 ||
                          (index === 0 && page === null)
                        }
                        type="radio"
                        id={element}
                        value={element}
                        name="rButton2"
                        onChange={(e) => {
                          setNextPage(
                            parseInt(e.target.value) + 1
                          );
                        }}
                      />
                      <label htmlFor={element}>
                        {element + 1}
                      </label>
                    </>
                  ) : null}
                </li>
            ) : null}
          </div>
      );
    }
  );
  return (
    <div>
      <div class="radioContainer">
        <div class="radioButtons">
          <ul class="choose">{listItems}</ul>
        </div>
      </div>
    </div>
  );
}
