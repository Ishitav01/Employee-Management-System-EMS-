import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="glitch-text">404</h1>
        <p className="notfound-message">
          Oops! The page you're looking for has gone missing.
        </p>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{ mt: 3 }}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
