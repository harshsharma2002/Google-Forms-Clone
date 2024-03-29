import { v4 as uuidv4 } from "uuid";
import { Model, QueryContext } from "objection";

// interface authdata {
//   email: string;
//   password: string;
// }

class Auth extends Model {
  id!: string;
  email!: string;
  password!: string;
  static get tableName() {
    return "auth";
  }
  static get idColumn() {
    return "id";
  }
  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    this.id = this.id ? this.id : uuidv4();
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    };
  }
}

export default Auth;