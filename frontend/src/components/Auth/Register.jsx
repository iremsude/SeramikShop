import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("BACKEND CEVABI:", result); // ✨ Debug

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        message.success("Kayıt başarılı 💖", 2); // 2 sn göster

        setTimeout(() => {
          navigate("/");
        }, 2000); // mesaj süresi kadar bekle
      } else {
        message.error(result.message || "Kayıt başarısız 💔");
      }
    } catch (error) {
      console.error("Kayıt sırasında hata:", error);
      message.error("Bir şeyler yanlış gitti 😢");
    }
  };

  return (
    <div className="account-column">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <a href="#">privacy policy.</a>
          </p>
          <button type="submit" className="btn btn-sm">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
