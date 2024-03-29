import fs from "fs";

const initializeENV = () => {
  const path = "/env/.env";
  if (fs.existsSync(path)) {
    require("dotenv").config({ path });
  } else {
    require("dotenv").config();
  }
};

export default initializeENV;
