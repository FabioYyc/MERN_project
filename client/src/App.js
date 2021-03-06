import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import Profiles from './components/profiles/Profiles';
import UserProfile from './components/userProfile/UserProfile';
import PostPage from "./components/post/PostPage"


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	//Only run once when it is loading(componentDidMount)
	//When the state update, it will not re-run with the []
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar/>
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						<PrivateRoute exact path="/create-profile" component={CreateProfile} />
						<PrivateRoute exact path="/edit-profile" component={EditProfile} />
						<PrivateRoute exact path="/add-fight-experience" component={AddExperience} />
						<Route path="/profiles" component={Profiles} />
						<Route path="/posts" component={PostPage} />
						<Route path="/profile/:id" component={UserProfile} />
						<Route path="/" render={() => <div>Page Not found </div>} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
