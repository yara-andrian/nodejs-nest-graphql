import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
  });
};

export const deleteToken = (res: Response, key: string) => {
  res.clearCookie(key);
};
