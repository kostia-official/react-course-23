import React from "react";
import _ from "lodash";
import { OrderPreview } from "../OrderPreview/OrderPreview";

const COUNTRY_CODE = "+380";

export class OrderForm extends React.Component {
  state = {
    selectedProductId: null,
    selectedAdditionsIds: [],
    orderedProducts: [],
    phoneNumber: COUNTRY_CODE + "111111111",
    productsFilter: ""
  };

  onProductSelect = e => {
    this.setState({
      selectedProductId: e.target.value
    });
  };

  onPhoneNumberChange = e => {
    const { value } = e.target;

    if (isNaN(Number(value))) return;
    if (!_.startsWith(value, COUNTRY_CODE)) return;

    this.setState({
      phoneNumber: value
    });
  };

  onProductAdd = () => {
    if (!this.state.selectedProductId) return;

    this.setState(
      ({ orderedProducts, selectedProductId, selectedAdditionsIds }) => {
        const product = _.find(this.props.products, { id: selectedProductId });
        const additions = _.filter(product.additions, ({ id }) =>
          _.includes(selectedAdditionsIds, id)
        );

        return {
          orderedProducts: [...orderedProducts, { ...product, additions }],
          selectedProductId: null,
          selectedAdditionsIds: []
        };
      }
    );
  };

  onAdditionSelect = e => {
    const { value, checked } = e.target;

    this.setState(({ selectedAdditionsIds }) => {
      return {
        selectedAdditionsIds: checked
          ? [...selectedAdditionsIds, value]
          : _.filter(selectedAdditionsIds, id => id !== value)
      };
    });
  };

  onOrderSubmit = e => {
    const { orderedProducts, phoneNumber } = this.state;

    this.props.onOrderSubmit({
      orderedProducts,
      phoneNumber
    });

    e.preventDefault();
  };

  onFilterChange = e => {
    this.setState({
      productsFilter: e.target.value,
      selectedProductId: null,
      selectedAdditionsIds: []
    });
  };

  getFilteredProducts = () => {
    return _.filter(this.props.products, product => {
      if (!this.state.productsFilter) return true;

      const productName = _.toLower(product.name);
      const filter = _.toLower(this.state.productsFilter);

      return _.includes(productName, filter);
    });
  };

  render() {
    const filteredProducts = this.getFilteredProducts();
    const isShowAddButton = !_.isEmpty(filteredProducts);

    return (
      <form onSubmit={this.onOrderSubmit}>
        <fieldset>
          <legend>Номер телефона:</legend>
          <input
            type="tel"
            name="phone"
            value={this.state.phoneNumber}
            onChange={this.onPhoneNumberChange}
            pattern="\+[0-9]{12}"
            maxLength="13"
            minLength="13"
            required
          />
        </fieldset>

        <fieldset>
          <legend>Товары</legend>
          <label>
            Поиск:
            <input
              type="text"
              value={this.state.productsFilter}
              onChange={this.onFilterChange}
            />
          </label>
          {_.map(filteredProducts, ({ id, name, price, additions }) => {
            const isSelected = this.state.selectedProductId === id;

            return (
              <div key={id}>
                <label>
                  <input
                    checked={this.state.selectedProductId === id}
                    type="radio"
                    name="product"
                    value={id}
                    onChange={this.onProductSelect}
                    required={_.isEmpty(this.state.orderedProducts)}
                  />
                  {name} {price}грн
                </label>

                {isSelected &&
                  _.map(additions, addition => {
                    return (
                      <div key={addition.id} style={{ paddingLeft: "20px" }}>
                        <label>
                          <input
                            type="checkbox"
                            name="addition"
                            value={addition.id}
                            onChange={this.onAdditionSelect}
                          />
                          {addition.name} {addition.price}грн
                        </label>
                      </div>
                    );
                  })}
              </div>
            );
          })}

          {isShowAddButton && (
            <button type="button" onClick={this.onProductAdd}>
              Добавить
            </button>
          )}
        </fieldset>

        <OrderPreview orderedProducts={this.state.orderedProducts} />

        <button type="submit">Заказать</button>
      </form>
    );
  }
}
