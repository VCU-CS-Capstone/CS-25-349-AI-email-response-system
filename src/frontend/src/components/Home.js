import React from "react";
import { Button, Typography, Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { useSpring, useTrail, animated } from "@react-spring/web";
import { useUserInfo } from "../context/useUserInfo";

const Home = () => {
  const navigate = useNavigate();
  const { setUser } = useUserInfo(); // access user info for sign out

  const handleLogout = () => {
    setUser(null); // Clear user context
    localStorage.removeItem("user"); // remove user info from localStorage
    navigate("/");
  };

  // Hero section fade-in animation
  const heroAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 20 },
  });

  // Cards trail animation
  const cardsTrail = useTrail(2, {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="bg-navy-100 min-h-screen text-navy-500 flex flex-col">
      {/* Header Section */}
      <div className="flex p-4 items-center justify-between rounded-md bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src="./assets/CaseFlowLogo.png"
            alt="CaseFlow Logo"
            className="w-16 md:w-16 h-auto"
          />
          <Typography
            variant="h3"
            className="text-3xl text-navy-500 font-semibold"
          >
            CASEflow
          </Typography>
        </div>
        <div className="flex items-center">
          <Button
            className="mr-4 bg-navy-500"
            size="md"
            onClick={() => handleLogout()}
          >
            Log out
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <animated.div
        style={heroAnimation}
        className="flex flex-col justify-center items-center p-8 bg-navy-500 text-white w-full"
      >
        <img
          src="./assets/CaseFlowLogo.png"
          alt="Caseflow Logo"
          className="h-16 w-auto md:h-16 md:w-auto rounded-full mb-4"
        />
        <Typography variant="h2" className="text-4xl mb-2">
          Welcome Back!
        </Typography>
        <Typography className="text-lg mb-8">
          Start generating email responses with CASEflow.
        </Typography>
        <Button
          color="white"
          ripple="light"
          className="bg-white text-navy-500 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/")}
        >
          Go to Email Generator
        </Button>
      </animated.div>

      {/* Quick Actions Section */}
      <div className="py-16">
        <div className="container mx-auto text-center">
          <Typography
            variant="h2"
            className="text-4xl font-semibold mb-8 text-navy-500"
          >
            Quick Actions
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cardsTrail.map((style, index) => (
              <animated.div key={index} style={style}>
                <Card
                  className="p-6 rounded-lg shadow-lg bg-white flex flex-col justify-between items-center transition-transform duration-300 hover:shadow-xl hover:scale-105"
                >
                  <Typography
                    variant="h5"
                    className="font-bold mb-4 text-navy-500 text-center"
                  >
                    {index === 0 ? "View Cases" : "Submit New Case"}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-navy-500 text-center mb-6"
                  >
                    {index === 0
                      ? "View all cases from the case dashboard."
                      : "Easily submit a new case."}
                  </Typography>
                  <Button
                    className="bg-navy-500 text-white hover:bg-navy-600 w-full max-w-[200px] rounded-lg"
                    onClick={() =>
                      navigate(
                        index === 0 ? "/casedashboard" : "/casesubmission"
                      )
                    }
                  >
                    {index === 0 ? "View Cases" : "Submit Case"}
                  </Button>
                </Card>
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
