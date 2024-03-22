import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../store/authSlice";
import { useNavigate } from "react-router-dom";



const Home = () => {

  
  const token = useSelector(selectToken);
  const isLoggedIn = !!token;

  const navigate = useNavigate();

  useEffect(() => {

    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <main>
        <section className='section-hero'>
          <div className="container grid grid-two-cols">

            <div className="hero-content">
              <p>I'm the best Software Engineer</p>
              <h1>Welcome to mukesh technical</h1>
              <p>I'm Self-motivated and hardworking fresher seeking for an opportunity to work in a challenging environment to prove my skills and utilize my knowledge & intelligence in the growth of the organization.</p>

              <div className="btn btn-group">
                <a href="/login"><button className='btn'>Connect Now</button></a>
                <a href="/"><button className='btn secondary-btn'>Learn More</button></a>
              </div>
            </div>


            <div className="hero-image">
              <img src="/assets/images/Photo.jpeg" alt="Coding together" width="400" height="400" />
            </div>

          </div>
        </section>
      </main>
    </>
  )
}

export default Home