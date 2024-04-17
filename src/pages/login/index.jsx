import { useNavigate } from "react-router-dom";
import './index.css'
const Login = ()=>{
  const navigate = useNavigate()

  async function loginUser() {
    const email = document.querySelector('#userName').value;
    const password = document.querySelector('#userPassword').value;
  
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      localStorage.setItem('userName', email);
      alert('Log in successfully!');
     navigate('/history')
    } else {
      alert('Login failed, please check your email and password.');
    }
  }
  return (
    <div className="login">
             <div id="loginControls">
          <div className="my-3">
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="userPassword"
              placeholder="Enter your password"
            />
          </div>
          <button className="btn btn-primary mr-3" onClick={()=>{loginUser()}}>Login</button>
          <button className="btn btn-secondary" onClick={()=>navigate('/registry')}>
            Register
          </button>
        </div>
    </div>
  )
}
export default Login;