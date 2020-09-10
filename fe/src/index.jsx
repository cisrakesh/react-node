import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import { App } from "./App";
import { store } from './_helpers';

class MyComponenet extends React.Component {
	render(){
		return (
			<Provider store={store}>
        		<App />
    		</Provider>
		);
	}
}

ReactDOM.render(<MyComponenet />,document.getElementById('app'));