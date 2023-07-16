// import App from "./App.jsx";
import StarRating from "./StarRating";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function RateMyWorld() {
  const [rateWorld, setRateWorld] = useState(0);

  return (
    <>
      <StarRating maxRating={6} onSetRating={setRateWorld} />
      <p>my world is rated {rateWorld} stars!!</p>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <StarRating maxRating={10} />
    <StarRating
      maxRating={5}
      size={24}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating maxRating={5} color="red" />
    <StarRating maxRating={5} defaultRating={3} color="red" />
    <RateMyWorld />
  </>
);
