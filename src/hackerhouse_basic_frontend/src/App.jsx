import { useState } from "react";
import NfidLogin from "./components/NfidLogin";

function App() {
  const [backendActor, setBackendActor] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [result, setResult] = useState("");

  function handleSubmitUserProfile(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    backendActor.setUserProfile(name).then((response) => {
      if (response.ok) {
        setUserId(response.ok.id.toString());
        setUserName(response.ok.name);
      } else if (response.err) {
        setUserId(response.err);
      } else {
        console.error(response);
        setUserId("Unexpected error, check the console");
      }
    });
    return false;
  }

  function handleSubmitSentimentAnalist(event) {
    event.preventDefault();
    const sentence = event.target.elements.sentence.value;
    backendActor
      .outcall_ai_model_for_sentiment_analysis(sentence)
      .then((response) => {
        if (response.ok) {
          console.log(response.ok);
          setResult("response.ok");
          // setUserId(response.ok.id.toString());
          // setUserName(response.ok.name);
        } else if (response.err) {
          console.log(response.err);
          setResult("response.err");
          // setUserId(response.err);
        } else {
          console.error(response);
          setUserId("Unexpected error, check the console");
        }
      });
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <h1>Welcome to IC AI Hacker House!</h1>
      {!backendActor && (
        <section id="nfid-section">
          <NfidLogin setBackendActor={setBackendActor}></NfidLogin>
        </section>
      )}
      {backendActor && (
        <>
          <form action="#" onSubmit={handleSubmitSentimentAnalist}>
            <label htmlFor="sentence">Write a sentence: &nbsp;</label>
            <input id="sentence" alt="Sentence" type="text" />
            <button type="submit">Save</button>
          </form>

          {result && <section className="response">{result}</section>}
        </>
      )}
    </main>
  );
}

export default App;
