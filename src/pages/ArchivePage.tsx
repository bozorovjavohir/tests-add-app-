import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Test } from "../types/test";

function ArchivePage() {
  const navigate = useNavigate();

  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const savedTests = localStorage.getItem("tests");

    if (savedTests) {
      const allTests: Test[] = JSON.parse(savedTests);
      setTests(allTests.filter((test) => test.archived));
    }
  }, []);

  const handleActivateTest = (testId: number) => {
    const savedTests = localStorage.getItem("tests");

    if (!savedTests) return;

    const allTests: Test[] = JSON.parse(savedTests);

    const updatedTests = allTests.map((test) =>
      test.id === testId ? { ...test, archived: false } : test
    );

    localStorage.setItem("tests", JSON.stringify(updatedTests));

    setTests(updatedTests.filter((test) => test.archived));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "45px 20px",
      }}
    >
      <style>
        {`
          .archive-header {
            margin-bottom: 40px;
          }

          .archive-header h1 {
            font-size: 34px;
          }

          .archive-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }

          .archive-tests-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }

          .archive-card {
            padding: 24px;
          }

          .archive-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .archive-action-button {
            flex: 1;
            min-width: 120px;
          }

          @media (max-width: 768px) {
            .archive-header {
              margin-bottom: 30px;
            }

            .archive-header h1 {
              font-size: 30px !important;
            }

            .archive-top {
              align-items: stretch;
            }

            .archive-back-button {
              width: 100%;
            }

            .archive-tests-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 480px) {
            .archive-page {
              padding: 30px 15px !important;
            }

            .archive-header-icon {
              width: 56px !important;
              height: 56px !important;
              font-size: 26px !important;
            }

            .archive-header h1 {
              font-size: 27px !important;
            }

            .archive-header p {
              font-size: 14px !important;
            }

            .archive-top-title {
              font-size: 18px !important;
            }

            .archive-card {
              padding: 20px !important;
              border-radius: 17px !important;
            }

            .archive-card-description {
              min-height: auto !important;
            }

            .archive-actions {
              flex-direction: column;
            }

            .archive-action-button {
              width: 100%;
              min-width: 0 !important;
            }

            .archive-empty {
              padding: 45px 20px !important;
            }

            .archive-empty h3 {
              font-size: 18px !important;
            }
          }
        `}
      </style>

      <div
        className="archive-page"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          className="archive-header"
          style={{
            textAlign: "center",
          }}
        >
          <div
            className="archive-header-icon"
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 18px",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#eef2ff",
              fontSize: "30px",
            }}
          >
            🗄️
          </div>

          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "34px",
              fontWeight: "800",
              color: "#0f172a",
              letterSpacing: "-0.8px",
            }}
          >
            Arxiv
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Arxivlangan testlarni boshqarish
          </p>
        </div>

        <div className="archive-top">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h2
              className="archive-top-title"
              style={{
                margin: 0,
                fontSize: "20px",
                color: "#0f172a",
              }}
            >
              Arxivdagi testlar
            </h2>

            <span
              style={{
                padding: "5px 10px",
                borderRadius: "20px",
                background: "#e2e8f0",
                color: "#475569",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              {tests.length}
            </span>
          </div>

          <button
            className="archive-back-button"
            onClick={() => navigate("/tests")}
            style={{
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              color: "#475569",
              padding: "10px 15px",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ← Testlarga qaytish
          </button>
        </div>

        {tests.length === 0 ? (
          <div
            className="archive-empty"
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "65px 30px",
              textAlign: "center",
              boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                margin: "0 auto 18px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f1f5f9",
                fontSize: "32px",
              }}
            >
              📦
            </div>

            <h3
              style={{
                margin: "0 0 8px",
                color: "#0f172a",
                fontSize: "20px",
              }}
            >
              Arxivda testlar mavjud emas
            </h3>

            <p
              style={{
                margin: "0 0 22px",
                color: "#64748b",
              }}
            >
              Arxivlangan testlar shu yerda ko‘rinadi.
            </p>

            <button
              onClick={() => navigate("/tests")}
              style={{
                border: "none",
                borderRadius: "10px",
                padding: "12px 20px",
                background: "#4f46e5",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Testlarga o‘tish
            </button>
          </div>
        ) : (
          <div className="archive-tests-grid">
            {tests.map((test, index) => (
              <div
                key={test.id}
                className="archive-card"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "15px",
                    marginBottom: "18px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      flexShrink: 0,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f1f5f9",
                      color: "#64748b",
                      fontWeight: "800",
                    }}
                  >
                    {index + 1}
                  </div>

                  <span
                    style={{
                      padding: "6px 10px",
                      borderRadius: "20px",
                      background: "#fff7ed",
                      color: "#c2410c",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    Arxivlangan
                  </span>
                </div>

                <h3
                  style={{
                    margin: "0 0 9px",
                    color: "#0f172a",
                    fontSize: "19px",
                    fontWeight: "750",
                  }}
                >
                  {test.title}
                </h3>

                <p
                  className="archive-card-description"
                  style={{
                    margin: "0 0 18px",
                    color: "#64748b",
                    lineHeight: 1.6,
                    fontSize: "14px",
                    minHeight: "45px",
                  }}
                >
                  {test.description || "Izoh kiritilmagan"}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      padding: "7px 10px",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      color: "#475569",
                      fontSize: "13px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    📝 {test.questions.length} ta savol
                  </span>

                  <span
                    style={{
                      padding: "7px 10px",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      color: "#475569",
                      fontSize: "13px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    📅{" "}
                    {test.createdAt
                      ? new Date(test.createdAt).toLocaleDateString("uz-UZ")
                      : "Sana mavjud emas"}
                  </span>
                </div>

                <div className="archive-actions">
                  <button
                    className="archive-action-button"
                    onClick={() =>
                      navigate(
                        `/create-test/${test.sectionId}?edit=${test.id}`
                      )
                    }
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      padding: "11px 14px",
                      background: "#ffffff",
                      color: "#475569",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Tahrirlash
                  </button>

                  <button
                    className="archive-action-button"
                    onClick={() => handleActivateTest(test.id)}
                    style={{
                      border: "none",
                      borderRadius: "10px",
                      padding: "11px 14px",
                      background: "#16a34a",
                      color: "#ffffff",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    ✓ Faollashtirish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchivePage;
