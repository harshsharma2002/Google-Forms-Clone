import bcrypt from "bcrypt";
const saltrounds = 10;

export const hashPassword = (textPass: string) => {
  return bcrypt
    .hash(textPass, saltrounds)
    .then((hash: string) => hash)
};

export const cmpHash = (textPass: string, hashedPass: string) => {
  return bcrypt.compare(textPass,hashedPass).then((found) => found);
}
