import React from "react";
import "./flight.scss";
import axios from "axios";
function Flight() {
  const options = {
    method: "GET",
    url: "https://skyscanner44.p.rapidapi.com/search-extended",
    params: {
      adults: "1",
      origin: "MUC",
      destination: "BER",
      departureDate: "2022-10-11",
      currency: "EUR",
      stops: "0,1,2",
      duration: "50",
      startFrom: "00:00",
      arriveTo: "23:59",
      returnStartFrom: "00:00",
      returnArriveTo: "23:59",
    },
    headers: {
      "X-RapidAPI-Key": "f7ea387d9bmshf02835302fd948bp11b4a7jsnfbda213e7f89",
      "X-RapidAPI-Host": "skyscanner44.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return (
    <div className="flight">
      <h1>Flights</h1>
    </div>
  );
}

export default Flight;
