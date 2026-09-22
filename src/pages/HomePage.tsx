import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 70px)",
        background: "#f8fafc",
        padding: "70px 20px",
      }}
    >
      <style>
        {`
          .home-hero-title {
            font-size: 48px;
          }

          .home-hero {
            padding: 70px 40px;
          }

          .home-buttons {
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }

          .home-button {
            padding: 13px 22px;
          }

          .home-ai-content {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
          }

          .home-ai-text {
            flex: 1;
            min-width: 250px;
          }

          .home-feature-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            margin-top: 25px;
          }

          .home-feature-card {
            padding: 24px;
          }

          @media (max-width: 768px) {
            .home-hero {
              padding: 50px 25px;
            }

            .home-hero-title {
              font-size: 38px;
            }

            .home-feature-grid {
              grid-template-columns: 1fr;
            }

            .home-ai-content {
              align-items: flex-start;
            }
          }

          @media (max-width: 480px) {
            .home-hero {
              padding: 40px 18px;
              border-radius: 20px;
            }

            .home-hero-title {
              font-size: 31px;
              letter-spacing: -1px;
            }

            .home-hero-description {
              font-size: 15px !important;
            }

            .home-buttons {
              flex-direction: column;
            }

            .home-button {
              width: 100%;
              text-align: center;
            }

            .home-ai-section {
              padding: 22px !important;
              border-radius: 18px !important;
            }

            .home-ai-text {
              min-width: 0;
            }

            .home-ai-title {
              font-size: 18px !important;
            }

            .home-ai-badge {
              width: 100%;
              justify-content: center;
            }

            .home-feature-grid {
              gap: 14px;
            }

            .home-feature-card {
              padding: 20px;
            }
          }
        `}
      </style>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <section
          className="home-hero"
          style={{
            background:
              "linear-gradient(135deg, #eef2ff 0%, #ffffff 55%, #f0fdf4 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: "28px",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(15, 23, 42, 0.06)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "30px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              color: "#4f46e5",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "22px",
            }}
          >
            ✨ Zamonaviy test yaratish platformasi
          </div>

          <h1
            className="home-hero-title"
            style={{
              margin: "0 0 18px",
              lineHeight: 1.1,
              fontWeight: "800",
              letterSpacing: "-1.5px",
              color: "#0f172a",
            }}
          >
            Test tuzish
            <span style={{ color: "#4f46e5" }}> tizimi</span>
          </h1>

          <p
            className="home-hero-description"
            style={{
              maxWidth: "650px",
              margin: "0 auto 30px",
              color: "#64748b",
              fontSize: "17px",
              lineHeight: 1.7,
            }}
          >
            Testlaringizni yarating, boshqaring va bilimlaringizni zamonaviy
            usulda tekshiring.
          </p>

          <div className="home-buttons">
            <Link
              className="home-button"
              to="/tests"
              style={{
                textDecoration: "none",
                borderRadius: "11px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                color: "#475569",
                fontWeight: "700",
              }}
            >
              Testlarni ko‘rish
            </Link>

            <Link
              className="home-button"
              to="/create-test"
              style={{
                textDecoration: "none",
                borderRadius: "11px",
                background: "#4f46e5",
                color: "#ffffff",
                fontWeight: "700",
                boxShadow: "0 8px 20px rgba(79, 70, 229, 0.25)",
              }}
            >
              + Test yaratish
            </Link>
          </div>
        </section>

        <section
          className="home-ai-section"
          style={{
            marginTop: "25px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "22px",
            padding: "30px",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div className="home-ai-content">
            <div
              style={{
                width: "58px",
                height: "58px",
                flexShrink: 0,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#eef2ff",
                fontSize: "28px",
              }}
            >
              🤝
            </div>

            <div className="home-ai-text">
              <div
                style={{
                  display: "inline-block",
                  marginBottom: "6px",
                  color: "#4f46e5",
                  fontSize: "13px",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Inson + AI hamkorligi
              </div>

              <h2
                className="home-ai-title"
                style={{
                  margin: "0 0 7px",
                  color: "#0f172a",
                  fontSize: "21px",
                }}
              >
                Sun’iy intellekt yordamchi, inson esa nazoratchi
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: 1.6,
                  fontSize: "14px",
                }}
              >
                Test yaratish jarayonida AI imkoniyatlaridan foydalanish mumkin.
                Savollarni tekshirish, o‘zgartirish va yakuniy qarorni esa inson
                belgilaydi.
              </p>
            </div>

            <div
              className="home-ai-badge"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "12px",
                background: "#f0fdf4",
                color: "#15803d",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              🧠 AI + 👤 Inson
            </div>
          </div>
        </section>

        <section className="home-feature-grid">
          <div
            className="home-feature-card"
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
            }}
          >
            <div style={{ fontSize: "26px", marginBottom: "14px" }}>📝</div>

            <h3
              style={{
                margin: "0 0 8px",
                color: "#0f172a",
              }}
            >
              Test yarating
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: 1.6,
                fontSize: "14px",
              }}
            >
              Savollar va javob variantlarini qo‘shib, o‘zingizga kerakli
              testlarni yarating.
            </p>
          </div>

          <div
            className="home-feature-card"
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
            }}
          >
            <div style={{ fontSize: "26px", marginBottom: "14px" }}>📚</div>

            <h3
              style={{
                margin: "0 0 8px",
                color: "#0f172a",
              }}
            >
              Bo‘limlarni boshqaring
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: 1.6,
                fontSize: "14px",
              }}
            >
              Matematika, Ingliz tili, Tarix va boshqa fanlar uchun alohida
              bo‘limlar yarating.
            </p>
          </div>

          <div
            className="home-feature-card"
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
            }}
          >
            <div style={{ fontSize: "26px", marginBottom: "14px" }}>📊</div>

            <h3
              style={{
                margin: "0 0 8px",
                color: "#0f172a",
              }}
            >
              Natijani ko‘ring
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: 1.6,
                fontSize: "14px",
              }}
            >
              Testni ishlab bo‘lgach, to‘g‘ri javoblar va natijangizni ko‘ring.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
