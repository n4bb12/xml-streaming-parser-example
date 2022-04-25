import { events } from "./events"
import { XMLObject } from "./xmlStreamingParser"

export type Product = {
  sku: string
  name: string
  price: number
}

export function mapXmlProducts() {
  events.on("XMLProduct", (xml: XMLObject) => {
    const product: Product = {
      sku: xml.childrenByName?.SKU.text!,
      name: xml.childrenByName?.Name.text!,
      price: +xml.childrenByName?.Price.text!,
    }
    events.emit("Product", product)
  })
}
