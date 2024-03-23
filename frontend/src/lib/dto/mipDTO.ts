import { MipSchemaType } from "../domains/mipSchema";

export class AddMipDTO implements MipSchemaType {
  id: MipSchemaType["id"];
  name: MipSchemaType["name"];
  currencies: MipSchemaType["currencies"];
  createdDate: MipSchemaType["createdDate"];

  constructor(
    name: MipSchemaType["name"],
    currencies: MipSchemaType["currencies"]
  ) {
    this.id = name;
    this.name = name;
    this.currencies = currencies;
    this.createdDate = new Date().toString();
  }
}
