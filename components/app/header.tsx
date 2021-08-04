import {css} from "@emotion/react"
import {colors, sizes} from "@styles/styled-record"
import {above} from "@styles/media-query"
import {useToggle} from "@hooks/toggle"
import AnimatedWrapper from "@components/common/animated-wrapper"
import {resetButtonStyles} from "@styles/common"
import Dynamic from "next/dynamic"
import AppTitle from "@components/common/app-title"
const Navbar = Dynamic(() => import("./navbar"))

const headerStyles = css`
  height: ${sizes.headerHeight};
  padding: 0.2rem 1.2rem;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  background-color: ${colors.colorGray900};
  @media ${above.tablet} {
    grid-template-columns: 1fr 2fr;
    align-items: center;
  }
`

const Header = () => {
  const [isMenuOpen, toggleMenuIsOpen] = useToggle()
  return (
    <header css={headerStyles}>
      <AppTitle
        incomingStyles={css`
          font-size: ${sizes.h3};
          letter-spacing: 0.2rem;
          strong {
            position: relative;
            &:after {
              content: "";
              position: absolute;
              background-color: ${colors.colorTextPrimary};
              width: 0;
              height: 6px;
              left: 0;
              bottom: 14px;
              opacity: 0.4;
              transition: width 300ms ease-in-out;
              transform: rotate(-2deg);
              z-index: -1;
            }
            &:hover {
              &:after {
                width: 90%;
              }
            }
          }
          span {
            &:nth-of-type(2n) {
              color: ${colors.colorGray600};
            }
            &:nth-of-type(5n) {
              color: ${colors.colorTextPrimary};
            }
            &:nth-of-type(4n) {
              color: ${colors.colorGray400};
            }
          }
        `}
      />
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
        top: 2.5rem;
        right: 2rem;
        z-index: 10;
        width: 5em;
      `}
    >
      menu
    </button>
  )
}

export default Header
