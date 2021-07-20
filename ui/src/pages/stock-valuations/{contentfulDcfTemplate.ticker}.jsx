import React from "react";
import { useLocation } from "@reach/router";
import { useSelector } from "react-redux";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";
import YouTube from "react-youtube";
import { graphql, Link as RouterLink } from "gatsby";
import { Box, Link, Typography } from "@material-ui/core";
import * as styles from "../../shared/video.module.css";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";
import getTitle from "../../shared/getTitle";
import resourceName from "../../shared/resourceName";
import Img from "gatsby-image";
import ReactMarkdown from "react-markdown";
import { labels } from "../../../../packages/intrinsic-valuations/src/spreadsheet/templates/freeCashFlowFirmSimple/inputQueryNames";
import Spreadsheet from "../../../../packages/intrinsic-valuations/src/spreadsheet/Spreadsheet";
import Section from "../../../../packages/intrinsic-valuations/src/components/Section";
import FormatRawNumberToPercent from "../../../../packages/intrinsic-valuations/src/components/FormatRawNumberToPercent";
import FormatRawNumber from "../../../../packages/intrinsic-valuations/src/components/FormatRawNumber";
import FormatRawNumberToCurrency from "../../../../packages/intrinsic-valuations/src/components/FormatRawNumberToCurrency";
import FormatRawNumberToYear from "../../../../packages/intrinsic-valuations/src/components/FormatRawNumberToYear";

