import React from "react";
import { OrderForm } from "../OrderForm/OrderForm";

export class App extends React.Component {
  state = {
    products: [
      {
        id: "1",
        name: "Шаурма",
        price: 70,
        additions: [
          { id: "6", name: "Cыр", price: 10 },
          { id: "7", name: "Грибы", price: 5 },
          { id: "8", name: "Ананасы", price: 15 },
          { id: "9", name: "Без мяса", price: -5 }
        ]
      },
      {
        id: "2",
        name: "Кофе",
        price: 30,
        additions: [
          { id: "4", name: "Сахар", price: 0 },
          { id: "5", name: "Сироп", price: 3 }
        ]
      },
      { id: "3", name: "Кола", price: 15 }
    ],
    order: []
  };

  render() {
    return (
      <div>
        <OrderForm
          products={this.state.products}
          onOrderSubmit={order => {
            console.log(order);
          }}
        />
      </div>
    );
  }
}
