import bcrypt from "bcrypt";
const saltrounds = 10;

export const hashpassword = (textpass: string) => {
  return bcrypt
    .hash(textpass, saltrounds)
    .then((hash: string) => hash)
    .catch((err: Error) => err);
};
