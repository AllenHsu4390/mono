import { GuestResponse } from '@main/rest-models';
import React from 'react';

let _guest: GuestResponse;

export const setGuest = (guest: GuestResponse) => {
  _guest = guest;
};

export const useGuest = () => {
  return {
    guest: _guest,
  };
};
