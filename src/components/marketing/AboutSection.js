// src/components/marketing/AboutSection.js
import styled from "styled-components"

const Section = styled.section`
  padding: 8rem 4rem;
  background: #fafafa;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`

const ImageContainer = styled.div`
  position: relative;

  @media (max-width: 968px) {
    order: -1;
  }
`

const MainImage = styled.div`
  aspect-ratio: 4/5;
  background: #e5e5e5;
  position: relative;
  overflow: hidden;

  /* Placeholder - später mit echtem Bild ersetzen */
  &::after {
    content: "Sarah & Iver";
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Instrument Serif", serif;
    font-size: 1.5rem;
    color: #999999;
    font-style: italic;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const FloatingCard = styled.div`
  position: absolute;
  bottom: -2rem;
  right: -2rem;
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 250px;

  @media (max-width: 968px) {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 1rem;
    max-width: 100%;
  }
`

const FloatingNumber = styled.div`
  font-family: "Instrument Serif", serif;
  font-size: 3rem;
  color: #000000;
  margin-bottom: 0.5rem;
`

const FloatingText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  color: #666666;
  line-height: 1.6;
`

const Content = styled.div``

const Eyebrow = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #666666;
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-family: "Instrument Serif", serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 400;
  color: #000000;
  margin-bottom: 2rem;
  line-height: 1.2;

  span {
    font-style: italic;
  }
`

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`

const Signature = styled.div`
  font-family: "Instrument Serif", serif;
  font-size: 1.5rem;
  font-style: italic;
  color: #000000;
  margin-top: 2rem;
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid #e5e5e5;
`

const Stat = styled.div``

const StatNumber = styled.div`
  font-family: "Instrument Serif", serif;
  font-size: 2.5rem;
  color: #000000;
  margin-bottom: 0.3rem;
`

const StatLabel = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #666666;
`

function AboutSection() {
  return (
    <Section id='ueber-uns'>
      <Container>
        <ImageContainer>
          <MainImage>
            {/* <img src="/images/sarah-iver.jpg" alt="Sarah & Iver" /> */}
          </MainImage>
          <FloatingCard>
            <FloatingNumber>2024</FloatingNumber>
            <FloatingText>
              Gegründet aus der Überzeugung, dass jede Liebesgeschichte ein
              einzigartiges digitales Zuhause verdient.
            </FloatingText>
          </FloatingCard>
        </ImageContainer>

        <Content>
          <Eyebrow>Über uns</Eyebrow>

          <Title>
            Wir sind <span>Sarah & Iver</span>
          </Title>

          <Description>
            Als Paar wissen wir, wie besonders der Weg zur Hochzeit ist – und
            wie wichtig es ist, diese Geschichte richtig zu erzählen. Mit S&I.
            verbinden wir unsere Leidenschaft für Design und Technologie, um für
            euch Websites zu kreieren, die so einzigartig sind wie eure Liebe.
          </Description>

          <Description>
            Jedes Projekt beginnt mit einem persönlichen Gespräch. Wir möchten
            verstehen, wer ihr seid, was euch verbindet und wie wir eure
            Geschichte am besten erzählen können.
          </Description>

          <Signature>— Sarah & Iver</Signature>

          <Stats>
            <Stat>
              <StatNumber>50+</StatNumber>
              <StatLabel>Glückliche Paare</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>3</StatNumber>
              <StatLabel>Einzigartige Themes</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>100%</StatNumber>
              <StatLabel>Persönlicher Service</StatLabel>
            </Stat>
          </Stats>
        </Content>
      </Container>
    </Section>
  )
}

export default AboutSection
