import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import { graphql, useStaticQuery } from "gatsby";
import TeamMember from "../components/TeamMember";

const OurTeamSection = () => {
  const theme = useTheme();

  const data = useStaticQuery(graphql`
    query {
      memberOne: file(relativePath: { eq: "team-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      memberTwo: file(relativePath: { eq: "purple-background.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <>
      <Box>
        <Box
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: theme.spacing(7),
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInDown",
              fontSize: theme.fontSize.fontSizeMain,
              fontWeight: "bold",
            }}
            color="primary"
            gutterBottom
          >
            Our Team
          </Typography>
          <Typography
            sx={{
              visibility: "visible",
              animationDelay: "0.4s",
              animationName: "fadeInUp",
              fontWeight: "bold",
              color: theme.palette.primary.mainTextColor,
              marginBottom: theme.spacing(2),
            }}
            variant="h3"
          >
            Meet Our Board
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          <TeamMember
            memberInfo="Kristina is a founding partner of tracktak and a value investor.
            Kristina &amp; Martin are jointly responsible for the direction of the
            business. She is involved in helping users, partnerships,
            building the application and the company's financial health."
            memberTitle="Co-founder"
            memberName="Kristina Olchova"
            fluid={data.memberOne.childImageSharp.fluid}
          />
          <TeamMember
            memberInfo="Martin has over 8 years programming experience and is an avid
            follower of Aswath Damodaran. He is involved in marketing, partnerships
            and building out the road map for the application."
            memberTitle="Co-founder"
            memberName="Martin Dawson"
            fluid={data.memberOne.childImageSharp.fluid}
          />
          <TeamMember
            memberInfo="Sam joined us on April 2021. He is managing the company's
            technological projects and plans. Sam is responsible for
            backend, front-end application, scaling and cloud development."
            memberTitle="Co-founder"
            memberName="Sam Rose"
            fluid={data.memberOne.childImageSharp.fluid}
          />
        </Box>
      </Box>
    </>
  );
};

export default OurTeamSection;
