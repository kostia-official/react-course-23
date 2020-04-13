import faker from 'faker';

const defaultState = {
  id: faker.random.uuid()
};

export const user = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
