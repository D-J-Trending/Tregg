import React from "react";
import "./Searched.css";

export const Searched = ({children}) => (
  <div className="list-overflow-container-searched">
      <ul className="list-group">
        {children}
      </ul>
    </div>
);
