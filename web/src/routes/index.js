import Login from '../containers/login/login';
import Register from '../containers/register/register';
import Management from '../containers/management/management';
import {Navigate} from 'react-router-dom'

export default [
	{
		path:'/management',
		element:<Management/>
	},
	{
		path:'/login',
		element:<Login/>,
	},
	{path:'/register',
		element:<Register/>,
	},
	{
		path:'/',
		element:<Navigate to="/management"/>
	}
]