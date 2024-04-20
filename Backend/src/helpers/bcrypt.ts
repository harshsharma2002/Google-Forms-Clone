import bcrypt from "bcrypt";
const saltrounds = 10;

export const hashPassword = async (textPass: string) => {
  const hash = await bcrypt.hash(textPass, saltrounds);
  return hash;
};

export const cmpHash = async (textPass: string, hashedPass: string) => {
  const found = await bcrypt.compare(textPass, hashedPass);
  return found;
};
