import fs from "fs"
import { doSomethingWithProducts } from "./doSomethingWithProducts"
import { events } from "./events"
import { mapXmlProducts } from "./mapXmlProducts"
import { xmlParser } from "./xmlParser"

async function main() {
  mapXmlProducts()
  doSomethingWithProducts()

  fs.createReadStream("products.xml")
    .pipe(xmlParser)
    .on("finish", () => {
      events.emit("done")
      console.log("done")
    })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
