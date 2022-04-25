import { events } from "./events"
import { Product } from "./mapXmlProducts"

export function doSomethingWithProducts() {
  let count = 0

  events.on("Product", (product: Product) => {
    console.log(product)
    count++
  })

  events.on("finish", () => {
    console.log(`Processed ${count} products.`)
  })
}
