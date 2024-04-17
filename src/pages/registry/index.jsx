import { useNavigate } from "react-router-dom";
const Registry = () => {
  const navigate = useNavigate()


  async function createUser() {
    const email = document.querySelector('#userName').value;
    const password = document.querySelector('#userPassword').value;

    const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
    alert('Successful registration, please log in.');
    navigate('/login')
    } else {
    alert('Registration failed!');
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
        
        <button className="btn btn-primary mr-3" onClick={()=>createUser()}>
          Register
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            navigate("/login")
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default Registry;