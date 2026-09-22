import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Section, Test } from "../types/test";

function SectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [section, setSection] = useState<Section | null>(null);
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const savedSections = localStorage.getItem("sections");
    const savedTests = localStorage.getItem("tests");

    if (savedSections) {
      const sections: Section[] = JSON.parse(savedSections);
      const foundSection = sections.find((item) => item.id === Number(id));

      if (foundSection) {
        setSection(foundSection);
      }
    }

    if (savedTests) {
      const allTests: Test[] = JSON.parse(savedTests);

      const sectionTests = allTests.filter(
        (test) => test.sectionId === Number(id) && !test.archived
      );

      setTests(sectionTests);
    }
  }, [id]);

  const handleArchiveTest = (testId: number) => {
    const savedTests = localStorage.getItem("tests");

    if (!savedTests) return;

    const allTests: Test[] = JSON.parse(savedTests);

    const updatedTests = allTests.map((test) =>
      test.id === testId ? { ...test, archived: true } : test
    );

    localStorage.setItem("tests", JSON.stringify(updatedTests));

    const sectionTests = updatedTests.filter(
      (test) => test.sectionId === Number(id) && !test.archived
    );

    setTests(sectionTests);
  };

  if (!section) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <style>
          {`
            @media (max-width: 480px) {
              .section-not-found {
                padding: 35px 20px !important;
                border-radius: 17px !important;
              }

              .section-not-found-icon {
                width: 54px !important;
                height: 54px !important;
                font-size: 25px !important;
              }

              .section-not-found h2 {
                font-size: 20px !important;
              }

              .section-not-found p {
                font-size: 14px !important;
              }

              .section-not-found button {
                width: 100%;
              }
            }
          `}
        </style>

        <div
          className="section-not-found"
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "#ffffff",
            padding: "45px 30px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 12px 35px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            className="section-not-found-icon"
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 20px",
              borderRadius: "16px",
              background: "#eef2ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            📚
          </div>

          <h2
            style={{
              margin: "0 0 10px",
              color: "#0f172a",
            }}
          >
            Bo‘lim topilmadi
          </h2>

          <p
            style={{
              margin: "0 0 25px",
              color: "#64748b",
            }}
          >
            Siz qidirayotgan bo‘lim mavjud emas.
          </p>

          <button
            type="button"
            onClick={() => navigate("/sections")}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              background: "#4f46e5",
              color: "#ffffff",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Bo‘limlarga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="section-page"
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px 60px",
      }}
    >
      <style>
        {`
          .section-container {
            width: 100%;
            max-width: 1050px;
            margin: 0 auto;
          }

          .section-hero-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 25px;
            flex-wrap: wrap;
          }

          .section-hero-info {
            flex: 1;
            min-width: 250px;
          }

          .section-test-count {
            min-width: 110px;
          }

          .section-tests-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }

          .section-create-button {
            white-space: nowrap;
          }

          .section-test-card-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 20px;
            flex-wrap: wrap;
          }

          .section-test-info {
            flex: 1;
            min-width: 250px;
          }

          .section-test-actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .section-test-action {
            white-space: nowrap;
          }

          .section-test-meta {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          @media (max-width: 650px) {
            .section-page {
              padding: 30px 15px 50px !important;
            }

            .section-back-button {
              width: 100%;
              justify-content: center;
            }

            .section-hero {
              padding: 25px !important;
              border-radius: 18px !important;
            }

            .section-hero-content {
              flex-direction: column;
              gap: 20px;
            }

            .section-hero-info {
              min-width: 0;
              width: 100%;
            }

            .section-hero-title {
              font-size: 28px !important;
            }

            .section-test-count {
              width: 100%;
              min-width: 0;
            }

            .section-tests-header {
              align-items: stretch;
              flex-direction: column;
              gap: 15px;
            }

            .section-create-button {
              width: 100%;
            }

            .section-test-card {
              padding: 20px !important;
              border-radius: 16px !important;
            }

            .section-test-card-content {
              flex-direction: column;
              gap: 18px;
            }

            .section-test-info {
              min-width: 0;
              width: 100%;
            }

            .section-test-actions {
              width: 100%;
              display: grid;
              grid-template-columns: 1fr;
            }

            .section-test-action {
              width: 100%;
            }

            .section-empty {
              padding: 45px 20px !important;
            }
          }

          @media (max-width: 430px) {
            .section-page {
              padding: 25px 12px 40px !important;
            }

            .section-hero {
              padding: 20px !important;
            }

            .section-hero-title {
              font-size: 25px !important;
            }

            .section-hero-description {
              font-size: 14px !important;
            }

            .section-tests-title {
              font-size: 21px !important;
            }

            .section-test-card {
              padding: 17px !important;
            }

            .section-test-title {
              font-size: 18px !important;
            }

            .section-test-description {
              font-size: 14px !important;
            }

            .section-test-meta span {
              width: 100%;
              text-align: center;
            }

            .section-empty h3 {
              font-size: 18px !important;
            }

            .section-empty p {
              font-size: 14px !important;
            }

            .section-empty button {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="section-container">
        <button
          type="button"
          className="section-back-button"
          onClick={() => navigate("/sections")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 15px",
            marginBottom: "24px",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            background: "#ffffff",
            color: "#475569",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ← Bo‘limlarga qaytish
        </button>

        <div
          className="section-hero"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            padding: "32px",
            borderRadius: "22px",
            marginBottom: "35px",
            color: "#ffffff",
            boxShadow: "0 15px 35px rgba(79, 70, 229, 0.18)",
          }}
        >
          <div className="section-hero-content">
            <div className="section-hero-info">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "6px 11px",
                  marginBottom: "15px",
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.15)",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                📚 Bo‘lim
              </div>

              <h1
                className="section-hero-title"
                style={{
                  margin: "0 0 12px",
                  fontSize: "32px",
                  lineHeight: 1.2,
                }}
              >
                {section.name}
              </h1>

              <p
                className="section-hero-description"
                style={{
                  margin: "0 0 16px",
                  maxWidth: "700px",
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 1.6,
                }}
              >
                {section.description || "Bu bo‘lim uchun izoh kiritilmagan."}
              </p>

              <span
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "14px",
                }}
              >
                Ochilgan sana:{" "}
                {new Date(section.createdAt).toLocaleDateString("uz-UZ")}
              </span>
            </div>

            <div
              className="section-test-count"
              style={{
                padding: "16px 20px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.12)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                }}
              >
                {tests.length}
              </div>

              <div
                style={{
                  marginTop: "3px",
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.75)",
                }}
              >
                ta test
              </div>
            </div>
          </div>
        </div>

        <div className="section-tests-header">
          <div>
            <h2
              className="section-tests-title"
              style={{
                margin: "0 0 6px",
                color: "#0f172a",
                fontSize: "24px",
              }}
            >
              Testlar
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Ushbu bo‘limdagi faol testlar
            </p>
          </div>

          <button
            type="button"
            className="section-create-button"
            onClick={() => navigate(`/create-test/${section.id}`)}
            style={{
              padding: "12px 18px",
              border: "none",
              borderRadius: "11px",
              background: "#4f46e5",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(79, 70, 229, 0.18)",
            }}
          >
            + Test yaratish
          </button>
        </div>

        {tests.length === 0 ? (
          <div
            className="section-empty"
            style={{
              background: "#ffffff",
              padding: "55px 30px",
              borderRadius: "18px",
              textAlign: "center",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                margin: "0 auto 18px",
                borderRadius: "18px",
                background: "#eef2ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              📝
            </div>

            <h3
              style={{
                margin: "0 0 8px",
                color: "#0f172a",
              }}
            >
              Hozircha testlar mavjud emas
            </h3>

            <p
              style={{
                margin: "0 0 22px",
                color: "#64748b",
              }}
            >
              Ushbu bo‘lim uchun birinchi testni yarating.
            </p>

            <button
              type="button"
              onClick={() => navigate(`/create-test/${section.id}`)}
              style={{
                padding: "11px 18px",
                border: "none",
                borderRadius: "10px",
                background: "#4f46e5",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Birinchi testni yaratish
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "16px",
            }}
          >
            {tests.map((test) => (
              <div
                key={test.id}
                className="section-test-card"
                style={{
                  background: "#ffffff",
                  padding: "24px",
                  borderRadius: "18px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 8px 25px rgba(15, 23, 42, 0.04)",
                }}
              >
                <div className="section-test-card-content">
                  <div className="section-test-info">
                    <h3
                      className="section-test-title"
                      style={{
                        margin: "0 0 8px",
                        color: "#0f172a",
                        fontSize: "20px",
                      }}
                    >
                      {test.title}
                    </h3>

                    <p
                      className="section-test-description"
                      style={{
                        margin: "0 0 16px",
                        color: "#64748b",
                        lineHeight: 1.6,
                      }}
                    >
                      {test.description || "Izoh kiritilmagan"}
                    </p>

                    <div className="section-test-meta">
                      <span
                        style={{
                          padding: "7px 10px",
                          borderRadius: "8px",
                          background: "#f1f5f9",
                          color: "#475569",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        📝 {test.questions.length} ta savol
                      </span>

                      <span
                        style={{
                          padding: "7px 10px",
                          borderRadius: "8px",
                          background: "#f1f5f9",
                          color: "#475569",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        📅{" "}
                        {test.createdAt
                          ? new Date(test.createdAt).toLocaleDateString(
                              "uz-UZ"
                            )
                          : "Sana mavjud emas"}
                      </span>
                    </div>
                  </div>

                  <div className="section-test-actions">
                    <button
                      type="button"
                      className="section-test-action"
                      onClick={() => navigate(`/test/${test.id}`)}
                      style={{
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "9px",
                        background: "#16a34a",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Testni boshlash
                    </button>

                    <button
                      type="button"
                      className="section-test-action"
                      onClick={() =>
                        navigate(
                          `/create-test/${test.sectionId}?edit=${test.id}`
                        )
                      }
                      style={{
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "9px",
                        background: "#f59e0b",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Tahrirlash
                    </button>

                    <button
                      type="button"
                      className="section-test-action"
                      onClick={() => handleArchiveTest(test.id)}
                      style={{
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "9px",
                        background: "#64748b",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Arxivlash
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionPage;