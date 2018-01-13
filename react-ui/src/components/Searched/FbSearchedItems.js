import React from "react";
import "./Searched.css";

export const FbSearchedItems = props => (
  <li className={props.className}>
    <p> Name of Restaurant: {props.restaurantData.name} </p>
    <p> Address: {props.restaurantData.single_line_address} </p>
    <p> Phone: {props.restaurantData.phone} </p>
    <button className='button'
      onClick={props.getYelpAddToDb}
      value={props.value}
      data-address={props.dataAddress}
      data-city={props.dataCity}
      data-name={props.dataName}
      data-phone={props.dataPhone}
    >
    Track
    </button>
  </li>
);