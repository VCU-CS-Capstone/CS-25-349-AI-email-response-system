import React, { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

const LandingPage = () => {
  const navigate = useNavigate();
  const parallax = useRef(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 800 },
  });

  return (
    <div style={{ width: "100%", height: "100%", background: "#253237" }}>
      <div style={{ width: "100%", height: "100%", background: "#253237" }}>
        <div className="flex p-4 items-center justify-between bg-white shadow-md border-b border-navy-500">
          <div className="flex items-center space-x-2">
            <img
              src="./assets/CaseFlowLogo.png"
              alt="CaseFlow Logo"
              className="w-12 md:w-12 h-auto"
            />
            <Typography
              variant="h3"
              className="text-2xl text-navy-500 font-semibold tracking-wide"
            >
              CASEflow
            </Typography>
          </div>
          <div className="flex items-center">
            <Button
              className="mr-4 bg-transparent border border-navy-500 text-navy-500 px-6 py-3 rounded-xl shadow-lg hover:bg-navy-500 hover:text-white transition-all duration-300"
              size="md"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            <Button
              className="mr-4 bg-transparent border border-navy-500 text-navy-500 px-6 py-3 rounded-xl shadow-lg hover:bg-navy-500 hover:text-white transition-all duration-300"
              size="md"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      <Parallax ref={parallax} pages={7}>
        {/* Background Layers */}
        <ParallaxLayer
          offset={1}
          speed={1}
          style={{ backgroundColor: "#1d3259" }}
        />
        <ParallaxLayer
          offset={3}
          speed={1}
          style={{ backgroundColor: "#455680" }}
        />

        {/* Section 1: Welcome to CaseFlow */}
        <ParallaxLayer
          offset={0}
          speed={0}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "linear-gradient(180deg, #082348 0%, #1d3259 100%)",
          }}
        >
          <animated.div
            style={fadeIn}
            className="text-white h-screen flex flex-col justify-center items-center space-y-8 text-center px-6"
          >
            <div className="relative flex justify-center items-center">
              <img
                src="./assets/CaseFlowLogo.png"
                alt="CaseFlow Logo"
                className="h-40 w-auto md:h-56 md:w-auto rounded-3xl shadow-2xl"
              />
            </div>
            <Typography
              className="text-white font-extrabold tracking-wide"
              variant="h1"
            >
              Welcome to <span className="text-navy-100">CASEflow</span>
            </Typography>
            <Typography className="text-lg md:text-xl text-navy-100 opacity-80 max-w-3xl drop-shadow-md leading-relaxed">
              Elevate your customer interactions with AI-driven, efficient, and
              seamless email management.
            </Typography>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button
                className="bg-transparent border border-navy-100 text-navy-100 px-6 py-3 rounded-xl shadow-lg hover:bg-navy-100 hover:text-navy-600 transition-all duration-300 text-lg font-medium"
                onClick={() => navigate("/signup")}
              >
                Sign Up Now
              </Button>
              <Button className="bg-transparent border border-navy-100 text-navy-100 px-6 py-3 rounded-xl shadow-lg hover:bg-navy-100 hover:text-navy-600 transition-all duration-300 text-lg font-medium">
                Learn More
              </Button>
            </div>
          </animated.div>
        </ParallaxLayer>

        {/* Section 2: Features of CASEflow */}
        <ParallaxLayer
          offset={1}
          speed={0}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "linear-gradient(180deg, #1d3259 0%, #455680 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto px-6 py-20 text-white text-center space-y-12">
            <Typography variant="h2" className="text-4xl font-bold">
              Streamlining Customer Service Email Workflows
            </Typography>

            <div className="space-y-6 text-lg md:text-xl text-navy-100 opacity-90 leading-relaxed">
              <p>
                Customer service teams handle high email volumes under time
                pressure, often struggling to stay consistent and professional
                while balancing multiple tasks.
              </p>
              <p>
                Manual processes lead to delays, increased workload, and lower
                customer satisfaction.
              </p>
            </div>

            <Typography
              variant="h3"
              className="text-3xl font-semibold text-white pt-8"
            >
              Our AI-Powered CRM Solution
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 text-left">
              <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <Typography
                  variant="h5"
                  className="text-xl font-bold mb-3 text-white"
                >
                  Automated Draft Generation
                </Typography>
                <Typography className="text-navy-100 opacity-90">
                  We reduce response time by using a fine-tuned LLM to create
                  personalized, high-quality email drafts instantly.
                </Typography>
              </div>

              <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <Typography
                  variant="h5"
                  className="text-xl font-bold mb-3 text-white"
                >
                  Fine-Tuned with Support Data
                </Typography>
                <Typography className="text-navy-100 opacity-90">
                  Our model is customized using real customer service cases,
                  improving its tone, relevance, and professionalism.
                </Typography>
              </div>

              <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <Typography
                  variant="h5"
                  className="text-xl font-bold mb-3 text-white"
                >
                  Organized Case Dashboard
                </Typography>
                <Typography className="text-navy-100 opacity-90">
                  Manage cases with clarity — filter, sort, and track responses
                  in a structured, intuitive interface built for speed and
                  visibility.
                </Typography>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* Section 3: Why CASEflow? */}
        <ParallaxLayer
          offset={2}
          speed={0}
          onClick={() => parallax.current.scrollTo(3)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "linear-gradient(180deg, #455680 0%, #1d3259 100%)",
            flexDirection: "column",
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-8 py-16 text-white">
            <Typography
              variant="h2"
              className="text-4xl font-extrabold text-center mb-12"
            >
              Why CASEflow?
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Fast Response Time */}
              <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 text-center">
                <Typography
                  variant="h5"
                  className="text-2xl font-semibold mb-4"
                >
                  Fast Response Time
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-base opacity-90"
                >
                  Spend less time crafting email replies. CASEflow speeds up
                  your workflow by generating quick, quality drafts for every
                  scenario, ensuring timely responses.
                </Typography>
              </div>

              {/* Card 2: Focus on What Matters */}
              <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 text-center">
                <Typography
                  variant="h5"
                  className="text-2xl font-semibold mb-4"
                >
                  Focus on What Matters
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-base opacity-90"
                >
                  Automate routine replies so you can prioritize complex cases
                  and focus on the tasks that require your expertise, improving
                  team efficiency.
                </Typography>
              </div>

              {/* Card 3: Review & Edit */}
              <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 text-center">
                <Typography
                  variant="h5"
                  className="text-2xl font-semibold mb-4"
                >
                  Review & Edit
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-base opacity-90"
                >
                  Maintain full control over your responses. Review and
                  fine-tune AI drafts to ensure the highest quality and
                  relevance before sending.
                </Typography>
              </div>

              {/* Card 4: Smarter With Use */}
              <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 text-center">
                <Typography
                  variant="h5"
                  className="text-2xl font-semibold mb-4"
                >
                  Smarter With Use
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-base opacity-90"
                >
                  CASEflow continuously learns and improves its responses based
                  on user feedback, offering smarter and more personalized email
                  generation over time.
                </Typography>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* Section: Our Approach */}
        <ParallaxLayer
          offset={3}
          speed={0}
          onClick={() => parallax.current.scrollTo(4)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            cursor: "pointer",
            background: "linear-gradient(180deg, #1d3259 0%, #455680 100%)",
          }}
        >
          <div className="px-8 py-12 max-w-5xl w-full text-center">
            <Typography variant="h2" className="text-white font-semibold mb-6">
              Our Approach
            </Typography>

            <Typography
              variant="body1"
              className="text-white opacity-80 mb-8 text-lg"
            >
              We leverage a Retrieval-Augmented Generation (RAG) AI agent to
              assist customer service teams in drafting responses that are fast,
              accurate, and personalized. Our system pulls relevant, real-time
              information from a company-specific knowledge base to ensure each
              message aligns with customer context and internal policies.
            </Typography>

            <div className="mt-8">
              <img
                src="./assets/RAG.png"
                alt="Architecture Diagram"
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={4}
          speed={0}
          onClick={() => parallax.current.scrollTo(5)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            cursor: "pointer",
            background: "linear-gradient(180deg, #455680 0%, #1d3259 100%)",
          }}
        >
          <div className="px-8 py-12 max-w-4xl w-full text-center">
            <Typography variant="h2" className="text-white font-semibold mb-6">
              Sample Email Response
            </Typography>

            <div className="flex justify-center mb-6">
              <img
                src="./assets/ExampleResponse.jpeg"
                alt="Example AI-generated Email Response"
                className="rounded-lg shadow-lg max-h-[60vh] object-contain"
              />
            </div>

            <Typography variant="body1" className="text-white opacity-80">
              This response was generated by our fine-tuned model using real
              customer service data. It reflects the model’s ability to craft
              personalized, professional replies that align with company
              standards.
            </Typography>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={5}
          speed={0}
          onClick={() => parallax.current.scrollTo(0)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "linear-gradient(180deg, #1d3259 0%, #455680 100%)",
            padding: "60px 20px",
          }}
        >
          <div className="text-center mb-6 px-8 max-w-screen-lg mx-auto">
            <Typography
              variant="h2"
              className="text-white mb-6 font-bold tracking-tight"
            >
              Ready to get started?
            </Typography>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button
                className="bg-transparent border border-navy-100 text-navy-100 px-6 py-3 rounded-xl shadow-lg hover:bg-navy-100 hover:text-navy-600 transition-all duration-300 text-lg font-medium"
                onClick={() => navigate("/signup")}
              >
                Sign Up Now
              </Button>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default LandingPage;
