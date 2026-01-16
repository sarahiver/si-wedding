// src/pages/admin/AdminPage.jsx
import styled from "styled-components"

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
`

const Title = styled.h1`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 3rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 2rem;
`

function AdminPage({ setTheme }) {
  return (
    <Container>
      <Title>Admin Panel</Title>
      <p>Coming soon...</p>
    </Container>
  )
}

export default AdminPage
