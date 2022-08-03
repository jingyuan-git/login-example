import RegisterForm from "./components/RegisterForm";
import registerLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.png";
import "./index.less";

const Register = () => {
	console.log("Register");
	return (
		<div className="register-container">
			<div className="register-box">
				<div className="register-left">
					<img src={registerLeft} alt="register" />
				</div>
				<div className="register-form">
					<div className="register-logo">
						<img className="register-icon" src={logo} alt="logo" />
						<span className="logo-text">System Monitoring Tool</span>
					</div>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
};

export default Register;
