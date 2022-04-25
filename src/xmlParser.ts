import { ParserOptions } from "htmlparser2"
import { Handler } from "htmlparser2/lib/Parser"
import { WritableStream } from "htmlparser2/lib/WritableStream"
import { events } from "./events"

export type XMLObject = {
  name: string
  attributes: Record<string, string>
  text?: string
  parent?: XMLObject
  children?: XMLObject[]
  childrenByName?: Record<string, XMLObject>
}

let currentNode: XMLObject | undefined

const callbacks: Partial<Handler> = {
  onopentag(name, attributes, isImplied) {
    const openedNode: XMLObject = {
      name,
      attributes,
    }

    if (currentNode) {
      // Keep a reference to the parent so we can emit events once the object has finished parsing.
      openedNode.parent = currentNode

      currentNode.children = currentNode.children || []
      currentNode.children.push(openedNode)

      currentNode.childrenByName = currentNode.childrenByName || {}
      currentNode.childrenByName[name] = openedNode
    }

    currentNode = openedNode
  },

  ontext(text) {
    if (currentNode) {
      currentNode.text = text
    }
  },

  onclosetag(name, isImplied) {
    events.emit(`XML${name}`, currentNode)
    currentNode = currentNode?.parent
  },
}

const options: ParserOptions = {
  xmlMode: true,
}

export const xmlParser = new WritableStream(callbacks, options)
