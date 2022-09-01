import { Logo } from "../components";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>

          <p>
            I'm baby succulents paleo shabby chic vice, poutine locavore
            slow-carb 90's hell of gastropub same ugh pop-up +1 swag. Man braid
            selfies kogi enamel pin shoreditch raclette. Coloring book shaman
            JOMO tonx franzen pabst fingerstache. Semiotics copper mug chillwave
            vice, coloring book plaid bitters cold-pressed affogato austin prism
            forage.
          </p>

          <Link className="btn btn-hero" to="/register">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
