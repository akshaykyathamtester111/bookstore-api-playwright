export const validBook = {
  title: 'Automation Book',
  author: 'Test Author',
  description: 'This is a valid test book.',
  price: 19.99
};

export const invalidBook = {
  author: 'Missing Title Author',
  description: 'No title here',
  price: 10.0
};

export const anotherInvalidBook = {
  title: 'Invalid Price Book',
  author: 'Wrong Price Author',
  description: 'Price is a string instead of number',
  price: 'twenty' // invalid type
};
