/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  BCRYPT_SALT_ROUNDS:process.env.BCRYPT_SALT_ROUNDS,
  default_password:process.env.DEFAULT_PASS
};
// console.log(process.cwd())
