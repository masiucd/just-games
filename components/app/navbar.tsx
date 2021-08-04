import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {above} from "@styles/media-query"
import {colors, elevations, sizes} from "@styles/styled-record"
import {motion} from "framer-motion"
import {createPortal} from "react-dom"
import routes from "../../data/routes.json"
import Link from "next/link"
import SocialList from "./social-list"
import AppTitle from "@components/common/app-title"

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${colors.colorHighlight};
  opacity: 0.3;
  width: 90%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${elevations.shadowMd};
  @media ${above.tablet} {
    width: 45%;
  }
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

const AuthOptions = styled.aside`
  /*  */
`

const Navbar = () => {
  return createPortal(
    <Overlay
      initial={{opacity: 0, x: -1000, scale: 0.6}}
      animate={{opacity: 1, x: 0, scale: 1}}
      exit={{opacity: 0, x: -1000, scale: 0.45}}
      transition={{
        damping: 3,
      }}
    >
      <nav css={css``}>
        <AppTitle
          incomingStyles={css`
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -20%);
            text-align: center;
            width: 100%;
            font-size: ${sizes.h3};
            letter-spacing: 0.2rem;
            color: ${colors.colorBgBackground};
            span {
              text-shadow: 1px 1px ${colors.colorGray200};
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
              <Link href={`/game/${route}`}>
                <a>{name}</a>
              </Link>
            </motion.li>
          ))}
        </List>
        <AuthOptions>
          <Link href="">
            <a>Login</a>
          </Link>
          <Link href="">
            <a>Register</a>
          </Link>
        </AuthOptions>
        <SocialList
          incomingStyles={css`
            li {
              a {
                color: ${colors.colorBgBackground};
              }
            }
          `}
        />
      </nav>
    </Overlay>,
    document.body,
  )
}

export default Navbar
