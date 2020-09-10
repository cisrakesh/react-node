import { combineReducers } from 'redux';

import{alert} from'./alert.reducer';
import { language } from './language.reducer';

const rootReducer = combineReducers({
  alert,
  language
});

export default rootReducer;