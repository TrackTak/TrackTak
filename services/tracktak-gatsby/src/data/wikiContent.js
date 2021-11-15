import React from 'react'
import { Box, List, ListItem, Typography } from '@mui/material'
import Formula from '../components/Formula'
import YoutubeTutorial from '../components/YoutubeTutorial'

const wikiContent = [
  {
    title: 'What is a DCF?',
    text: (
      <>
        A Discounted Cash Flow (DCF) is a tool that helps investors find the
        intrinsic value of a cash flow producing asset. In simple terms it's
        there to help you find if a stocks current price is undervalued based on
        the real value of the stock.
        <Box sx={{ m: 2 }}>
          <YoutubeTutorial />
        </Box>
      </>
    )
  },
  {
    title: 'Where does your data come from?',
    text: (
      <>
        We use the&nbsp;
        <a
          href='https://eodhistoricaldata.com'
          rel='noreferrer'
          target='_blank'
        >
          eodhistoricaldata
        </a>
        &nbsp;api.
      </>
    )
  },
  {
    title: 'How can I trust your DCF model?',
    text: (
      <>
        We base our model off of excel DCF templates by Aswath Damodaran. Aswath
        is a world renowned financial professor at NYU and is widely
        acknowledged as one of the best in the industry. You can see for your
        self by following along to his valuation courses on&nbsp;
        <a
          href='https://www.youtube.com/c/AswathDamodaranonValuation/playlists'
          rel='noreferrer'
          target='_blank'
        >
          youtube
        </a>
        &nbsp;or visting his&nbsp;
        <a
          href='http://pages.stern.nyu.edu/~adamodar'
          rel='noreferrer'
          target='_blank'
        >
          site
        </a>
        &nbsp;for all of the financial models.
      </>
    )
  },
  {
    title: 'Base Year, Years 1-10 & Terminal Year',
    text: (
      <>
        <Typography paragraph>
          The base year stands for the current year you are in, specifically the
          Trailing Twelve Months (TTM). The reason why we use the TTM and not
          the annual financial results is because it's the most up to date
          financial information for the company.
        </Typography>
        <Typography paragraph>
          1, 2, 3... 10 stands for the subsequent yearly data. For example if
          you are valuing a company on the 21st November 2020 and the most
          recent TTM data was last released on the 20th October 2020 then next
          year (base year) will be from 21st November 2020 to 21st November 2021
          and the same for the next years after that. So the years represent the
          subsequent years <b>after</b> the most recent financial results were
          released and not when you are doing the DCF.
        </Typography>
        <Typography paragraph>
          The terminal year is all of the years after year 10 up to infinity.
          It's not possible to model that far out into the future and even 10
          years is hard so we just assign a terminal year to solve this as best
          we can. The reason why it works doing it forever is because the
          discount rate eventually makes the terminal value worthless after so
          many years.
        </Typography>
      </>
    )
  },
  {
    title: 'Revenue',
    text: (
      <>
        <Typography paragraph>
          The revenue growth rate is one of the main value drivers that really
          affects the estimated value per share. So it is really important that
          you choose a realistic growth rate for your DCF. We provide a CAGR
          input for you in the cell: 'Required Inputs'!$B3.
        </Typography>
        <Typography paragraph>
          Compound Annual Growth Rate (CAGR) is the average growth rate that you
          think will happen for the company from year 1-5 revenues. We then use
          this as the revenue growth for years 1-5. To figure out what to put in
          this input you need to check the companies previous revenue growth
          rates, the industry average compared to year 10 revenue growth and
          also your thoughts on the future of the company.
        </Typography>
        <Typography paragraph>
          From years 6-10 revenues we slightly reduce the growth rate each year.
          This is to safe guard you against putting in an unreasonably large
          revenue growth rate. It's also more realistic in most cases due to
          companies growth slowing as their revenue becomes bigger and the
          company matures. The terminal growth year is then set to be equal to
          year 10's growth rate.
        </Typography>
      </>
    )
  },
  {
    title: 'Operating Margin',
    text: (
      <>
        <Typography paragraph>
          Operating Target Margin is the other main value driving input that
          heavily affects your DCF. We provide an input for you in the cell:
          'Required Inputs'!$B4.
        </Typography>
        <Typography paragraph>
          We use the operating margin input in Years 1-10 and set the terminal
          year to be equal to year 10. To figure out what to put in this input
          you need to check the companies current Operating margin, the
          industries average Operating margin and also your thoughts on what
          type of margin the company can achieve by year 10. This will differ
          greatly depending on how much of a&nbsp;
          <a
            rel='noreferrer'
            target='_blank'
            href='https://www.investopedia.com/terms/e/economicmoat.asp'
          >
            moat
          </a>
          &nbsp;your company has. For example, a company like Boeing is in a
          duopoly with Airbus so it should be able to hold it's current margins
          for a very long time.
        </Typography>
        <Typography paragraph>
          The Year of Convergence input also affects the Operating Margin
          calculations. We provide an input for you in the cell: 'Required
          Inputs'!$E3.
        </Typography>
        <Typography paragraph>
          The Operating Margin will slowly converge from the base years margin
          to your Operating margin in year 10. The speed at which this happens
          depends on the Year of Convergence that you type in to this input.
        </Typography>
      </>
    )
  },
  {
    title: 'Tax Rate',
    text: (
      <>
        The tax rate in the base year is set to be the effective tax rate for
        your company. This tax rate then converges to the marginal tax rate
        after year 5. The reason we converge from the effective tax rate to the
        marginal is because a company cannot defer it's taxes forever,
        eventually the company has to pay the countries marginal corporation tax
        rate.
      </>
    )
  },
  {
    title: 'NOPAT',
    text: (
      <>
        This is essentially the Earnings Before Interest. The difference between
        this and the NOPAT is that taxes are included in this calculation.
      </>
    )
  },
  {
    title: 'Reinvestment',
    text: (
      <>
        The sales to capital ratio one is that input that is used in these cells
        and located in 'Required Inputs'!$B4. This is how much the company is
        reinvesting into the company to grow. Companies cannot grow their
        revenue or margins without reinvesting profits back into the business.
        We calculate the difference between the revenues from this year to the
        previous year and divide it by the sales to capital ratio. This gives us
        the reinvestment amount for the current year.
      </>
    )
  },
  {
    title: 'FCFF',
    text: (
      <>
        Free Cash Flow to the Firm (FCFF) is the amount of money the company has
        left over that can be used for anything from dividends to reinvesting
        back into the firm.
      </>
    )
  },
  {
    title: 'NOL',
    text: (
      <>
        The inputs for this are the sections in 'Optional Inputs'!$Q8. Net
        Operating Loss (NOL). Any losses from the previous years that the
        company is carrying over to this year. The reason this is important in a
        DCF is because it reduces the taxable income so the company has to pay
        less tax.
      </>
    )
  },
  {
    title: 'Cost of Capital',
    text: (
      <>
        <Typography paragraph>
          The inputs for this are the sections in 'Optional Inputs'!$A7:$Q7
          which are Pre-tax Cost of Debt, Book Value of Convertible Debt and
          Number of Preferred Shares. Weighted Cost of Capital (WACC) has
          multiple elements that go in to calculating it. There are also
          different techniques to working out the WACC. We use Aswath
          Damodaran's bottom-up beta instead of the CAPM model. We believe this
          is a much better representation of risk. The elements that go into a
          companies WACC are:
        </Typography>
        <List disablePadding>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Risk Free Rate&nbsp;
              </Box>
              - The return you could get in the same currency with 0 risk. We
              use the last closing daily yield for the gb in the same currency
              that the valuation is being done in. The ads is the default chance
              in % for the country where the government bond is being used. The
              reason for this is that a lot of countries do not have Aaa ratings
              so they have default risk and therefore are not risk free so we
              have to adjust for that.
              <Formula
                formula='rfr = gb - ads'
                explanations={[
                  'rfr = Risk Free Rate',
                  'gb = Government Bonds 10 Year Yield',
                  'ads = Adjusted Default Spread'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Equity Risk Premium&nbsp;
              </Box>
              - The additional return demanded by investors for investing in
              that country. We set the mmerp to be the US because it is an
              establish mature market. The crp is going to be the spread between
              the country your company is in vs the mmerp. For example, if the
              mmerp is 5.23% then the US has an erp of 5.23% as it has no crp
              because it's credit rating is Aaa. The UK has a credit rating of
              AA2 which is lower than the US, it therefore has a crp of 0.73%.
              So the UK's erp is 5.96%. Investors demand more return for
              investing in the UK because the default chance is higher.
              <Formula
                formula='erp = mmerp + crp'
                explanations={[
                  'erp = Equity Risk Premium',
                  'mmerp = Mature Market Equity Risk Premium',
                  'crp = Country Risk Premium'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Estimated Pre-tax Cost of Debt&nbsp;
              </Box>
              - Each company has a cost of raising debt. The more debt a company
              raises the higher the chance of default but the tax benefits of
              offsetting interest payments also increases.
              <Formula
                formula='pt = rfr + is + ads'
                explanations={[
                  'pt = Estimated Pretax Cost of Debt',
                  'rfr = Risk Free Rate',
                  'is = Interest Spread',
                  'ads = Adjusted Default Spread'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Estimated Market Value of Normal Debt&nbsp;
              </Box>
              - The market value of Normal debt.
              <Formula
                formula='cd = ie * (1 - (1 + pt) ** - m)) / pt + bd / (1 + pt) ** m'
                explanations={[
                  'cd = Estimated Market Value of Normal Debt in Convertible',
                  'ie = Interest Expense',
                  'pt = Pre-tax Cost of Debt',
                  'm =  Average Maturity of Debt',
                  'bd = Book Value of Debt'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Estimated Market Value of Normal Debt in Convertible&nbsp;
              </Box>
              - The market value of Normal debt in convertible.
              <Formula
                formula='cd = iecd * (1 - (1 + pt) ** - mcd)) / pt + bcd / (1 + pt) ** mcd'
                explanations={[
                  'cd = Estimated Market Value of Normal Debt in Convertible',
                  'iecd = Interest Expense on Convertible Debt',
                  'pt = Pre-tax Cost of Debt',
                  'mcd = Maturity of Convertible Debt',
                  'bcd = Book Value of Convertible Debt'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Debt Market Value&nbsp;
              </Box>
              - The market value of debt.
              <Formula
                formula='d = sd + cd'
                explanations={[
                  'd = Debt Market Value',
                  'sd = Estimated Market Value of Normal Debt',
                  'cd = Estimated Market Value of Normal Debt in Convertible'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Equity Market Value&nbsp;
              </Box>
              - The market value of equity. We use the market value and not book
              value because it's the theoretical price you would have to pay to
              acquire the company.
              <Formula
                formula='em = p * so'
                explanations={[
                  'em = Equity Market Value',
                  'p = Current Stock Price',
                  'so = Shares Outstanding'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Preferred Stock Market Value&nbsp;
              </Box>
              - The market value of Preferred Stock outstanding.
              <Formula
                formula='ps = n * mp'
                explanations={[
                  'ps = Preferred Stock Market Value',
                  'n = Number of Preferred Shares Outstanding',
                  'mp = Market Price Per Share'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Total Market Value&nbsp;
              </Box>
              - The sum of Total Market Value.
              <Formula
                formula='tm = em + d + ps'
                explanations={[
                  'tm = Total Market Value',
                  'em = Total Equity Market Value',
                  'd = Total Debt Market Value',
                  'ps = Total Preferred Stock Market Value'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Unlevered Beta&nbsp;
              </Box>
              - The risk a company has in it's industry relative to other
              companies. We use a bottom-up beta for this. Currently we only use
              a single industry that we get from our API for the company. We
              will support multiple industries for this field in the future. For
              95% of companies a single industry is fine. We lookup the average
              unlevered beta for your companies industry and set this field
              equal to it.
              <Formula
                formula='ub = iub'
                explanations={[
                  'ub = Unlevered Beta',
                  'iub = Industry Average Unlevered Beta'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Levered Beta&nbsp;
              </Box>
              - The risk a company has in it's industry relative to other
              companies including how leveraged it is, i.e debt. Leverage varies
              across industries, for example the air transport industry has to
              take on a lot of debt to purchase or lease expensive airplanes,
              whereas a software company might only have to take on a small
              amount of debt. We need to take this into account when determining
              risk as the more debt a company has, the more likely it is to
              default on that debt.
              <Formula
                formula='lb = ub * (1 + (1 - t) * (d / e))'
                explanations={[
                  'lb = Levered Beta',
                  'ub = Unlevered Beta',
                  't = Marginal Tax Rate',
                  'd = Debt Market Value',
                  'e = Equity Market Value'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box component='span' style={{ fontWeight: 'bold' }}>
                Cost of Preferred Stock&nbsp;
              </Box>
              <Formula
                formula='cps = anp / mp '
                explanations={[
                  'cps = Cost of Preferred Stock',
                  'anp = Annual Dividend PerShare',
                  'mp = Market Price Per Share'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box
                component='span'
                style={{ fontWeight: 'bold', paddingBottom: 0 }}
              >
                Equity Weight&nbsp;
              </Box>
              - Weighted % of equity.
              <Formula
                formula='we = em / tm'
                explanations={[
                  'we = Weighted % of equity',
                  'em = Equity Market Value',
                  'tm = Total Market Value'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box
                component='span'
                style={{ fontWeight: 'bold', paddingBottom: 0 }}
              >
                Debt Weight&nbsp;
              </Box>
              - Weighted % of debt.
              <Formula
                formula='wd = d / tm'
                explanations={[
                  'wd = Weighted % of Debt',
                  'd = Debt Market Value',
                  'tm = Total Market Value'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box
                component='span'
                style={{ fontWeight: 'bold', paddingBottom: 0 }}
              >
                Preferred Stock Weight&nbsp;
              </Box>
              - Weighted % of preferred stock.
              <Formula
                formula='wps = ps / tm'
                explanations={[
                  'wps = Weighted % of Preferred Stock',
                  'ps = Preferred Stock Market Value',
                  'tm = Total Market Value'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box
                component='span'
                style={{ fontWeight: 'bold', paddingBottom: 0 }}
              >
                Total Weight&nbsp;
              </Box>
              - Total weight in cost of capital.
              <Formula
                formula='twc = we + wd + wps'
                explanations={[
                  'twc = Total Weight Cost of Capital',
                  'we = Weighted % of equity',
                  'wd = Weighted % of Debt',
                  'wps = Weighted % of Preferred Stock'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box
                component='span'
                style={{ fontWeight: 'bold', paddingBottom: 0 }}
              >
                Equity Cost of Capital&nbsp;
              </Box>
              <Formula
                formula='ecc = rfr + lb + erp'
                explanations={[
                  'ecc =  Equity Cost of Capital',
                  'rfr = Risk Free Rate',
                  'lb = Levered Beta',
                  'erp = Equity Risk Premium'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box
                component='span'
                style={{ fontWeight: 'bold', paddingBottom: 0 }}
              >
                Debt Cost of Capital&nbsp;
              </Box>
              <Formula
                formula='dcc = pt * t'
                explanations={[
                  'dcc =  Debt Cost of Capital',
                  'pt = Estimated Pretax Cost of Debt',
                  't = Marginal Tax Rate'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box
                component='span'
                style={{ fontWeight: 'bold', paddingBottom: 0 }}
              >
                Preferred Stock Cost of Capital&nbsp;
              </Box>
              <Formula
                formula='ps = cps'
                explanations={[
                  'ps = Preferred Stock Cost of Capital',
                  'cps = Cost of Preferred Stock'
                ]}
              />
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              <Box
                component='span'
                style={{ fontWeight: 'bold', paddingBottom: 0 }}
              >
                Cost of Capital (WACC)&nbsp;
              </Box>
              - The total cost of raising capital for the company weighted by
              the type of capital it raises, i.e equity, debt or preferred
              stock. For example, if a company raises 80% of it's capital in
              equity then the weight for equity will be set to 80% as equity
              would have more of an affect on the cost of the capital.
              <Formula
                formula='wacc = we * e + wd * d + wps * ps'
                explanations={[
                  'wacc = Weighted Average Cost of Capital',
                  'we = Weighted % of equity',
                  'e = Equity Cost of Capital',
                  'wd = Weighted % of Debt',
                  'd = Debt Cost of Capital',
                  'wps = Weighted % of Preferred Stock',
                  'ps = Preferred Stock Cost of Capital'
                ]}
              />
            </Box>
          </ListItem>
        </List>
      </>
    )
  },
  {
    title: 'Cumulated Discount Factor',
    text: (
      <>
        This is the opposite of the Cost of Capital in decimal form. We take the
        previous years Discount Factor into account as well.
      </>
    )
  },
  {
    title: 'PV (FCFF)',
    text: (
      <>
        Present Value of Free Cash Flow to the Firm (PV (FCFF)) is the FCFF
        modified by the Discount Factor. The reason why we do this is because
        the cash earned by a company today is worth more than cash earned in the
        future. This is due to the time value of money and the risks surrounding
        a company (which is captured in the Cost of Capital).
      </>
    )
  },
  {
    title: 'Terminal Cash Flow',
    text: (
      <>The cash flows that the company generates each year after year 10.</>
    )
  },
  {
    title: 'Terminal Cost of Capital',
    text: <>The cost of capital for the company each year after year 10.</>
  },
  {
    title: 'Terminal Value',
    text: <>The total value of the cash flows after year 10.</>
  },
  {
    title: 'PV (Terminal Value)',
    text: (
      <>
        The total value of the cash flows after year 10 discounted to today's
        value. This is the true value of the Terminal Cash flows.
      </>
    )
  },
  {
    title: 'PV (CF Over Next 10 Years)',
    text: (
      <>
        The total value of the cash flows in the next 10 years discounted to
        today's value.
      </>
    )
  },
  {
    title: 'Sum of PV',
    text: <>The total sum of the present values of the previous two fields.</>
  },
  {
    title: 'Probability of Failure',
    text: (
      <>
        The input for this is in 'Optional Inputs'!$J4. Many young, growth
        companies fail, especially if they have trouble raising cash. Many
        distressed companies fail because they have trouble making debt
        payments. This is a tough input to estimate but try to use the agencies
        credit rating if the company has one, if not then use the synthetic
        credit rating default spread as a guide.
      </>
    )
  },
  {
    title: 'Proceeds if the Firm Fails',
    text: (
      <>
        The input for this is in 'Optional Inputs'!$J5. If the company fails
        then sometimes there will be assets that get sold off (usually at fire
        sale prices) or cash left over to distribute to shareholders. This is
        only true if all liabilities have been paid first as shareholders are
        last in line if a company goes bankrupt. Sometimes however, companies
        will continue to run themselves into the ground with more debt to
        continue giving the executives a job and therefore will never have
        proceeds to distribute to shareholders.
      </>
    )
  },
  {
    title: 'Operating Assets',
    text: (
      <>
        We take the Sum of the Present Value and modify it. We minus debt and
        minority interests due to it not being distributable to shareholders.
        Cash and Non-Operating Assets are added back as these are distributable
        to shareholders but were not part of the DCF.
      </>
    )
  },
  {
    title: 'Equity',
    text: (
      <>
        This is the sum of the above calculations after Operating Assets has
        been modified.
      </>
    )
  },
  {
    title: 'Options',
    text: (
      <>
        The inputs for this are in 'Optional Inputs'!$H2:$H4 which are Employee
        Options Outstanding, Average Strike Price and Average Maturity. We minus
        Employee Options from Equity due to the company having to pay cash to
        these employees when they exercise them. Thus there is less cash
        attributable to shareholders.
      </>
    )
  },
  {
    title: 'Common Stock Equity',
    text: (
      <>
        This is Equity with the employee options taken away. This is the final
        result of equity which is distributable to shareholders over the
        companies life according to your DCF.
      </>
    )
  },
  {
    title: 'Estimated Value Per Share',
    text: (
      <>
        The intrinsic value per share that the share price should be trading at
        according to your DCF. This may be accurate or not, it all depends on
        how accurate your inputs are.
      </>
    )
  },
  {
    title: 'Margin of Safety',
    text: (
      <>
        How undervalued or overvalued the current price of the stock, if it is
        undervalued then the stock is said to have a&nbsp;
        <a
          href='https://www.investopedia.com/terms/m/marginofsafety.asp'
          rel='noreferrer'
          target='_blank'
        >
          margin of safety
        </a>
        .
      </>
    )
  }
]

export default wikiContent
