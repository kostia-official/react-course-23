import React from "react";
import _ from "lodash";

export const OrderPreview = ({ orderedProducts }) => {
  if (_.isEmpty(orderedProducts)) return <div />;

  const flatProductsList = _.reduce(
    orderedProducts,
    (result, product) => {
      return [...result, product, ...product.additions];
    },
    []
  );

  const total = _.reduce(
    flatProductsList,
    (sum, product) => {
      return sum + product.price;
    },
    0
  );

  return (
    <fieldset>
      <legend>Корзина</legend>
      {_.map(orderedProducts, ({ id, name, price, additions }, i) => {
        return (
          <div key={id + i}>
            <span>
              {name} {price}грн{" "}
            </span>

            {_.map(additions, (addition, i) => {
              return (
                <div key={id + i} style={{ paddingLeft: "20px" }}>
                  <span>
                    {addition.name} {addition.price}грн
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
      <b>Итого: {total}грн</b>
    </fieldset>
  );
};
