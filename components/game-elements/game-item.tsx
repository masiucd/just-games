import {FrontMatter} from "@app-types/blog"
import {css} from "@emotion/react"
import {borderRadius, elevations} from "@styles/styled-record"
import Link from "next/link"
import {FC} from "react"

interface Props {
  frontMatter: FrontMatter
}
const GameItem: FC<Props> = ({frontMatter}) => {
  const {title, slug} = frontMatter
  return (
    <li
      css={css`
        margin-bottom: 1.5rem;
        min-width: 12rem;
        text-align: center;
        box-shadow: ${elevations.shadowLg};
        border-radius: ${borderRadius.borderRadiusM};
        min-height: 8rem;
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        justify-content: center;
        align-items: center;
      `}
    >
      <h4>{title}</h4>
      <Link href={`/games/${slug}`}>
        <a>→ {title}</a>
      </Link>
    </li>
  )
}

export default GameItem
