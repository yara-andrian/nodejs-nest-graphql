import { Response } from 'express';
import { CustomerModel } from './customer/customer.model';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (customer: CustomerModel) => {
  return sign(
    { userId: customer.id },
    process.env.ACCESS_TOKEN_SECRET! || 'xyz',
    {
      expiresIn: '15m',
    },
  );
};

export const createRefreshToken = (customer: CustomerModel) => {
  return sign(
    { userId: customer.id, tokenVersion: customer.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET! || 'xyz',
    {
      expiresIn: '7d',
    },
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};
