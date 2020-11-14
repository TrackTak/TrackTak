import React from "react";
import { Container, Text, Absolute, Relative} from "rebass";
import { Box, Flex } from "grid-styled";
import styled from "styled-components";
import { ReactComponent as BackgroundPurple } from "../icons/backgroundPurple.svg";
import { ReactComponent as Check }  from "../icons/check.svg";
import { ReactComponent as GitHub }  from "../icons/gitHub.svg";
import SubscribeMailingList from "./SubscribeMailingList";

const GreenCheck = styled(Check)`
  margin-right: 10px;
  min-width: 30px;
  min-height: 30px;
  fill: ${({ theme }) => theme.colors.primary}
`;

const StepItem = ({ children, ...props }) => (
  <Box is="li" width={["initial", "60%", "100%"]} mx={["5%", "20%", 0]} my={12} {...props}>
    <Flex alignItems="center">
      <GreenCheck />
      <Text fontSize={21}>{children}</Text>
    </Flex>
  </Box>
);
const GetStartedMailingList = () => (
  <SubscribeMailingList
    subscribeText="Sign Me Up"
    submitSucceededMessage={
      <Flex justifyContent="center">
        Thank you for subscribing!
        We will notify you when we are live.
      </Flex>
    }
  />
);

const LandingPage = () => (
  <Relative style={{ height: '100%' }} >
    <Container pt={20} maxWidth={1100} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>
        <Text fontSize={[30, 40]} mt={10}>
          tracktak
        </Text>
        <Text fontWeight="bold" fontSize={[40, 60]} mt={30} color="#292929">
          Goodbye, spreadsheets.
          <Box>Hello, automated Discounted Cash Flows.</Box>
        </Text>
        <Box style={{ display: 'flex' }} mt={60}>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1 }}>
            <StepItem>Fully automates your models inputs based on historical data.</StepItem>
            <StepItem>Store all of your model variations in one place instead of 100’s of spreadsheets.</StepItem>
            <StepItem>Diagnose errors and unrealistic free cash flows in your models.</StepItem>
          </Box>
          <GitHub style={{ flex: 1 }} height={250} />
        </Box>
      </Box>
      <Box mt="auto" mb={65}>
        <Text textAlign="center" mb={30} fontWeight="bold" fontSize={28} color="white">
          Sign up today to start your free trial first when we launch.
        </Text>
        <GetStartedMailingList />
      </Box>
    </Container>
    <Absolute style={{ width: "100%", height: 300, bottom: 0 }} zIndex={-1}>
      <BackgroundPurple height="100%" width="100%" style={{ transform: "rotateX(180deg)" }} />
    </Absolute>
  </Relative>
);

export default LandingPage;
