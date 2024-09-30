import { Container } from "react-bootstrap";
import FormAddPost from "../components/landingPageComp/formAddPost";
import Header from "../util/header";
import AllCards from "../components/landingPageComp/AllCards";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    localStorage.setItem("numberPage", "1");
  }, []);
  return (
    <>
      <Header></Header>
      <Container>
        <FormAddPost></FormAddPost>
        <AllCards></AllCards>
      </Container>
    </>
  );
};

export default LandingPage;
