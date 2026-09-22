import { useEffect, useState } from "react";
import type { Question, Test } from "../types/test";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function CreateTestPage() {
  const { sectionId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const editId = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    if (!editId) {
      return;
    }

    const savedTests = localStorage.getItem("tests");

    if (savedTests) {
      const tests: Test[] = JSON.parse(savedTests);

      const test = tests.find((item) => item.id === Number(editId));

      if (test) {
        setTitle(test.title);
        setCategory(test.category);
        setDescription(test.description || "");
        setQuestions(test.questions);
      }
    }
  }, [editId]);

  const handleAddQuestion = () => {
    if (!question.trim()) {
      alert("Savolni kiriting");
      return;
    }

    if (options.some((option) => !option.trim())) {
      alert("Barcha javob variantlarini kiriting");
      return;
    }

    if (!correctAnswer) {
      alert("To‘g‘ri javobni tanlang");
      return;
    }

    const newQuestion: Question = {
      id: Date.now(),
      question,
      options,
      correctAnswer,
    };

    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setOptions(["", "", ""]);
    setCorrectAnswer("");
  };

  const handleSaveTest = () => {
    if (!title.trim()) {
      alert("Test nomini kiriting");
      return;
    }

    if (!category) {
      alert("Bo‘limni tanlang");
      return;
    }

    if (!description.trim()) {
      alert("Test haqida izoh kiriting");
      return;
    }

    if (questions.length === 0) {
      alert("Kamida bitta savol qo‘shing");
      return;
    }

    const savedTests = localStorage.getItem("tests");
    const tests: Test[] = savedTests ? JSON.parse(savedTests) : [];

    if (editId) {
      const updatedTests = tests.map((test) => {
        if (test.id === Number(editId)) {
          return {
            ...test,
            title,
            category,
            description,
            sectionId: Number(sectionId),
            questions,
          };
        }

        return test;
      });

      localStorage.setItem("tests", JSON.stringify(updatedTests));

      alert("Test yangilandi!");

      navigate(`/section/${sectionId}`);
      return;
    }

    const newTest: Test = {
      id: Date.now(),
      title,
      category,
      description,
      createdAt: new Date().toISOString(),
      sectionId: Number(sectionId),
      questions,
    };

    tests.push(newTest);

    localStorage.setItem("tests", JSON.stringify(tests));

    alert("Test saqlandi!");

    if (sectionId) {
      navigate(`/section/${sectionId}`);
    } else {
      navigate("/tests");
    }
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((item) => item.id !== id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "45px 20px 70px",
      }}
    >
      <style>
        {`
          .create-test-layout {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 330px;
            gap: 22px;
            align-items: start;
          }

          .answer-options {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .question-options {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 9px;
            margin-top: 18px;
          }

          .question-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 15px;
          }

          .question-title {
            display: flex;
            gap: 11px;
            align-items: flex-start;
          }

          .question-delete {
            flex-shrink: 0;
          }

          @media (max-width: 850px) {
            .create-test-layout {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 650px) {
            .create-test-page {
              padding: 35px 15px 50px !important;
            }

            .create-test-header h1 {
              font-size: 29px !important;
            }

            .create-test-header p {
              font-size: 14px !important;
            }

            .create-test-card {
              padding: 22px !important;
              border-radius: 17px !important;
            }

            .answer-options {
              grid-template-columns: 1fr;
            }

            .question-options {
              grid-template-columns: 1fr;
            }

            .question-top {
              flex-direction: column;
            }

            .question-delete {
              width: 100%;
            }
          }

          @media (max-width: 430px) {
            .create-test-page {
              padding: 25px 12px 40px !important;
            }

            .create-test-header {
              margin-bottom: 25px !important;
            }

            .create-test-icon {
              width: 52px !important;
              height: 52px !important;
              font-size: 24px !important;
            }

            .create-test-header h1 {
              font-size: 26px !important;
            }

            .create-test-card {
              padding: 18px !important;
            }

            .section-heading {
              gap: 10px !important;
              margin-bottom: 20px !important;
            }

            .section-number {
              width: 38px !important;
              height: 38px !important;
              font-size: 17px !important;
            }

            .section-heading h2 {
              font-size: 18px !important;
            }

            .section-heading p {
              font-size: 12px !important;
            }

            .question-item {
              padding: 17px !important;
            }

            .question-title-text {
              font-size: 15px !important;
            }

            .empty-questions {
              padding: 35px 15px !important;
            }
          }
        `}
      </style>

      <div
        className="create-test-page"
        style={{
          width: "100%",
          maxWidth: "1050px",
          margin: "0 auto",
        }}
      >
        <div
          className="create-test-header"
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <div
            className="create-test-icon"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "58px",
              height: "58px",
              marginBottom: "15px",
              borderRadius: "17px",
              background: "#eef2ff",
              color: "#4f46e5",
              fontSize: "27px",
            }}
          >
            {editId ? "✎" : "+"}
          </div>

          <h1
            style={{
              margin: "0 0 9px",
              color: "#0f172a",
              fontSize: "34px",
              fontWeight: "800",
              letterSpacing: "-0.7px",
            }}
          >
            {editId ? "Testni tahrirlash" : "Test yaratish"}
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            {editId
              ? "Test ma'lumotlarini o‘zgartiring"
              : "Yangi test yarating va savollar qo‘shing"}
          </p>
        </div>

        <div className="create-test-layout">
          <div
            className="create-test-card"
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div
              className="section-heading"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
                marginBottom: "25px",
              }}
            >
              <div
                className="section-number"
                style={{
                  width: "42px",
                  height: "42px",
                  flexShrink: 0,
                  borderRadius: "11px",
                  background: "#eef2ff",
                  color: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "800",
                }}
              >
                1
              </div>

              <div>
                <h2
                  style={{
                    margin: "0 0 4px",
                    color: "#0f172a",
                    fontSize: "20px",
                    fontWeight: "800",
                  }}
                >
                  Test ma'lumotlari
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "14px",
                  }}
                >
                  Test haqida asosiy ma'lumotlarni kiriting
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gap: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#334155",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  Test nomi
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Masalan: Matematika 5-sinf"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px 15px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    fontSize: "15px",
                    outline: "none",
                    color: "#0f172a",
                    background: "#ffffff",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#334155",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  Bo‘lim
                </label>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px 15px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    fontSize: "15px",
                    outline: "none",
                    color: category ? "#0f172a" : "#94a3b8",
                    background: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Bo‘limni tanlang</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Ingliz tili">Ingliz tili</option>
                  <option value="Tarix">Tarix</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#334155",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  Test haqida
                </label>

                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Test haqida qisqacha ma'lumot yozing"
                  rows={4}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px 15px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    fontSize: "15px",
                    outline: "none",
                    color: "#0f172a",
                    background: "#ffffff",
                    resize: "vertical",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className="create-test-card"
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div
              className="section-heading"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "22px",
              }}
            >
              <div
                className="section-number"
                style={{
                  width: "42px",
                  height: "42px",
                  flexShrink: 0,
                  borderRadius: "11px",
                  background: "#eef2ff",
                  color: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "800",
                }}
              >
                {questions.length}
              </div>

              <div>
                <h2
                  className="section-heading"
                  style={{
                    margin: "0 0 4px",
                    color: "#0f172a",
                    fontSize: "19px",
                    fontWeight: "800",
                  }}
                >
                  Savollar
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  Qo‘shilgan savollar soni
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  Tayyorlangan savollar
                </span>

                <strong
                  style={{
                    color: "#4f46e5",
                    fontSize: "16px",
                  }}
                >
                  {questions.length}
                </strong>
              </div>

              <div
                style={{
                  height: "7px",
                  borderRadius: "10px",
                  background: "#e2e8f0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: questions.length > 0 ? "100%" : "0%",
                    height: "100%",
                    borderRadius: "10px",
                    background: "#4f46e5",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="create-test-card"
          style={{
            marginTop: "22px",
            background: "#ffffff",
            padding: "30px",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            className="section-heading"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "13px",
              marginBottom: "25px",
            }}
          >
            <div
              className="section-number"
              style={{
                width: "42px",
                height: "42px",
                flexShrink: 0,
                borderRadius: "11px",
                background: "#eef2ff",
                color: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              2
            </div>

            <div>
              <h2
                style={{
                  margin: "0 0 4px",
                  color: "#0f172a",
                  fontSize: "20px",
                  fontWeight: "800",
                }}
              >
                Yangi savol
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Savol va javob variantlarini kiriting
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#334155",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Savol
              </label>

              <input
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Savolni kiriting"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px 15px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  fontSize: "15px",
                  outline: "none",
                  color: "#0f172a",
                  background: "#ffffff",
                }}
              />
            </div>

            <div>
              <p
                style={{
                  margin: "0 0 12px",
                  color: "#334155",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Javob variantlari
              </p>

              <div className="answer-options">
                {options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        background: "#eef2ff",
                        color: "#4f46e5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "800",
                        zIndex: 1,
                      }}
                    >
                      {index + 1}
                    </span>

                    <input
                      type="text"
                      value={option}
                      onChange={(event) => {
                        const newOptions = [...options];
                        newOptions[index] = event.target.value;
                        setOptions(newOptions);
                      }}
                      placeholder={`${index + 1}-variant`}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "13px 15px 13px 50px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "10px",
                        fontSize: "15px",
                        outline: "none",
                        color: "#0f172a",
                        background: "#ffffff",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#334155",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                To‘g‘ri javob
              </label>

              <select
                value={correctAnswer}
                onChange={(event) => setCorrectAnswer(event.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px 15px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  fontSize: "15px",
                  outline: "none",
                  background: "#ffffff",
                  color: correctAnswer ? "#0f172a" : "#94a3b8",
                  cursor: "pointer",
                }}
              >
                <option value="">To‘g‘ri javobni tanlang</option>

                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {index + 1}-variant
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleAddQuestion}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#4f46e5",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 6px 15px rgba(79, 70, 229, 0.16)",
              }}
            >
              + Savol qo‘shish
            </button>
          </div>
        </div>

        <div
          className="create-test-card"
          style={{
            marginTop: "22px",
            background: "#ffffff",
            padding: "30px",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "15px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  margin: "0 0 5px",
                  color: "#0f172a",
                  fontSize: "21px",
                  fontWeight: "800",
                }}
              >
                Qo‘shilgan savollar
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Testga qo‘shilgan barcha savollar
              </p>
            </div>

            <span
              style={{
                minWidth: "45px",
                padding: "8px 12px",
                borderRadius: "20px",
                background: "#eef2ff",
                color: "#4f46e5",
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              {questions.length}
            </span>
          </div>

          {questions.length === 0 ? (
            <div
              className="empty-questions"
              style={{
                padding: "45px 20px",
                border: "1px dashed #cbd5e1",
                borderRadius: "14px",
                textAlign: "center",
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  margin: "0 auto 14px",
                  borderRadius: "15px",
                  background: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "25px",
                }}
              >
                ❓
              </div>

              <h3
                style={{
                  margin: "0 0 7px",
                  color: "#334155",
                  fontSize: "16px",
                }}
              >
                Hozircha savollar qo‘shilmagan
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                Yuqoridagi forma orqali savol qo‘shing
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              {questions.map((item, index) => (
                <div
                  key={item.id}
                  className="question-item"
                  style={{
                    padding: "22px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "15px",
                    background: "#f8fafc",
                  }}
                >
                  <div className="question-top">
                    <div className="question-title">
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "30px",
                          height: "30px",
                          flexShrink: 0,
                          borderRadius: "8px",
                          background: "#e0e7ff",
                          color: "#4f46e5",
                          fontSize: "13px",
                          fontWeight: "800",
                        }}
                      >
                        {index + 1}
                      </span>

                      <p
                        className="question-title-text"
                        style={{
                          margin: "3px 0 0",
                          color: "#0f172a",
                          fontSize: "16px",
                          fontWeight: "700",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.question}
                      </p>
                    </div>

                    <button
                      className="question-delete"
                      type="button"
                      onClick={() => handleDeleteQuestion(item.id)}
                      style={{
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#fee2e2",
                        color: "#dc2626",
                        fontSize: "13px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      O‘chirish
                    </button>
                  </div>

                  <div className="question-options">
                    {item.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        style={{
                          padding: "11px 13px",
                          borderRadius: "9px",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          color: "#475569",
                          fontSize: "14px",
                        }}
                      >
                        <strong
                          style={{
                            color: "#4f46e5",
                            marginRight: "5px",
                          }}
                        >
                          {optionIndex + 1}.
                        </strong>

                        {option}
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: "13px",
                      padding: "11px 13px",
                      borderRadius: "9px",
                      background: "#dcfce7",
                      color: "#15803d",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    ✓ To‘g‘ri javob: {item.correctAnswer}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSaveTest}
          style={{
            width: "100%",
            marginTop: "22px",
            padding: "16px",
            border: "none",
            borderRadius: "12px",
            background: "#16a34a",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "800",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(22, 163, 74, 0.18)",
          }}
        >
          {editId ? "✓ O‘zgarishlarni saqlash" : "✓ Testni saqlash"}
        </button>
      </div>
    </div>
  );
}

export default CreateTestPage;