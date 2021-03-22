import { selectors } from './utilities/selectors.js'
import loadTemplate from './pages/template.js'


selectors.resetButton.addEventListener('click', loadTemplate)
selectors.loadButton.addEventListener('click', loadTemplate)

