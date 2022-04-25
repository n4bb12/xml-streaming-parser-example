import fs from "fs"
import { doSomethingWithProducts } from "./doSomethingWithProducts"
import { events } from "./events"
import { mapXmlProducts } from "./mapXmlProducts"
import { parser } from "./xmlStreamingParser"

async function main() {
  mapXmlProducts()
  doSomethingWithProducts()

  fs.createReadStream("products.xml")
    .pipe(parser)
    .on("finish", () => {
      events.emit("done")
      console.log("done")
    })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
