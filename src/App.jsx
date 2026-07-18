import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import Section from "./components/Section";
import FeedbackOptions from "./components/FeedbackOptions";
import Statistics from "./components/Statistics";
import Notification from "./components/Notification";
import "./App.css";

export const FeedbackContext = createContext(null);

const App = () => {
  const appRef = useRef(null);
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const { good, neutral, bad } = feedback;

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    if (total === 0) return 0;
    return Math.round((good / total) * 100);
  };

  const total = countTotalFeedback();

  useEffect(() => {
    document.title =
      total === 0
        ? "Feedback Widget"
        : `Feedback Widget — ${total} review${total > 1 ? "s" : ""}`;
  }, [feedback, total]);

  const handleLeaveFeedback = (option) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const ConsumerDemo = () => {
    const ctx = useContext(FeedbackContext);
    useEffect(() => {
      if (ctx && ctx.feedback) return;
    }, [ctx]);
    return null;
  };

  return (
    <div className="app" ref={appRef}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={["good", "neutral", "bad"]}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
      <ConsumerDemo />
    </div>
  );
};

export default App;

export { FeedbackContext };