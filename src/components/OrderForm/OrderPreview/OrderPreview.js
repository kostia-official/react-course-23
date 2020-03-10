import React from "react";
import _ from "lodash";

export const OrderPreview = ({ orderedProducts }) => {
  const isShowOrder = !_.isEmpty(orderedProducts);

  const allProducts = _.reduce(
    orderedProducts,
    (result, product) => {
      return [...result, product, ...product.orderedAdditions];
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
      {isShowOrder && (
        <fieldset>
          <legend>Корзина</legend>
          {_.map(
            orderedProducts,
            ({ id, name, price, orderedAdditions }, i) => {
              console.log(orderedAdditions);
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
            }
          )}
          <b>Итого: {total}</b>
        </fieldset>
      )}
    </>
  );
};
