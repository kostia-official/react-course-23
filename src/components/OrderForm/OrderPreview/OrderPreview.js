import React from "react";
import _ from "lodash";
import { withUser } from "../../../HOCs/withUser";

export const OrderPreviewComponent = ({ orderedProducts, isAdult }) => {
  const isShowOrder = !_.isEmpty(orderedProducts);
  if (!isShowOrder) return <div />;

  // let orderPreview = [...orderedProducts];

  if (!isAdult()) {
    orderedProducts.push({ name: "Скидка", price: -15 });
  }

  const allProducts = _.reduce(
    orderedProducts,
    (result, product) => {
      if (product.orderedAdditions) {
        return [...result, product, ...product.orderedAdditions];
      }

      return [...result, product];
    },
    []
  );

  const total = _.reduce(
    allProducts,
    (sum, product) => {
      return sum + product.price;
    },
    0
  );

  return (
    <>
      <fieldset>
        <legend>Корзина</legend>
        {_.map(orderedProducts, ({ id, name, price, orderedAdditions }, i) => {
          return (
            <div key={id + i}>
              <span>
                {name} {price}грн
              </span>

              {_.map(orderedAdditions, addition => {
                return (
                  <div key={addition.id} style={{ paddingLeft: "10px" }}>
                    <span>
                      {addition.name} {addition.price}грн
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
        <b>Итого: {total}</b>
      </fieldset>
    </>
  );
};

export const OrderPreview = withUser(OrderPreviewComponent);
