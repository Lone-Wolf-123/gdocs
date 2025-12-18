import { Link } from 'react-router-dom';

export default function LandingPage() {
	return (
		<div>
			<h1>Welcome</h1>
			<Link to='/login'>Login</Link>
			<Link to='/register'>Create account</Link>
		</div>
	);
}
