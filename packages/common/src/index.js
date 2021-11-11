import axios from './api/axios'
import api from './api/api'
import globeIcon from './assets/globe.svg'
import tracktakLogoSmallIcon from './assets/tracktak-logo-small.svg'
import tracktakLogoIcon from './assets/tracktak-logo.svg'
import TracktakLogo from './components/TracktakLogo'
import Header from './components/Header'
import PageSpinner from './components/PageSpinner'
import RoundButton from './components/RoundButton'
import TTRoundInput from './components/TTRoundInput'
import TTSnackbar from './components/TTSnackbar'
import useDebouncedCallback from './hooks/useDebouncedCallback'
import useCurrentPlan from './hooks/useCurrentPlan'
import selectSnackbar from './selectors/selectSnackbar'
import * as headerLinks from './shared/getHeaderLinks'
import * as utils from './shared/utils'
import * as regions from './data/regions'
import * as snackbarActions from './redux/actions/snackbarActions'
import * as snackbarReducer from './redux/reducers/snackbarReducer'
import theme from './theme'

export default {
  axios,
  api,
  globeIcon,
  tracktakLogoSmallIcon,
  tracktakLogoIcon,
  TracktakLogo,
  Header,
  PageSpinner,
  RoundButton,
  TTRoundInput,
  TTSnackbar,
  regions,
  useDebouncedCallback,
  useCurrentPlan,
  snackbarActions,
  snackbarReducer,
  selectSnackbar,
  headerLinks,
  utils,
  theme
}
