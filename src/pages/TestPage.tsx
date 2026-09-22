import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Test } from "../types/test";

function TestPage() {
  const { id } = useParams();

  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const savedTests = localStorage.getItem("tests");

    if (savedTests) {
      const tests: Test[] = JSON.parse(savedTests);

      const foundTest = tests.find((item) => item.id === Number(id));

      if (foundTest) {
        setTest(foundTest);
      }
    }
  }, [id]);

  if (!test) {
    return (
      <>
        <div className="test-page test-message-page">
          <div className="test-message-card">
            <div className="test-message-icon test-error-icon">⚠️</div>

            <h1>Test topilmadi</h1>

            <p>
              Siz izlayotgan test mavjud emas yoki o‘chirilgan.
            </p>
          </div>
        </div>

        <TestPageStyle />
      </>
    );
  }

  if (test.questions.length === 0) {
    return (
      <>
        <div className="test-page test-message-page">
          <div className="test-message-card">
            <div className="test-message-icon">📝</div>

            <h1>{test.title}</h1>

            <p>Bu testda savollar mavjud emas.</p>
          </div>
        </div>

        <TestPageStyle />
      </>
    );
  }

  const question = test.questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / test.questions.length) * 100;

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Javobni tanlang");
      return;
    }

    const isCorrect = selectedAnswer === question.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(newScore);
    }

    if (currentQuestion === test.questions.length - 1) {
      setScore(newScore);
      setFinished(true);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer("");
  };

  if (finished) {
    const percentage = Math.round(
      (score / test.questions.length) * 100
    );

    return (
      <>
        <div className="test-page result-page">
          <div className="result-container">
            <div className="result-header">
              <div className="result-header-icon">🎉</div>

              <h1>Test yakunlandi!</h1>

              <p>{test.title}</p>
            </div>

            <div className="result-card">
              <div className="result-circle">
                <strong>{percentage}%</strong>

                <span>natija</span>
              </div>

              <h2>Natijangiz</h2>

              <p className="result-text">
                {score} / {test.questions.length} ta savolga to‘g‘ri
                javob berdingiz
              </p>

              <div className="result-stats">
                <div className="result-stat correct-stat">
                  <div>{score}</div>

                  <span>To‘g‘ri javob</span>
                </div>

                <div className="result-stat wrong-stat">
                  <div>{test.questions.length - score}</div>

                  <span>Noto‘g‘ri javob</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="restart-button"
              >
                ↻ Testni qayta ishlash
              </button>
            </div>
          </div>
        </div>

        <TestPageStyle />
      </>
    );
  }

  return (
    <>
      <div className="test-page">
        <div className="test-container">
          <div className="test-top">
            <div className="test-title-row">
              <div className="test-title-info">
                <h1>{test.title}</h1>

                <p>Testni ishlash</p>
              </div>

              <div className="test-counter">
                {currentQuestion + 1} / {test.questions.length}
              </div>
            </div>

            <div className="progress-bar">
              <div
                className="progress-value"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="question-card">
            <div className="question-label">
              <div>{currentQuestion + 1}</div>

              <span>Savol</span>
            </div>

            <h2>{question.question}</h2>

            <div className="options-list">
              {question.options.map((option, index) => {
                const selected = selectedAnswer === option;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedAnswer(option)}
                    className={`answer-option ${
                      selected ? "answer-option-selected" : ""
                    }`}
                  >
                    <span className="answer-number">
                      {index + 1}
                    </span>

                    <span className="answer-text">{option}</span>

                    {selected && (
                      <span className="answer-check">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="question-footer">
              <button
                type="button"
                onClick={handleNext}
                className="next-button"
              >
                {currentQuestion === test.questions.length - 1
                  ? "Testni yakunlash ✓"
                  : "Keyingi savol →"}
              </button>
            </div>
          </div>

          <div className="test-hint">
            Javobni tanlang va keyingi savolga o‘ting
          </div>
        </div>
      </div>

      <TestPageStyle />
    </>
  );
}

function TestPageStyle() {
  return (
    <style>{`
      .test-page {
        width: 100%;
        min-height: 100vh;
        background: #f8fafc;
        padding: 45px 20px 70px;
      }

      .test-container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
      }

      .test-message-page {
        padding: 70px 20px;
      }

      .test-message-card {
        width: 100%;
        max-width: 550px;
        margin: 0 auto;
        padding: 45px 30px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
      }

      .test-message-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 18px;
        border-radius: 18px;
        background: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 29px;
      }

      .test-error-icon {
        background: #fee2e2;
      }

      .test-message-card h1 {
        margin: 0 0 8px;
        color: #0f172a;
        font-size: 24px;
        font-weight: 800;
        overflow-wrap: anywhere;
      }

      .test-message-card p {
        margin: 0;
        color: #64748b;
        font-size: 14px;
        line-height: 1.6;
      }

      .test-top {
        margin-bottom: 20px;
      }

      .test-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        margin-bottom: 12px;
      }

      .test-title-info {
        min-width: 0;
        flex: 1;
      }

      .test-title-info h1 {
        margin: 0 0 5px;
        color: #0f172a;
        font-size: 25px;
        font-weight: 800;
        overflow-wrap: anywhere;
      }

      .test-title-info p {
        margin: 0;
        color: #64748b;
        font-size: 14px;
      }

      .test-counter {
        flex-shrink: 0;
        padding: 9px 13px;
        border-radius: 10px;
        background: #eef2ff;
        color: #4f46e5;
        font-size: 14px;
        font-weight: 800;
        white-space: nowrap;
      }

      .progress-bar {
        width: 100%;
        height: 8px;
        border-radius: 10px;
        background: #e2e8f0;
        overflow: hidden;
      }

      .progress-value {
        height: 100%;
        border-radius: 10px;
        background: #4f46e5;
        transition: width 0.3s ease;
      }

      .question-card {
        background: #ffffff;
        padding: 30px;
        border-radius: 20px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
      }

      .question-label {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 25px;
      }

      .question-label > div {
        width: 44px;
        height: 44px;
        flex-shrink: 0;
        border-radius: 12px;
        background: #eef2ff;
        color: #4f46e5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        font-weight: 800;
      }

      .question-label span {
        color: #64748b;
        font-size: 14px;
        font-weight: 600;
      }

      .question-card h2 {
        margin: 0 0 28px;
        color: #0f172a;
        font-size: 24px;
        line-height: 1.45;
        font-weight: 750;
        overflow-wrap: anywhere;
      }

      .options-list {
        display: grid;
        gap: 12px;
      }

      .answer-option {
        width: 100%;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 15px;
        text-align: left;
        border: 1px solid #cbd5e1;
        border-radius: 12px;
        background: #ffffff;
        color: #1e293b;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .answer-option-selected {
        border: 2px solid #4f46e5;
        background: #eef2ff;
        color: #1e293b;
        font-weight: 700;
      }

      .answer-number {
        width: 34px;
        height: 34px;
        flex-shrink: 0;
        border-radius: 9px;
        background: #f1f5f9;
        color: #475569;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 800;
      }

      .answer-option-selected .answer-number {
        background: #4f46e5;
        color: #ffffff;
      }

      .answer-text {
        min-width: 0;
        overflow-wrap: anywhere;
        line-height: 1.45;
      }

      .answer-check {
        margin-left: auto;
        flex-shrink: 0;
        color: #4f46e5;
        font-size: 18px;
      }

      .question-footer {
        margin-top: 28px;
        padding-top: 22px;
        border-top: 1px solid #e2e8f0;
      }

      .next-button {
        width: 100%;
        padding: 15px;
        border: none;
        border-radius: 11px;
        background: #4f46e5;
        color: #ffffff;
        font-size: 15px;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 7px 18px rgba(79, 70, 229, 0.18);
      }

      .test-hint {
        margin-top: 15px;
        text-align: center;
        color: #94a3b8;
        font-size: 13px;
      }

      .result-page {
        padding: 65px 20px 70px;
      }

      .result-container {
        width: 100%;
        max-width: 650px;
        margin: 0 auto;
      }

      .result-header {
        margin-bottom: 22px;
        text-align: center;
      }

      .result-header-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
        margin-bottom: 17px;
        border-radius: 20px;
        background: #dcfce7;
        font-size: 34px;
      }

      .result-header h1 {
        margin: 0 0 8px;
        color: #0f172a;
        font-size: 32px;
        font-weight: 800;
      }

      .result-header p {
        margin: 0;
        color: #64748b;
        font-size: 15px;
        overflow-wrap: anywhere;
      }

      .result-card {
        background: #ffffff;
        padding: 35px;
        border-radius: 22px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 12px 35px rgba(15, 23, 42, 0.06);
        text-align: center;
      }

      .result-circle {
        width: 150px;
        height: 150px;
        margin: 0 auto 28px;
        border-radius: 50%;
        background: #eef2ff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 8px solid #e0e7ff;
      }

      .result-circle strong {
        color: #4f46e5;
        font-size: 34px;
        line-height: 1;
      }

      .result-circle span {
        margin-top: 7px;
        color: #64748b;
        font-size: 13px;
      }

      .result-card h2 {
        margin: 0 0 10px;
        color: #0f172a;
        font-size: 23px;
        font-weight: 800;
      }

      .result-text {
        margin: 0 0 25px;
        color: #64748b;
        font-size: 16px;
        line-height: 1.5;
      }

      .result-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }

      .result-stat {
        padding: 17px;
        border-radius: 12px;
      }

      .correct-stat {
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
      }

      .wrong-stat {
        background: #fef2f2;
        border: 1px solid #fecaca;
      }

      .result-stat div {
        font-size: 23px;
        font-weight: 800;
      }

      .correct-stat div {
        color: #16a34a;
      }

      .wrong-stat div {
        color: #dc2626;
      }

      .result-stat span {
        display: block;
        margin-top: 4px;
        color: #64748b;
        font-size: 13px;
      }

      .restart-button {
        width: 100%;
        margin-top: 20px;
        padding: 14px;
        border: none;
        border-radius: 11px;
        background: #4f46e5;
        color: #ffffff;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
      }

      @media (max-width: 650px) {
        .test-page {
          padding: 35px 15px 50px;
        }

        .test-message-page {
          padding: 50px 15px;
        }

        .test-message-card {
          padding: 35px 22px;
          border-radius: 18px;
        }

        .test-title-row {
          align-items: flex-start;
          flex-direction: column;
          gap: 12px;
        }

        .test-title-info {
          width: 100%;
        }

        .test-title-info h1 {
          font-size: 23px;
        }

        .test-counter {
          align-self: flex-start;
        }

        .question-card {
          padding: 22px;
          border-radius: 18px;
        }

        .question-label {
          margin-bottom: 20px;
        }

        .question-card h2 {
          font-size: 21px;
          margin-bottom: 22px;
        }

        .answer-option {
          padding: 13px;
          gap: 10px;
          font-size: 14px;
        }

        .answer-number {
          width: 32px;
          height: 32px;
        }

        .result-page {
          padding: 45px 15px 55px;
        }

        .result-card {
          padding: 25px 20px;
          border-radius: 19px;
        }

        .result-header h1 {
          font-size: 28px;
        }
      }

      @media (max-width: 480px) {
        .test-page {
          padding: 28px 12px 40px;
        }

        .test-message-page {
          padding: 40px 12px;
        }

        .test-message-card {
          padding: 30px 18px;
        }

        .test-message-icon {
          width: 58px;
          height: 58px;
          font-size: 26px;
        }

        .test-message-card h1 {
          font-size: 21px;
        }

        .test-title-info h1 {
          font-size: 21px;
        }

        .test-title-info p {
          font-size: 13px;
        }

        .test-counter {
          width: 100%;
          text-align: center;
        }

        .question-card {
          padding: 18px;
          border-radius: 16px;
        }

        .question-label {
          gap: 9px;
          margin-bottom: 18px;
        }

        .question-label > div {
          width: 39px;
          height: 39px;
          border-radius: 10px;
          font-size: 15px;
        }

        .question-label span {
          font-size: 13px;
        }

        .question-card h2 {
          font-size: 19px;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .options-list {
          gap: 10px;
        }

        .answer-option {
          padding: 12px;
          border-radius: 10px;
        }

        .answer-number {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          font-size: 12px;
        }

        .answer-text {
          font-size: 13px;
        }

        .answer-check {
          font-size: 16px;
        }

        .question-footer {
          margin-top: 20px;
          padding-top: 18px;
        }

        .next-button {
          padding: 13px;
          font-size: 14px;
        }

        .test-hint {
          font-size: 12px;
          line-height: 1.5;
        }

        .result-page {
          padding: 35px 12px 45px;
        }

        .result-header-icon {
          width: 60px;
          height: 60px;
          margin-bottom: 14px;
          border-radius: 17px;
          font-size: 29px;
        }

        .result-header h1 {
          font-size: 25px;
        }

        .result-header p {
          font-size: 14px;
        }

        .result-card {
          padding: 22px 16px;
          border-radius: 17px;
        }

        .result-circle {
          width: 125px;
          height: 125px;
          margin-bottom: 22px;
          border-width: 7px;
        }

        .result-circle strong {
          font-size: 29px;
        }

        .result-card h2 {
          font-size: 21px;
        }

        .result-text {
          font-size: 14px;
        }

        .result-stats {
          grid-template-columns: 1fr;
        }

        .result-stat {
          padding: 14px;
        }

        .restart-button {
          font-size: 14px;
          padding: 13px;
        }
      }

      @media (max-width: 360px) {
        .test-page {
          padding-left: 10px;
          padding-right: 10px;
        }

        .question-card {
          padding: 15px;
        }

        .question-card h2 {
          font-size: 18px;
        }

        .answer-option {
          padding: 10px;
          gap: 8px;
        }

        .answer-text {
          font-size: 12.5px;
        }

        .result-card {
          padding: 20px 13px;
        }
      }
    `}</style>
  );
}

export default TestPage;
