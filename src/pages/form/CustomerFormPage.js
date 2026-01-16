// src/pages/form/CustomerFormPage.jsx
import { useParams } from "react-router-dom"
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

function CustomerFormPage() {
  const { slug } = useParams()

  return (
    <Container>
      <Title>Kunden-Formular: {slug}</Title>
      <p>Coming soon...</p>
    </Container>
  )
}

export default CustomerFormPage
