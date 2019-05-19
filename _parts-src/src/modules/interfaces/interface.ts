import {Instance} from "sequelize";

export interface UserParams {
  id: number,
  line: string,
  name: string,
  pin: number,
  picture: string
}

export interface UserInstance extends Instance<UserParams> {
  dataValues: UserParams;
}
