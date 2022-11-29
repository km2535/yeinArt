import React from "react";
import "./home.css";
import { useAuthContext } from "../components/context/AuthContext";
import { useEnquireContext } from "../components/context/EnquireContext";
import Content from "../components/main/content/content";
import Footer from "../components/main/footer/footer";
import Header from "../components/main/header/header";
import workList from "../service/workList";
import AddEnquire from "./enquire/addEnquire/addEnquire";

export default function Home() {
  const {
    fbuser,
    kauser,
    firebaseLogout,
    sessionLogout,
    historiesRef,
    majorWorkRef,
  } = useAuthContext();
  const { enquire } = useEnquireContext();
  return (
    <div className={enquire ? "rockPage" : "home"}>
      <AddEnquire />
      <header>
        <Header
          historiesRef={historiesRef}
          majorWorkRef={majorWorkRef}
          fbuser={fbuser}
          kauser={kauser}
          firebaseLogout={firebaseLogout}
          sessionLogout={sessionLogout}
        />
      </header>
      <section>
        <Content
          workList={workList}
          historiesRef={historiesRef}
          majorWorkRef={majorWorkRef}
        />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
