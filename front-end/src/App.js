import { Route, Switch } from 'react-router';
import { AuthorizationRoute } from './components/Common/AuthenticationRoute';
import Home from './components/Layout/Home/Home';
import Login from './components/Layout/Login/Login';
import Signup from './components/Layout/Signup/Signup';

function App() {
	return (
		<>
			<Switch>
				<AuthorizationRoute path='/login'>
					<Login />
				</AuthorizationRoute>
				<AuthorizationRoute path='/signup'>
					<Signup />
				</AuthorizationRoute>
				<Route component={props => <Home {...props} />} />
			</Switch>
		</>
	);
}

export default App;