export const query = graphql`
  fragment ValuationInformation on ContentfulDcfTemplate {
    ticker
    salesToCapitalRatio
    ebitTargetMarginInYear_10
    cagrInYears_1_5
    dateOfValuation
    yearOfConvergence
    probabilityOfFailure
    proceedsAsAPercentageOfBookValue
    fundamentalsData {
      General {
        Name
        Description
        LogoURL
        Code
        CountryISO
      }
    }
  }

  query ValuationQuery($ticker: String) {
    contentfulDcfTemplate(ticker: { eq: $ticker }) {
      ...ValuationInformation
      fundamentalsData {
        internal {
          content
        }
      }
      exchangeRates {
        internal {
          content
        }
      }
      price
      tenYearGovernmentBondYield
      dateOfValuation
      extraBusinessDescription {
        raw
      }
      competitors {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            fluid(maxWidth: 3080, quality: 90) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
      lookingForward {
        raw
      }
      relativeNumbers {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            fluid(maxWidth: 3080, quality: 90) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
      cagrInYears_1_5Description {
        childMarkdownRemark {
          html
        }
      }
      ebitTargetMarginInYear_10Description {
        childMarkdownRemark {
          html
        }
      }
      salesToCapitalRatioDescription {
        childMarkdownRemark {
          html
        }
      }
      yearOfConvergenceDescription {
        childMarkdownRemark {
          html
        }
      }
      probabilityOfFailureDescription {
        childMarkdownRemark {
          html
        }
      }
      percentageOfBookValueDescription {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

const isYoutubeURI = (data) => data.uri?.includes("youtube.com");

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return <Img {...node.data.target} />;
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      const containsYoutubeLink = node.content.some(({ data }) =>
        isYoutubeURI(data),
      );

      if (containsYoutubeLink) {
        // Need to return a div instead of a p because we cannot
        // modify the youtube components div tags and therefore
        // it would not be semantically correct html
        return (
          <Box>
            {node.content.map(({ value, data }, i) => {
              if (data.uri?.includes("youtube.com")) {
                const videoId = data.uri.split("v=")[1];

                return (
                  <Box key={i} sx={{ mt: 2, pb: 3 }}>
                    <YouTube
                      containerClassName={styles.videoWrapper}
                      videoId={videoId}
                      opts={{
                        width: 1500,
                        height: 600,
                      }}
                    />
                  </Box>
                );
              }

              return value;
            })}
          </Box>
        );
      }

      return <Box component="p">{children}</Box>;
    },
  },
};

const NumberSpan = ({ children, ...props }) => {
  return (
    <>
      <Box component="span" style={{ fontWeight: "bold" }} {...props}>
        {children}
      </Box>
      &nbsp;-&nbsp;
    </>
  );
};

const renderHtml = (html) => {
  return <ReactMarkdown allowDangerousHtml>{html}</ReactMarkdown>;
};

const Container = ({ sx, ...props }) => (
  <Typography component="div" paragraph sx={{ display: "flex" }} {...props} />
);

const renderField = (field) => {
  return renderRichText(field, options);
};

const Valuation = ({ data }) => {
  const location = useLocation();

  const {
    ticker,
    dateOfValuation,
    yearOfConvergence,
    salesToCapitalRatio,
    ebitTargetMarginInYear_10,
    cagrInYears_1_5,
    extraBusinessDescription,
    probabilityOfFailure,
    proceedsAsAPercentageOfBookValue,
    competitors,
    lookingForward,
    relativeNumbers,
    cagrInYears_1_5Description,
    ebitTargetMarginInYear_10Description,
    salesToCapitalRatioDescription,
    yearOfConvergenceDescription,
    probabilityOfFailureDescription,
    percentageOfBookValueDescription,
  } = data.contentfulDcfTemplate;

  // const dcfValuationValues = sheetsValues
  //   ? sheetsValues["DCF Valuation"]
  //   : null;

  // const estimatedValuePerShare =
  //   typeof dcfValuationValues?.[53]?.[1] === "number"
  //     ? dcfValuationValues[53][1]
  //     : 0;
  // const marginOfSafety =
  //   typeof dcfValuationValues?.[54]?.[1] === "number"
  //     ? dcfValuationValues[54][1]
  //     : 0;

  const formattedDateOfValuation = dayjs(dateOfValuation).format(
    "Do MMM. YYYY",
  );

  return (
    <></>
    // <>
    //   <Helmet>
    //     <title>{getTitle(`${general.name} Valuation`)}</title>
    //     <link
    //       rel="canonical"
    //       href={`${resourceName}/stock-valuations/${ticker}${location.search}`}
    //     />
    //     <meta
    //       name="description"
    //       content={`Is ${general.name} undervalued? See the full intrinsic valuation here.`}
    //     />
    //   </Helmet>
    //   <Box>
    //     {dateOfValuation && (
    //       <Typography textAlign="right" gutterBottom>
    //         This valuation was done on the {dateOfValuation}
    //       </Typography>
    //     )}
    //     <Box>
    //       <Typography variant="h5" gutterBottom>
    //         Business Description
    //       </Typography>
    //       <Typography component="div" paragraph>
    //         {general.description}
    //       </Typography>
    //       {extraBusinessDescription && (
    //         <Typography component="div" paragraph>
    //           {renderField(extraBusinessDescription)}
    //         </Typography>
    //       )}
    //     </Box>
    //   </Box>
    //   <Section>
    //     <Typography variant="h5" gutterBottom>
    //       Competitors
    //     </Typography>
    //     <Typography component="div" paragraph>
    //       {renderField(competitors)}
    //     </Typography>
    //   </Section>
    //   {lookingForward && (
    //     <Section>
    //       <Typography variant="h5" gutterBottom>
    //         Looking Forward
    //       </Typography>
    //       <Typography component="div" paragraph>
    //         {renderField(lookingForward)}
    //       </Typography>
    //     </Section>
    //   )}
    //   {relativeNumbers && (
    //     <Section>
    //       <Typography variant="h5" gutterBottom>
    //         Relative Numbers
    //       </Typography>
    //       <Typography component="div" paragraph>
    //         {renderField(relativeNumbers)}
    //       </Typography>
    //     </Section>
    //   )}
    //   <Section>
    //     <Typography variant="h5" gutterBottom>
    //       The input values I chose for the DCF
    //     </Typography>
    //     <Typography variant="h6" gutterBottom>
    //       {labels.cagrInYears_1_5}
    //     </Typography>
    //     <Container>
    //       <NumberSpan>
    //         <FormatRawNumberToPercent value={cagrInYears_1_5} />
    //       </NumberSpan>
    //       {renderHtml(cagrInYears_1_5Description.childMarkdownRemark.html)}
    //     </Container>
    //     <Typography variant="h6" gutterBottom>
    //       {labels.ebitTargetMarginInYear_10}
    //     </Typography>
    //     <Container>
    //       <NumberSpan>
    //         <FormatRawNumberToPercent value={ebitTargetMarginInYear_10} />
    //       </NumberSpan>
    //       {renderHtml(
    //         ebitTargetMarginInYear_10Description.childMarkdownRemark.html,
    //       )}
    //     </Container>
    //     <Typography variant="h6" gutterBottom>
    //       {labels.yearOfConvergence}
    //     </Typography>
    //     <Container>
    //       <NumberSpan>
    //         <FormatRawNumberToYear value={yearOfConvergence} />
    //       </NumberSpan>
    //       {renderHtml(yearOfConvergenceDescription.childMarkdownRemark.html)}
    //     </Container>
    //     <Typography variant="h6" gutterBottom>
    //       {labels.salesToCapitalRatio}
    //     </Typography>
    //     <Container>
    //       <NumberSpan>
    //         <FormatRawNumber decimalScale={2} value={salesToCapitalRatio} />
    //       </NumberSpan>
    //       {renderHtml(salesToCapitalRatioDescription.childMarkdownRemark.html)}
    //     </Container>
    //     {probabilityOfFailure && (
    //       <Typography variant="h6" gutterBottom>
    //         {labels.probabilityOfFailure}
    //       </Typography>
    //     )}
    //     {probabilityOfFailure && probabilityOfFailureDescription && (
    //       <Container>
    //         <NumberSpan>
    //           <FormatRawNumberToPercent value={probabilityOfFailure} />
    //         </NumberSpan>
    //         {renderHtml(
    //           probabilityOfFailureDescription.childMarkdownRemark.html,
    //         )}
    //       </Container>
    //     )}
    //     {proceedsAsAPercentageOfBookValue && (
    //       <Typography variant="h6" gutterBottom>
    //         {labels.probabilityOfFailure}
    //       </Typography>
    //     )}
    //     {proceedsAsAPercentageOfBookValue && percentageOfBookValueDescription && (
    //       <Container>
    //         <NumberSpan>
    //           <FormatRawNumberToPercent
    //             value={proceedsAsAPercentageOfBookValue}
    //           />
    //         </NumberSpan>
    //         {renderHtml(
    //           percentageOfBookValueDescription.childMarkdownRemark.html,
    //         )}
    //       </Container>
    //     )}
    //   </Section>
    //   <Section>
    //     <Typography paragraph>
    //       <b>Hint:</b> Have a play with the below inputs yourself and see how
    //       the valuation changes.
    //     </Typography>
    //   </Section>
    //   <Section>
    //     <Spreadsheet />
    //   </Section>
    //   <Section>
    //     <Typography variant="h5" gutterBottom>
    //       Conclusion
    //     </Typography>
    //     <Typography paragraph gutterBottom>
    //       I have estimated the shares to have a share price of
    //       <b>
    //         &nbsp;
    //         {/* <FormatRawNumberToCurrency value={estimatedValuePerShare} /> */}
    //       </b>
    //       &nbsp;per share.
    //     </Typography>
    //     <Typography paragraph gutterBottom>
    //       On the <b>{formattedDateOfValuation}</b> they traded for&nbsp;
    //       <b>
    //         <FormatRawNumberToCurrency value={price} />
    //       </b>
    //       &nbsp;a share which gives a margin of safety of&nbsp;
    //       <b>{/* <FormatRawNumberToPercent value={marginOfSafety} /> */}</b>.
    //     </Typography>
    //     <Typography>
    //       <Link
    //         component={RouterLink}
    //         to={`/stock/${ticker}/discounted-cash-flow`}
    //       >
    //         <b>Click here&nbsp;</b>
    //       </Link>
    //       to do your own Automated DCF for any company you want.
    //     </Typography>
    //   </Section>
    // </>
  );
};

export default Valuation;
