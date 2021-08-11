import {css} from "@emotion/react"
import {useState} from "react"

interface Item {
  id: number
  name: string
  children: Item[]
}

interface File {
  id: number
  name: string
  parentId: number
}

const items: Item[] = [
  {
    id: 1,
    name: "src",
    children: [
      {
        id: 2,
        name: "js",
        children: [{id: 4, name: "math", children: []}],
      },
      {id: 3, name: "lib", children: []},
    ],
  },
]

const files: File[] = [
  {id: 1, name: "app.js", parentId: 2},
  {id: 2, name: "add.js", parentId: 4},
]

const Tree = ({items, depth}: {items: Item[]; depth: number}) => {
  const [on, setOn] = useState(false)
  if (!items || !items.length) return null
  const xs = items
    .map((x) => files.find((p) => p.parentId === x.id))
    .filter(Boolean)

  return items.map((item: any) => (
    <div key={item.id}>
      <p
        onClick={() => setOn((p) => !p)}
        css={css`
          margin-left: ${depth * 15}px;
        `}
      >
        {item.name}
      </p>
      {on &&
        xs.length > 0 &&
        xs.map((x) => (
          <p
            key={x?.id}
            css={css`
              margin-left: ${depth * 25}px;
            `}
          >
            {x?.name}
          </p>
        ))}
      <Tree items={item.children} depth={depth + 1} />
    </div>
  ))
}

const AboutPage = () => {
  return (
    <div>
      <h1>About Page</h1>
      <Tree items={items} depth={0} />
    </div>
  )
}

export default AboutPage
