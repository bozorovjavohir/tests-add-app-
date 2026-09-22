import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Test } from "../types/test";

function TestsPage() {
  const navigate = useNavigate();

  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const savedTests = localStorage.getItem("tests");

    if (savedTests) {
      const allTests: Test[] = JSON.parse(savedTests);

      const activeTests = allTests.filter((test) => !test.archived);

      setTests(activeTests);
    }
  }, []);

  return (
    <>
      <div className="tests-page">
        <div className="tests-container">
          <div className="tests-header">
            <div className="tests-header-icon">📝</div>

            <h1>Testlar</h1>

            <p>
              Barcha faol testlaringizni shu yerda boshqaring
            </p>
          </div>

          <div className="tests-list-header">
            <div>
              <h2>Faol testlar</h2>

              <p>Ishlash uchun mavjud testlar</p>
            </div>

            <div className="tests-count">{tests.length}</div>
          </div>

          {tests.length === 0 ? (
            <div className="tests-empty">
              <div className="tests-empty-icon">📭</div>

              <h3>Hozircha testlar mavjud emas</h3>

              <p>Yangi test yaratishingiz mumkin.</p>

              <button
                type="button"
                onClick={() => navigate("/create-test")}
              >
                + Test yaratish
              </button>
            </div>
          ) : (
            <div className="tests-list">
              {tests.map((test, index) => (
                <div className="test-card" key={test.id}>
                  <div className="test-card-content">
                    <div className="test-info">
                      <div className="test-number">
                        {index + 1}
                      </div>

                      <div className="test-details">
                        <h3>{test.title}</h3>

                        <p className="test-description">
                          {test.description || "Izoh kiritilmagan"}
                        </p>

                        <div className="test-meta">
                          <span>
                            📝 {test.questions.length} ta savol
                          </span>

                          <span>
                            📅{" "}
                            {test.createdAt
                              ? new Date(
                                  test.createdAt
                                ).toLocaleDateString("uz-UZ")
                              : "Sana mavjud emas"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/test/${test.id}`)}
                      className="start-test-button"
                    >
                      Testni boshlash →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .tests-page {
          width: 100%;
          min-height: 100vh;
          background: #f8fafc;
          padding: 45px 20px 70px;
        }

        .tests-container {
          width: 100%;
          max-width: 1050px;
          margin: 0 auto;
        }

        .tests-header {
          margin-bottom: 32px;
          text-align: center;
        }

        .tests-header-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          margin-bottom: 15px;
          border-radius: 17px;
          background: #eef2ff;
          color: #4f46e5;
          font-size: 27px;
        }

        .tests-header h1 {
          margin: 0 0 9px;
          color: #0f172a;
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.7px;
        }

        .tests-header p {
          margin: 0;
          color: #64748b;
          font-size: 15px;
        }

        .tests-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 20px;
        }

        .tests-list-header h2 {
          margin: 0 0 5px;
          color: #0f172a;
          font-size: 22px;
          font-weight: 800;
        }

        .tests-list-header p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .tests-count {
          min-width: 45px;
          padding: 8px 13px;
          border-radius: 20px;
          background: #eef2ff;
          color: #4f46e5;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
        }

        .tests-empty {
          background: #ffffff;
          padding: 55px 25px;
          border-radius: 18px;
          text-align: center;
          border: 1px dashed #cbd5e1;
        }

        .tests-empty-icon {
          width: 62px;
          height: 62px;
          margin: 0 auto 17px;
          border-radius: 17px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .tests-empty h3 {
          margin: 0 0 7px;
          color: #334155;
          font-size: 18px;
        }

        .tests-empty p {
          margin: 0 0 22px;
          color: #94a3b8;
          font-size: 14px;
        }

        .tests-empty button {
          padding: 11px 18px;
          border: none;
          border-radius: 10px;
          background: #4f46e5;
          color: #ffffff;
          font-weight: 700;
          cursor: pointer;
        }

        .tests-list {
          display: grid;
          gap: 16px;
        }

        .test-card {
          min-width: 0;
          background: #ffffff;
          padding: 24px;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 7px 22px rgba(15, 23, 42, 0.04);
        }

        .test-card-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
        }

        .test-info {
          display: flex;
          gap: 15px;
          flex: 1;
          min-width: 250px;
        }

        .test-number {
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          border-radius: 12px;
          background: #eef2ff;
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 800;
        }

        .test-details {
          flex: 1;
          min-width: 0;
        }

        .test-details h3 {
          margin: 0 0 8px;
          color: #0f172a;
          font-size: 20px;
          font-weight: 750;
          overflow-wrap: anywhere;
        }

        .test-description {
          margin: 0 0 15px;
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .test-meta {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
        }

        .test-meta span {
          padding: 7px 10px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
          font-size: 13px;
          font-weight: 600;
        }

        .start-test-button {
          flex-shrink: 0;
          padding: 11px 17px;
          border: none;
          border-radius: 10px;
          background: #16a34a;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .tests-page {
            padding: 35px 20px 55px;
          }

          .tests-header {
            margin-bottom: 28px;
          }

          .tests-header h1 {
            font-size: 30px;
          }

          .test-card {
            padding: 21px;
          }

          .test-card-content {
            flex-direction: column;
            gap: 18px;
          }

          .test-info {
            width: 100%;
            min-width: 0;
          }

          .start-test-button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .tests-page {
            padding: 28px 15px 45px;
          }

          .tests-header-icon {
            width: 54px;
            height: 54px;
            margin-bottom: 12px;
            font-size: 25px;
          }

          .tests-header h1 {
            font-size: 27px;
          }

          .tests-header p {
            font-size: 14px;
            line-height: 1.5;
          }

          .tests-list-header {
            align-items: flex-start;
          }

          .tests-list-header h2 {
            font-size: 20px;
          }

          .tests-list-header p {
            font-size: 13px;
          }

          .tests-count {
            min-width: 42px;
          }

          .test-card {
            padding: 18px;
            border-radius: 16px;
          }

          .test-info {
            gap: 11px;
          }

          .test-number {
            width: 39px;
            height: 39px;
            border-radius: 10px;
            font-size: 14px;
          }

          .test-details h3 {
            font-size: 18px;
          }

          .test-description {
            font-size: 13px;
            line-height: 1.55;
          }

          .test-meta {
            flex-direction: column;
            gap: 7px;
          }

          .test-meta span {
            width: 100%;
            text-align: center;
            font-size: 12px;
          }

          .start-test-button {
            padding: 13px;
            font-size: 14px;
          }

          .tests-empty {
            padding: 45px 20px;
          }

          .tests-empty h3 {
            font-size: 17px;
          }

          .tests-empty p {
            font-size: 13px;
          }

          .tests-empty button {
            width: 100%;
          }
        }

        @media (max-width: 360px) {
          .tests-page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .test-card {
            padding: 16px;
          }

          .test-info {
            gap: 9px;
          }

          .test-number {
            width: 36px;
            height: 36px;
            font-size: 13px;
          }

          .test-details h3 {
            font-size: 17px;
          }

          .tests-list-header h2 {
            font-size: 18px;
          }

          .tests-count {
            min-width: 38px;
            padding: 7px 10px;
          }
        }
      `}</style>
    </>
  );
}

export default TestsPage;
