import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Question from '../../features/question';
import AddQuestion from '../../features/question/pages/add-question/AddQuestion';
import DetailQuestion from '../../features/question/pages/detail-question/DetailQuestion';
import Tag from '../../features/tag';
import User from '../../features/user';
import UserDetail from '../../features/user/pages/UserDetail';

const Routes = () => {
	return (
		<Switch>
			<Route path='/' component={Question} exact />
			<Route path='/tags' component={Tag} exact />
			<Route path='/users' component={User} exact />
			<Route path='/users/:username' component={UserDetail} exact />
			<Route path='/addQuestion' component={AddQuestion} exact />
			<Route path='/question/:questionId' component={DetailQuestion} exact />
			<Route path='/questions/tags/:tag' component={Question} exact />
		</Switch>
	);
};

export default Routes;
