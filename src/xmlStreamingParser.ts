import { WritableStream } from "htmlparser2/lib/WritableStream"
import { events } from "./events"

export type XMLObject = {
  name: string
  attributes: Record<string, string>
  text?: string
  parent?: XMLObject
  childrenByName?: Record<string, XMLObject>
  children?: XMLObject[]
}

let parentNode: XMLObject | undefined

export const parser = new WritableStream(
  {
    onopentag(name, attributes, isImplied) {
      const node: XMLObject = {
        name,
        attributes,
      }
      if (parentNode) {
        node.parent = parentNode

        parentNode.children = parentNode.children || []
        parentNode.children.push(node)

        parentNode.childrenByName = parentNode.childrenByName || {}
        parentNode.childrenByName[name] = node
      }
      parentNode = node
    },
    ontext(text) {
      if (parentNode) {
        parentNode.text = text
      }
    },
    onclosetag(name, isImplied) {
      events.emit(`XML${name}`, parentNode)
      parentNode = parentNode?.parent
    },
  },
  { xmlMode: true }
)
