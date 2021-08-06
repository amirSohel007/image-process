import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [filter, setfilter] = useState({
    filterType: "",
    filterRange: 0,
    onSlide: () => {},
  });

  const [image, setImage] = useState("https://bit.ly/3rYnBUf");
  const [isProcess, setProcess] = useState(false);

  const handleApplyFilter = () => {
    setProcess(true);
    axios
      .post("https://deeperimage.herokuapp.com", {
        image_path: "image/image3.jpg",
        attr: filter.filterType,
        attr_val: filter.filterRange,
      })
      .then((res) => {
        const data = res.data;
        setImage(`data:image/jpeg;base64,${data}`);
        setProcess(false);
      });
  };

  const handleFilter = (e, filterName) => {
    setfilter((s) => ({
      ...s,
      filterRange: e.target.value,
      filterType: filterName,
      onSlide: () => {},
    }));
    handleApplyFilter();
  };

  const filterList = [
    {
      name: "Hist",
      type: "hist",
    },
    {
      name: "Gamma",
      type: "gamma",
    },
    {
      name: "Contrast",
      type: "contrast",
    },
  ];

  return (
    <div>
       <h5>Apply Filters </h5>
      <div class="container">
        <div className="main-content">
          {isProcess && (
            <div className="spinner-wrapper">
              <img
                className="spinner"
                src="https://abergeldie.com.au/wp-content/uploads/2015/12/ajax-loader-large.gif"
                alt="spinner"
              />
            </div>
          )}
          <img
            alt="filterd-img"
            src={image}
            style={{ width: 400, height: "auto" }}
          />
        </div>

        <div className="sliders">
          {filterList.map((filter) => {
            return (
              <div className="filter-range">
                <label htmlFor={filter.type}>{filter.name}</label>
                <input
                  id={filter.type}
                  type="range"
                  value={filter.filterRange}
                  onChange={(e) => handleFilter(e, filter.type)}
                  min={0}
                  max={20}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
