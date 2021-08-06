import AnimatedWrapper from "@components/common/animated-wrapper"
import AppTitle from "@components/common/app-title"
import {css} from "@emotion/react"
import {useToggle} from "@hooks/toggle"
import {resetButtonStyles} from "@styles/common"
import {above} from "@styles/media-query"
import {colors, sizes} from "@styles/styled-record"
import Dynamic from "next/dynamic"
const Navbar = Dynamic(() => import("./navbar"))

const headerStyles = css`
  height: ${sizes.headerHeight};
  padding: 0.2rem 1.2rem;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  background-color: ${colors.colorGray900};
  align-items: center;
  @media ${above.tablet} {
    grid-template-columns: 1fr 2fr;
  }
`

const Header = (): JSX.Element => {
  const [isMenuOpen, toggleMenuIsOpen, closeMenu] = useToggle()

  return (
    <header css={headerStyles}>
      <AppTitle
        incomingStyles={css`
          font-size: ${sizes.h5};
          letter-spacing: 0.2rem;
          @media ${above.mobileL} {
            font-size: ${sizes.h3};
          }
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
        <Navbar closeMenu={closeMenu} />
      </AnimatedWrapper>
      <MenuButton onClick={toggleMenuIsOpen} />
    </header>
  )
}

const MenuButton = ({onClick}: {onClick: () => void}): JSX.Element => (
  <button
    onClick={onClick}
    css={css`
      ${resetButtonStyles};
      position: absolute;
      top: 1.2rem;
      right: 2rem;
      width: 4em;
      font-size: 1rem;
    `}
  >
    menu
  </button>
)

export default Header
