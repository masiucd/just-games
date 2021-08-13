import ClosedFolder from "@components/icons/closed-folder"
import File from "@components/icons/file"
import OpenFolder from "@components/icons/open-folder"
import {css} from "@emotion/react"
import {useToggle} from "@hooks/toggle"
import {flexRow, resetButtonStyles} from "@styles/common"
import Link from "next/link"
import {FC, Fragment} from "react"

import data from "../data/data.json"
interface Item {
  id: number
  text: string
  parentId: number
  hasChildren: boolean
  path: string
}

const getData = (
  data: Pick<Item, "id" | "parentId" | "text" | "path">[],
): Item[] => {
  return data.map((item) => ({
    ...item,
    hasChildren: data.filter((x) => x.parentId === item.id).length > 0,
  }))
}

const getIcon = (hasChildren: boolean, isOn: boolean) => {
  switch (true) {
    case hasChildren && isOn:
      return <OpenFolder />
    case hasChildren && !isOn:
      return <ClosedFolder />
    default:
      return <File />
  }
}
interface RenderElement {
  hasChildren: boolean
  handler: () => void
  text: string
  path: string
  isOn: boolean
}

const renderElement = ({
  hasChildren,
  handler,
  text,
  path,
  isOn,
}: RenderElement) => {
  if (hasChildren) {
    return (
      <button
        onClick={handler}
        css={css`
          ${resetButtonStyles};
          ${flexRow()};
          font-size: 0.95rem;
        `}
      >
        {text} {getIcon(hasChildren, isOn)}
      </button>
    )
  }

  return (
    <Link href={path}>
      <a>
        {text} {getIcon(hasChildren, isOn)}
      </a>
    </Link>
  )
}

interface RowProps {
  level: number
  item: Item
}

const Row: FC<RowProps> = ({level, item, children}) => {
  const {state: isOn, toggle} = useToggle()

  return (
    <aside
      css={css`
        margin-left: ${level * 2}rem;
        padding: 0.5rem 0;
      `}
    >
      {renderElement({
        hasChildren: item.hasChildren,
        handler: toggle,
        text: item.text,
        path: item.path,
        isOn,
      })}
      {isOn && children}
    </aside>
  )
}

interface TreeProps {
  items: Item[]
  level?: number
  parentId?: number
}
const Tree: FC<TreeProps> = ({items, level = 0, parentId = 0}) => {
  const itemsToRender = items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => (a.text > b.text ? 1 : -1))

  if (!items || !items.length) return null

  return itemsToRender.map((item) => (
    <Fragment key={item.id}>
      <Row item={item} level={level}>
        <Tree items={items} level={level + 1} parentId={item.id} />
      </Row>
    </Fragment>
  ))
}

const AboutPage = () => {
  const appData = getData(data)
  return (
    <Fragment>
      <h1>About Page</h1>
      <Tree items={appData} />
    </Fragment>
  )
}

export default AboutPage
