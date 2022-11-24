import React from "react";
import { useAuthContext } from "../components/context/AuthContext";
import Content from "../components/main/content/content";
import Footer from "../components/main/footer/footer";
import Header from "../components/main/header/header";
import workList from "../service/workList";

export default function Home() {
  const {
    fbuser,
    kauser,
    firebaseLogout,
    sessionLogout,
    historiesRef,
    majorWorkRef,
  } = useAuthContext();

  return (
    <div>
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
