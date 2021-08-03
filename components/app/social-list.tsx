import {css, SerializedStyles} from "@emotion/react"
import {colors} from "@styles/styled-record"
import {FC} from "react"
import socialData from "../../data/social.json"

const socialListStyles = css`
  display: flex;
  flex-flow: row wrap;
  padding: 1rem;
  li {
    margin-left: 1em;
    a {
      text-transform: capitalize;
      color: ${colors.colorTextPrimary};
    }
  }
`

interface Props {
  incomingStyles?: SerializedStyles
}

const SocialList: FC<Props> = ({incomingStyles = null}) => (
  <ul
    css={css`
      ${socialListStyles};
      ${incomingStyles};
    `}
  >
    {socialData.map(({name, url}) => (
      <li key={name}>
        <a href={url}>{name}</a>
      </li>
    ))}
  </ul>
)

export default SocialList
