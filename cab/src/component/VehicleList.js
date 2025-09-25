import React from "react";
import "./VehicleList.css"; // Updated CSS file name
import car1 from '../image/car1.jpg';
import car2 from '../image/car2.jpg';

const vehicles = [
  {
    id: 1,
    name: "Tesla Model S",
    image: car1,
    price: "₹8000",
  },
  {
    id: 2,
    name: "BMW M4",
    image: car2,
    price: "₹4000",
  },
  {
    id: 3,
    name: "Audi R8",
    image: car1,
    price: "₹1000",
  },
];

const VehicleList = () => {
  return (
    <div className="vehicle-container">
      {vehicles.map((vehicle) => (
        <div className="vehicle-card" key={vehicle.id}>
          <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
          <h3 className="vehicle-name">{vehicle.name}</h3>
          <p className="vehicle-price">{vehicle.price}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
