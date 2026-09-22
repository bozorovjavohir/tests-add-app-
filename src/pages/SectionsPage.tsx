import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Section } from "../types/test";

function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedSections = localStorage.getItem("sections");

    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
  }, []);

  const handleAddSection = () => {
    if (!name.trim()) {
      alert("Bo‘lim nomini kiriting");
      return;
    }

    const newSection: Section = {
      id: Date.now(),
      name,
      description,
      createdAt: new Date().toISOString(),
    };

    const updatedSections = [...sections, newSection];

    setSections(updatedSections);
    localStorage.setItem("sections", JSON.stringify(updatedSections));

    setName("");
    setDescription("");
  };

  return (
    <>
      <div className="sections-page">
        <div className="sections-container">
          <div className="sections-header">
            <div className="sections-header-icon">📚</div>

            <h1>Bo‘limlar</h1>

            <p>Testlaringizni fan va mavzular bo‘yicha tartiblang</p>
          </div>

          <div className="section-create-card">
            <div className="section-create-header">
              <div className="section-create-icon">+</div>

              <div>
                <h2>Yangi bo‘lim</h2>

                <p>Yangi fan yoki mavzu uchun bo‘lim yarating</p>
              </div>
            </div>

            <div className="section-form">
              <div>
                <label>Bo‘lim nomi</label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Masalan: Matematika"
                />
              </div>

              <div>
                <label>Bo‘lim izohi</label>

                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Masalan: 5-sinf matematika testlari"
                />
              </div>

              <button type="button" onClick={handleAddSection}>
                + Bo‘lim qo‘shish
              </button>
            </div>
          </div>

          <div className="sections-list-header">
            <div>
              <h2>Mavjud bo‘limlar</h2>

              <p>Yaratilgan barcha bo‘limlar</p>
            </div>

            <div className="sections-count">{sections.length}</div>
          </div>

          {sections.length === 0 ? (
            <div className="sections-empty">
              <div className="sections-empty-icon">📂</div>

              <h3>Hozircha bo‘limlar mavjud emas</h3>

              <p>
                Yuqoridagi forma orqali birinchi bo‘limni yarating
              </p>
            </div>
          ) : (
            <div className="sections-grid">
              {sections.map((section, index) => (
                <div className="section-card" key={section.id}>
                  <div className="section-card-top">
                    <div className="section-number">{index + 1}</div>

                    <span>BO‘LIM</span>
                  </div>

                  <h2>{section.name}</h2>

                  <p className="section-description">
                    {section.description || "Izoh kiritilmagan"}
                  </p>

                  <div className="section-divider" />

                  <div className="section-date">
                    <span>📅</span>

                    <span>
                      {new Date(section.createdAt).toLocaleDateString(
                        "uz-UZ"
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/section/${section.id}`)}
                  >
                    Bo‘limga kirish →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .sections-page {
          width: 100%;
          min-height: 100vh;
          background: #f8fafc;
          padding: 45px 20px 70px;
        }

        .sections-container {
          width: 100%;
          max-width: 1050px;
          margin: 0 auto;
        }

        .sections-header {
          margin-bottom: 35px;
          text-align: center;
        }

        .sections-header-icon {
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

        .sections-header h1 {
          margin: 0 0 9px;
          color: #0f172a;
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.7px;
        }

        .sections-header p {
          margin: 0;
          color: #64748b;
          font-size: 15px;
        }

        .section-create-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 20px;
          margin-bottom: 38px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        .section-create-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 25px;
        }

        .section-create-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 11px;
          background: #eef2ff;
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
        }

        .section-create-header h2 {
          margin: 0 0 4px;
          color: #0f172a;
          font-size: 20px;
          font-weight: 750;
        }

        .section-create-header p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .section-form {
          display: grid;
          gap: 18px;
        }

        .section-form label {
          display: block;
          margin-bottom: 8px;
          color: #334155;
          font-size: 14px;
          font-weight: 700;
        }

        .section-form input,
        .section-form textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
          color: #0f172a;
          font-size: 15px;
          outline: none;
        }

        .section-form input {
          padding: 13px 15px;
        }

        .section-form textarea {
          min-height: 100px;
          padding: 13px 15px;
          resize: vertical;
          font-family: inherit;
        }

        .section-form button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #4f46e5;
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 15px rgba(79, 70, 229, 0.16);
        }

        .sections-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 20px;
        }

        .sections-list-header h2 {
          margin: 0 0 5px;
          color: #0f172a;
          font-size: 22px;
          font-weight: 800;
        }

        .sections-list-header p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .sections-count {
          min-width: 45px;
          padding: 8px 13px;
          border-radius: 20px;
          background: #eef2ff;
          color: #4f46e5;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
        }

        .sections-empty {
          background: #ffffff;
          padding: 55px 25px;
          border-radius: 18px;
          text-align: center;
          border: 1px dashed #cbd5e1;
        }

        .sections-empty-icon {
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

        .sections-empty h3 {
          margin: 0 0 7px;
          color: #334155;
          font-size: 17px;
        }

        .sections-empty p {
          margin: 0;
          color: #94a3b8;
          font-size: 14px;
        }

        .sections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 18px;
        }

        .section-card {
          min-width: 0;
          background: #ffffff;
          padding: 24px;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 7px 22px rgba(15, 23, 42, 0.04);
        }

        .section-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .section-number {
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

        .section-card-top span {
          padding: 5px 9px;
          border-radius: 7px;
          background: #f1f5f9;
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.4px;
        }

        .section-card h2 {
          margin: 0 0 9px;
          color: #0f172a;
          font-size: 20px;
          font-weight: 750;
          overflow-wrap: anywhere;
        }

        .section-description {
          margin: 0 0 18px;
          min-height: 45px;
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .section-divider {
          height: 1px;
          background: #e2e8f0;
          margin-bottom: 15px;
        }

        .section-date {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 18px;
          color: #94a3b8;
          font-size: 13px;
        }

        .section-card button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #4f46e5;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .sections-page {
            padding: 35px 20px 55px;
          }

          .sections-header {
            margin-bottom: 30px;
          }

          .sections-header h1 {
            font-size: 30px;
          }

          .section-create-card {
            padding: 25px;
            margin-bottom: 30px;
          }

          .sections-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .sections-page {
            padding: 28px 15px 45px;
          }

          .sections-header-icon {
            width: 54px;
            height: 54px;
            margin-bottom: 12px;
            font-size: 25px;
          }

          .sections-header h1 {
            font-size: 27px;
          }

          .sections-header p {
            font-size: 14px;
            line-height: 1.5;
          }

          .section-create-card {
            padding: 20px;
            border-radius: 17px;
          }

          .section-create-header {
            align-items: flex-start;
            gap: 11px;
            margin-bottom: 20px;
          }

          .section-create-icon {
            width: 38px;
            height: 38px;
            font-size: 18px;
          }

          .section-create-header h2 {
            font-size: 18px;
          }

          .section-create-header p {
            font-size: 13px;
            line-height: 1.5;
          }

          .section-form {
            gap: 15px;
          }

          .section-form input,
          .section-form textarea {
            font-size: 14px;
          }

          .sections-list-header {
            align-items: flex-start;
          }

          .sections-list-header h2 {
            font-size: 20px;
          }

          .sections-list-header p {
            font-size: 13px;
          }

          .sections-count {
            min-width: 42px;
          }

          .section-card {
            padding: 20px;
            border-radius: 16px;
          }

          .section-card-top {
            margin-bottom: 17px;
          }

          .section-card h2 {
            font-size: 18px;
          }

          .section-description {
            min-height: auto;
            font-size: 14px;
          }

          .sections-empty {
            padding: 45px 20px;
          }

          .sections-empty h3 {
            font-size: 17px;
          }

          .sections-empty p {
            font-size: 13px;
            line-height: 1.5;
          }
        }

        @media (max-width: 360px) {
          .sections-page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .section-create-card {
            padding: 17px;
          }

          .section-card {
            padding: 17px;
          }

          .sections-list-header {
            gap: 10px;
          }

          .sections-list-header h2 {
            font-size: 18px;
          }

          .sections-count {
            min-width: 38px;
            padding: 7px 10px;
          }
        }
      `}</style>
    </>
  );
}

export default SectionsPage;