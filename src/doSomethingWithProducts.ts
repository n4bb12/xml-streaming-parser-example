import { events } from "./events"
import { Product } from "./mapXmlProducts"

export function doSomethingWithProducts() {
  events.on("Product", (product: Product) => {
    console.log(product)
  })
}
