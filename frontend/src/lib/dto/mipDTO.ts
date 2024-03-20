import { MipSchemaType } from "../domains/mipSchema";

export class AddMipDTO implements MipSchemaType {
  id: MipSchemaType["id"];
  name: MipSchemaType["name"];
  currencies: MipSchemaType["currencies"];
  createdDate: MipSchemaType["createdDate"];

  constructor() {
    this.id = `${Math.floor(Math.random() * 1000)}`;
    this.name = "";
    this.currencies = [];
    this.createdDate = new Date().toString();
  }
}
