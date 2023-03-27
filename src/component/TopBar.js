import React from "react";

export default function TopBar() {
  return (
    <div className="top">
      <div className="tab">
        <div className="top_button">
          <button type="submit">Dashboard</button>
        </div>
        {/* <div className="top_button"><button type="submit">Companies</button></div>
                    <div className="top_button"><button type="submit">Insights</button></div>
                    <div className="top_button"><button type="submit">Saved Searches</button></div> */}
      </div>
      <div className="outer_right">
        <div className="search_bar_wrap">
          <div className="icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="search">
            <input type="text" placeholder="Search.." />
          </div>
        </div>

        <div className="profile">
          <p>SM</p>
        </div>
      </div>
    </div>
  );
}
