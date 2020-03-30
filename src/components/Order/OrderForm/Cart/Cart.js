import React from "react";
import _ from "lodash";

export const Cart = ({ orderedProducts }) => {
  if (_.isEmpty(orderedProducts)) return <div />;

  const total = getTotal(orderedProducts);

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

function getTotal(orderedProducts) {
  const allProducts = _.reduce(
    orderedProducts,
    (result, product) => {
      return [...result, product, ...product.orderedAdditions];
    },
    []
  );

  return _.reduce(
    allProducts,
    (sum, product) => {
      return sum + product.price;
    },
    0
  );
}
