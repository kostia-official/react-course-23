import React from "react";
import _ from "lodash";
import { OrderForm } from "./OrderForm/OrderForm";
import { v4 as uuid } from "uuid";
import { withUser } from "../../contexts/UserContext";

class OrderComponent extends React.Component {
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
      { id: uuid(), name: "Кола", price: 10 },
      { id: uuid(), name: "Пиво", price: 30, isForAdult: true }
    ]
  };

  render() {
    const { isAdult } = this.props;

    const products = isAdult()
      ? this.state.products
      : _.filter(this.state.products, ({ isForAdult }) => !isForAdult);

    return (
      <div>
        <OrderForm
          products={products}
          onSubmit={order => {
            console.log(order);
          }}
        />
      </div>
    );
  }
}

export const Order = withUser(OrderComponent);
