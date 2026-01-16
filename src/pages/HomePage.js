// src/pages/HomePage.jsx
import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const Title = styled.h1`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 4rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`

const NavLink = styled(Link)`
  padding: 1rem 2rem;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border: none;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: ${(props) => props.theme.buttonRadius};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`

function HomePage() {
  return (
    <Container>
      <Title>S&I Weddings</Title>
      <Nav>
        <NavLink to='/admin'>Admin Panel</NavLink>
      </Nav>
    </Container>
  )
}

export default HomePage
