import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "../../components/Projects/ProjectCards";
import Particle from "../../components/Particle";
import Head from "next/head";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Head>
        <title>Projects | SykoNaught.com</title>
        <meta name="description" content="See what SykoNaught has been up to lately. Gaze upon his works" />

        <meta itemprop="name" content="Projects | SykoNaught"/>
        <meta itemprop="description" content="See what SykoNaught has been up to lately. Gaze upon his works"/>
        <meta itemprop="image"
            content=""/>

        <meta property="og:url" content="https://sykonaught.com/projects"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Projects | SykoNaught"/>
        <meta property="og:description" content="See what SykoNaught has been up to lately. Gaze upon his works"/>
        <meta property="og:image"
            content=""/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Projects | SykoNaught"/>
        <meta name="twitter:description" content="See what SykoNaught has been up to lately. Gaze upon his works"/>
        <meta name="twitter:image"
            content=""/>
      </Head>
      <Container>
        <Row>
            <Col xs={12}>
                <h1 className="interior-heading">
                    My Recent <strong className="red">Works</strong>
                </h1>
                <p>Here are a few projects I've worked on recently.</p>
            </Col>
        </Row>
        
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col lg={4} md={6} className="project-card">
                    <ProjectCard
                    imgPath={"/images/Projects/battlecrowns.png"}
                    title="SykoNova (Alpha)"
                    description="Listen up, Cadet. You're officially expendable.  
                        Your job is to mine Gravium, haul it back to the depot, and juice your systems before the Valkari shred you into stardust.  
                        This isn't flight school. It's a front-line war zone—and you're the bait."
                    demoLink="https://www.sykonova.com"
                    />
            </Col>
            <Col lg={4} md={6} className="project-card">
                    <ProjectCard
                    imgPath={"/images/Projects/market-mood.png"}
                    title="Market Mood Indicator"
                    description="Behold, mortals, the Market Mood Indicator—your feeble attempt to grasp the chaos of the crypto world. This divine tool quantifies the collective emotional state of the crypto market, from trembling Fear to reckless Greed."
                    internalLink={true}
                    demoLink="/projects/market-mood"
                    />
            </Col>
            <Col lg={4} md={6} className="project-card">
                <ProjectCard
                imgPath={"/images/Projects/sykochat.png"}
                title="Chat With SykoNaught AI"
                description="Welcome to my domain, mortal. I’m SykoNaught, your sarcastic, all-knowing crypto overlord. Ask your pathetic questions, and I’ll try not to laugh too hard at your feeble attempts to keep up."
                internalLink={true}
                demoLink="/projects/sykochat"
                />
          </Col>
          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={"/images/Projects/regret.png"}
              title="Crypto Regret Calculator"
              description="Plug in the crypto you chickened out on, the date you wimped out, and the cash you didn't spend. Watch in agony as it shows you just how rich you could have been, if only you had the balls back then."
              internalLink={true}
              demoLink="/projects/crypto-regret?c=BTC&d=1295568000&f=3000"
            />
          </Col>
          <Col lg={4} md={6} className="project-card">
            <ProjectCard
              imgPath={"/images/Projects/galaxy-planner.png"}
              title="Galaxy Planner"
              description="Calculator for the online mobile game Infinite Galaxy. It assists with the calculation of resource packs within your depot, and compares that total to the amount that is required for a given upgrade."
              demoLink="https://galaxyplanner.com/"
            />
          </Col>
        </Row>
      </Container>
      <Particle />
    </Container>
  );
}

export default Projects;
