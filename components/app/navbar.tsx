import AppTitle from "@components/common/app-title"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {useClickOutside} from "@hooks/click-outside"
import {resetButtonStyles} from "@styles/common"
import {above} from "@styles/media-query"
import {colors, elevations, sizes} from "@styles/styled-record"
import {motion} from "framer-motion"
import Link from "next/link"
import {useRef} from "react"
import {createPortal} from "react-dom"

import routes from "../../data/routes.json"
import SocialList from "./social-list"

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${colors.colorBgOverlay};
  width: 100%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${elevations.shadowMd};
`

const List = styled.ul`
  display: flex;
  flex-flow: column wrap;
  padding: 1rem;
  overflow-y: scroll;
  max-height: 45rem;
  align-items: center;
  li {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    a {
      color: ${colors.colorBgBackground};
    }
  }
`

const navStyles = css`
  width: 90%;
  display: grid;
  height: 80%;
  @media ${above.tablet} {
    width: 90%;
    grid-template-columns: 1fr 1fr;
  }
`

const boxStyles = css`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  position: relative;
`

const FirstHalf = styled(motion.div)`
  ${boxStyles};
  border-radius: 4px 0 0 4px;
  background-color: ${colors.colorHighlight};
`
const SecondHalf = styled(motion.div)`
  ${boxStyles};
  border-radius: 0 4px 4px 0px;
  background-color: ${colors.colorTextPrimary};
`

const buttonStyles = css`
  ${resetButtonStyles};
  background-color: transparent;
  border: 2px solid ${colors.colorBgBackground};
  margin-left: 0.45rem;
  color: ${colors.colorBgBackground};
  font-size: 1rem;
`

const ActionsWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;

  button {
    ${buttonStyles};
    color: ${colors.colorBgBlack};
    border-color: ${colors.colorBgBlack};
  }
`

interface Props {
  closeMenu: () => void
}
const Navbar = ({closeMenu}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, closeMenu)
  return createPortal(
    <Overlay
      initial={{opacity: 0, x: -1000, scale: 0.6, rotate: -120}}
      animate={{opacity: 1, x: 0, scale: 1, rotate: 0}}
      exit={{opacity: 0, x: -1000, scale: 0.45, rotate: 120}}
      transition={{
        damping: 3,
      }}
    >
      <nav ref={ref} css={navStyles}>
        <FirstHalf
          initial={{opacity: 0, y: 1000}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 1000}}
          transition={{delay: 0.3, damping: 5}}
        >
          <AppTitle
            incomingStyles={css`
              text-align: center;
              width: 100%;
              font-size: ${sizes.h1};
              letter-spacing: 0.2rem;
              span {
                color: ${colors.colorBgBackground};
                &:nth-of-type(2n) {
                  color: ${colors.colorTextPrimary};
                }
                &:nth-of-type(3n) {
                  color: ${colors.colorTextText};
                }
              }
            `}
          />
          <List>
            {routes.map(({name, route}) => (
              <motion.li
                key={route}
                whileHover={{
                  scale: 1.065,
                  rotateX: "24deg",
                  rotateY: "-2deg",
                  opacity: 0.6,
                }}
              >
                <Link href={route}>
                  <a onClick={closeMenu}>{name}</a>
                </Link>
              </motion.li>
            ))}
          </List>

          <SocialList />
        </FirstHalf>

        <SecondHalf
          initial={{opacity: 0, y: -1000, rotate: 90}}
          animate={{opacity: 1, y: 0, rotate: 0}}
          exit={{opacity: 0, y: -1000, rotate: -90}}
          transition={{delay: 0.3, damping: 5}}
        >
          <p>
            Show login form ore register depend on state, maybe use state
            machine here
          </p>

          <ActionsWrapper>
            <motion.button
              whileHover={{
                color: colors.colorTextText,
                backgroundColor: colors.colorGray100,
                scale: 1.06,
              }}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{
                color: colors.colorTextText,
                backgroundColor: colors.colorGray100,
                scale: 1.06,
              }}
            >
              Register
            </motion.button>
          </ActionsWrapper>

          <motion.button
            onClick={closeMenu}
            whileHover={{
              backgroundColor: colors.colorGray900,
              color: colors.colorHighlight,
            }}
            css={css`
              ${buttonStyles};
              position: absolute;
              top: -1.3rem;
              right: -0.2rem;
              border-radius: 50%;
              width: 3rem;
              height: 3rem;
              background-color: ${colors.colorHighlight};
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0;
              margin-left: 0;
              border: 0;
              font-size: 0.8rem;
              font-weight: bold;
            `}
          >
            ⤫
          </motion.button>
        </SecondHalf>
      </nav>
    </Overlay>,
    document.body,
  )
}

export default Navbar
