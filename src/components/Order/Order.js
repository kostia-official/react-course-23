import React from "react";
import { OrderForm } from "./OrderForm/OrderForm";
import {v4 as uuid} from "uuid";

export class Order extends React.Component {
  state = {
    products: [
      {
        id: uuid(),
        name: "Шаурма",
        price: 70,
        additions: [
          { id: uuid(), name: "Грибы", price: 5 },
          { id: uuid(), name: "Сыр", price: 10 },
          { id: uuid(), name: "Ананас", price: 15 }
        ]
      },
      {
        id: uuid(),
        name: "Кофе",
        price: 30,
        additions: [
          { id: uuid(), name: "Сахар", price: 0 },
          { id: uuid(), name: "Сироп", price: 15 }
        ]
      },
      { id: uuid(), name: "Кола", price: 10 }
    ]
  };

  render() {
    return (
      <div>
        <OrderForm
          products={this.state.products}
          onSubmit={order => {
            console.log(order);
          }}
        />
      </div>
    );
  }
}
