import "./Logout.css";
import photo from "../../Assets/images (1).png";
export const Logout = () => {
  return (
    <div className="asasas">
      <div className="container">
      <div className="ccsdsdddssss">
        <h1 className="welcom">welcome in national exams website</h1>
        <div className="dpar">
          <p className="par">
            national exams , you won't be able to close your eyes :(
          </p>
          <p className="par">
            always remember that whoever said:"Iam for it " will get it :)
          </p>
        </div>
        </div>
      </div>
      <div>
        {/* <!-- start Services --> */}
        <div className="services">
          <div>
            <h2 className="special-heading">Services</h2>
            <p>Don't be busy , be productive</p>
            <div className="conser">
              <div className="col">
                {/* <!-- start service 1  --> */}
                <div className="srv">
                  <i className="fas fa-palette fa-2x"></i>
                  <div className="text">
                    <h3>
                    Lectures section :
                    </h3>
                    <p>
                    The website contains all the lectures affiliated with Tishreen University that must be studied before sitting for the exam .
                    </p>
                  </div>
                </div>
                {/* <!-- end  service 1  --> */}
                {/* <!-- start service 2  --> */}
                <div className="srv">
                  <i className="fab fa-sketch fa-2x"></i>
                  <div className="text">

                    <h3> Previous course questions : </h3>
                    <p>
                    Studying them enables us to understand how to answer questions and how to think during the exam, and to understand a smooth strategy for studying in order to guarantee the highest possible mark.
                    </p>
                  </div>
                </div>
                {/* <!-- end  service 2  --> */}
              </div>

              {/* <!-- start service 4  --> */}
              <div className="srv">
                <i className="fas fa-pencil-ruler fa-2x"></i>
                <div className="text">
                  <h3>Experimental tests :</h3>
                  <p>
                  Where students can test themselves before taking the exam, find out their level of study, and evaluate their effort and focus .
                  </p>
                </div>
              </div>
              {/* <!-- end  service 4  --> */}

              <div className="col">
                <div className="imagehome imageH-column"></div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end services --> */}
      </div>
      {/* <!-- start about us --> */}
      <div className="about ">
        <h2 className="special-heading"> About Us </h2>
        <p> WHO ARE WE ? </p>
        <div className=" conserbout">
          <div className="ie">
            <img src={photo} alt="" />
          </div>
          <div className="text">
            <p>
            We are a group of graduate students from Tishreen University. We worked to compile the lectures for the Biology Department for all the subjects to be studied so that the student is prepared and qualified to take the final unified national exam.
            </p>
            <hr />
            <p>
            Our goal is to provide an enjoyable and useful study method for our fellow students to obtain good grades. We have created a special section for tests so that the student can take a trial test before taking the final exam.
            </p>
          </div>
        </div>
      </div>
      {/* <!-- start-cotact --> */}
      <div className="contact">
        <div className="">
          <h2 className="special-heading">Contact</h2>
          <p> we are born to create </p>
          <div className="info consercon">
            <p className="label">Feel free to drop us a line at :</p>
            <a
              href="armnazyrwrw@gmail.com"
              className="link"
            >
              Rahaf_Armanazi , Hanan_Altarah
            </a>
            <div className="social">
              <p>Find us on social networks: </p>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
            </div>
            {/* <!-- End-contact --> */}
            {/* <!-- start footer --> */}
            <div class="footer">
              &copy; 2024 <span>Leon</span> All Right Reserved
            </div>
            {/* <!-- End footer --> */}
          </div>
        </div>
      </div>
    </div>
  );
};
