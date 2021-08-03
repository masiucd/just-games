import {css} from "@emotion/react"
import {sizes} from "@styles/styled-record"
import {above} from "@styles/media-query"
import {useToggle} from "@hooks/toggle"
import AnimatedWrapper from "@components/animated-wrapper"
import {resetButtonStyles} from "@styles/common"
import Dynamic from "next/dynamic"
import AppTitle from "@components/common/app-title"
const Navbar = Dynamic(() => import("./navbar"))

const headerStyles = css`
  height: ${sizes.headerHeight};
  border: 2px solid red;
  padding: 0.2rem 1.2rem;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  @media ${above.tablet} {
    grid-template-columns: 1fr 2fr;
    align-items: center;
  }
`

const Header = () => {
  const [isMenuOpen, toggleMenuIsOpen] = useToggle()
  return (
    <header css={headerStyles}>
      <AppTitle incomingStyles={css``} />
      <AnimatedWrapper isOn={isMenuOpen}>
        <Navbar />
      </AnimatedWrapper>
      <MenuButton onClick={toggleMenuIsOpen} />
    </header>
  )
}

const MenuButton = ({onClick}: {onClick: () => void}) => {
  return (
    <button
      onClick={onClick}
      css={css`
        ${resetButtonStyles};
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        z-index: 10;
      `}
    >
      menu
    </button>
  )
}

export default Header
