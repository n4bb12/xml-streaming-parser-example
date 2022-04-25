import fs from "fs"
import { doSomethingWithProducts } from "./doSomethingWithProducts"
import { mapXmlProducts } from "./mapXmlProducts"
import { parser } from "./xmlStreamingParser"

async function main() {
  fs.createReadStream("products.xml")
    .pipe(parser)
    .on("finish", () => console.log("done"))

  mapXmlProducts()
  doSomethingWithProducts()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
