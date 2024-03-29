import Auth from "../db/models/auth";
import { hashpassword } from "../helpers/bcrypt";

interface datatype {
  email: string;
  password: string;
}

export const create = async (data: datatype) => {
  console.log(await Auth.query());
  const { email, password } = data;
  const checkIfExists = await Auth.query().where({ email }).first();

  if (checkIfExists) {
    return { msg: "This user already exists, Please go to login" };
  } else {
    const hashedpass = await hashpassword(password);
    // const newdata = await Auth.query().insert<Partial<Auth>>({
    //   email,
    //   password: hashedpass,
    // });
    return { msg: "User created successfully",hashedpass};
  }
};
