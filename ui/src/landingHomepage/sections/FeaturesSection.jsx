import { Box, Container, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { ImCogs } from "react-icons/im";
import { RiTimerLine } from "react-icons/ri";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiBookOpen } from "react-icons/bi";
import styled from "styled-components";

const CustomBox = ({ style, ...props }) => {
  return (
    <Box
      style={{
        paddingBottom: "70px",
        ...style,
      }}
      {...props}
    />
  );
};

const BoxRowWrapper = ({ style, ...props }) => {
  return (
    <Box
      style={{
        display: "flex",
        flex: "1 0 100%",
        flexWrap: "wrap",
        gap: "50px",
        ...style,
      }}
      {...props}
    />
  );
};

const BoxColumnWrapper = ({ style, ...props }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flex: 1,
        minWidth: "234px",
        ...style,
      }}
      {...props}
    />
  );
};

const BoxGradientIconTransparent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 69px;
  height: 69px;
  line-height: 75px;
  border-radius: 50%;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  font-size: 28xp;
  z-index: 1;
  background-image: linear-gradient(#6240c8 0%, #a145fe 100%);
  margin-bottom: 30px;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: inherit;
    opacity: 0.15;
    z-index: -1;
    left: 0;
    top: 0;
    transform: scale(1.3);
    transition: all 0.3s ease-out 0s;
  }
`;

const BoxGradientIconAuto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 69px;
  height: 69px;
  line-height: 75px;
  border-radius: 50%;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  font-size: 28xp;
  z-index: 1;
  background-image: linear-gradient(#b548f2 0%, #d283fd 100%);
  margin-bottom: 30px;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: inherit;
    opacity: 0.15;
    z-index: -1;
    left: 0;
    top: 0;
    transform: scale(1.3);
    transition: all 0.3s ease-out 0s;
  }
`;

const BoxGradientIconTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 69px;
  height: 69px;
  line-height: 75px;
  border-radius: 50%;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  font-size: 28xp;
  z-index: 1;
  background-image: linear-gradient(#e44e83 0%, #ffb8d1 100%);
  margin-bottom: 30px;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: inherit;
    opacity: 0.15;
    z-index: -1;
    left: 0;
    top: 0;
    transform: scale(1.3);
    transition: all 0.3s ease-out 0s;
  }
`;

const BoxGradientIconGlobal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 69px;
  height: 69px;
  line-height: 75px;
  border-radius: 50%;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  font-size: 28xp;
  z-index: 1;
  background-image: linear-gradient(#40b4f6 0%, #79cefd 100%);
  margin-bottom: 30px;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: inherit;
    opacity: 0.15;
    z-index: -1;
    left: 0;
    top: 0;
    transform: scale(1.3);
    transition: all 0.3s ease-out 0s;
  }
`;

const BoxIcon = ({ style, ...props }) => {
  return (
    <Box
      style={{
        textAlign: "center",
        visibility: "visible",
        animationDuration: "1.3s",
        animationDelay: "0.8s",
        animationName: "fadeInUp",
        ...style,
      }}
      {...props}
    />
  );
};

const TypographyHeader = withStyles({
  root: {
    visibility: "visible",
    animationDelay: "0.4s",
    animationName: "fadeInUp",
    fontWeight: 700,
    color: "#313450",
    marginBottom: "15px",
  },
})(Typography);

const TypographyHeaderFeature = withStyles({
  root: {
    visibility: "visible",
    animationDelay: "0.4s",
    animationName: "fadeInUp",
    color: "#313450",
    fontSize: "25px",
    fontWeight: 700,
    marginBottom: "15px",
  },
})(Typography);

const TypographySubHeader = withStyles({
  root: {
    fontSize: "25px",
    fontWeight: 600,
    display: "block",
    color: "#43cea2",
    marginBottom: "12px",
    visibility: "visible",
    animationDelay: "0.2s",
    animationName: "fadeInDown",
  },
})(Typography);

const TypographyText = withStyles({
  root: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "28px",
    color: "#6B6F92",
    visibility: "visible",
    animationDelay: "0.6s",
    animationName: "fadeInUp",
  },
})(Typography);

const FeaturesSection = () => {
  return (
    <CustomBox id="features">
      <Container maxWidth="lg">
        <BoxRowWrapper>
          <Box
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "55px",
              textAlign: "center",
            }}
          >
            <TypographySubHeader variant="h4">Our Core</TypographySubHeader>
            <TypographyHeader variant="h3">Features</TypographyHeader>
            <TypographyText>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              <Box>nonumy eirmod tempor invidunt ut labore.</Box>
            </TypographyText>
          </Box>
        </BoxRowWrapper>
        <BoxRowWrapper>
          <BoxColumnWrapper>
            <BoxIcon>
              <BoxGradientIconTransparent>
                <BiBookOpen fontSize="30px" />
              </BoxGradientIconTransparent>
              <TypographyHeaderFeature variant="h4">
                Fully Transparent
              </TypographyHeaderFeature>
              <TypographyText>
                Based on Aswath Damoradan's models showing you each formula.
              </TypographyText>
            </BoxIcon>
          </BoxColumnWrapper>
          <BoxColumnWrapper>
            <BoxIcon>
              <BoxGradientIconAuto>
                <ImCogs fontSize="30px" />
              </BoxGradientIconAuto>
              <TypographyHeaderFeature variant="h4">
                Automated Inputs
              </TypographyHeaderFeature>
              <TypographyText>
                Automates your model inputs based on historical and current
                data.
              </TypographyText>
            </BoxIcon>
          </BoxColumnWrapper>
          <BoxColumnWrapper>
            <BoxIcon>
              <BoxGradientIconTime>
                <RiTimerLine fontSize="30px" />
              </BoxGradientIconTime>
              <TypographyHeaderFeature variant="h4">
                Saves Time
              </TypographyHeaderFeature>
              <TypographyText>
                Finds companies based on true intrinsic value within seconds.
              </TypographyText>
            </BoxIcon>
          </BoxColumnWrapper>
          <BoxColumnWrapper>
            <BoxIcon>
              <BoxGradientIconGlobal>
                <AiOutlineGlobal fontSize="30px" />
              </BoxGradientIconGlobal>
              <TypographyHeaderFeature variant="h4">
                Global
              </TypographyHeaderFeature>
              <TypographyText>
                Over 60+ stock exchanges and more than 120,000 tickers all over
                the world.
              </TypographyText>
            </BoxIcon>
          </BoxColumnWrapper>
        </BoxRowWrapper>
      </Container>
    </CustomBox>
  );
};

export default FeaturesSection;
