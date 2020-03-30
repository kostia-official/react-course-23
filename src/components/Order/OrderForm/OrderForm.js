import React from "react";
import _ from "lodash";
import { Cart } from "./Cart/Cart";

const UA_CODE = "+380";

export class OrderForm extends React.Component {
  state = {
    phoneNumber: UA_CODE + "0931112233",
    selectedProductId: "",
    selectedAdditionsIds: [],
    orderedProducts: [],
    productFilter: ""
  };

  onPhoneNumberChange = e => {
    const { value } = e.target;

    if (isNaN(Number(value))) return;
    if (!_.startsWith(value, UA_CODE)) return;

    this.setState({
      phoneNumber: e.target.value
    });
  };

  onFilterChange = e => {
    this.setState({
      productFilter: e.target.value,
      selectedAdditionsIds: [],
      orderedProducts: []
    });
  };

  onProductSelect = e => {
    this.setState({
      selectedProductId: e.target.value,
      selectedAdditionsIds: []
    });
  };

  onAdditionSelect = e => {
    const { value: id, checked: isChecked } = e.target;

    this.setState(state => ({
      selectedAdditionsIds: isChecked
        ? [...state.selectedAdditionsIds, id]
        : _.filter(state.selectedAdditionsIds, selectedId => selectedId !== id)
    }));
  };

  addProduct = () => {
    const id = this.state.selectedProductId;
    if (!id) return;

    const product = _.find(this.props.products, { id });
    const orderedAdditions = _.filter(product.additions, ({ id }) => {
      return _.includes(this.state.selectedAdditionsIds, id);
    });

    this.setState(state => ({
      orderedProducts: [
        ...state.orderedProducts,
        { ...product, orderedAdditions }
      ]
    }));
  };

  onSubmit = e => {
    this.props.onSubmit(this.state);
    e.preventDefault();
  };

  render() {
    let { products } = this.props;

    const filteredProducts = _.filter(products, product => {
      const name = _.toLower(product.name);
      const filter = _.toLower(this.state.productFilter);

      return _.includes(name, filter);
    });

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Номер телефона</legend>
          <input
            name="phoneNumber"
            type="tel"
            value={this.state.phoneNumber}
            onChange={this.onPhoneNumberChange}
            minLength={13}
            maxLength={13}
          />
        </fieldset>

        <fieldset>
          <legend>Продукты</legend>

          <input
            type="text"
            value={this.state.productFilter}
            onChange={this.onFilterChange}
          />

          {_.map(filteredProducts, ({ id, name, price, additions }) => {
            const isSelected = this.state.selectedProductId === id;

            return (
              <div key={id}>
                <label>
                  <input
                    checked={this.state.selectedProductId === id}
                    type="radio"
                    value={id}
                    name="product"
                    onChange={this.onProductSelect}
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
                            value={addition.id}
                            name="addition"
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
          <button type="button" onClick={this.addProduct}>
            Добавить
          </button>
        </fieldset>

        <Cart orderedProducts={this.state.orderedProducts} />
        <button>Заказать</button>
      </form>
    );
  }
}
