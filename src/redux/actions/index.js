export const ADD_DETAILS = 'ADD_DETAILS';

export function addDetails(cardNumber, name, expiry, cvc) {
  return { type: ADD_DETAILS, cardNumber: cardNumber, name: name, expiry: expiry, cvc: cvc };
}