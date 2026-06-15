export function FormulasPage({ formulas }) {
  return (
    <div className="page-content">
      <section className="panel">
        <h2>Công thức phối trộn</h2>
        <div className="formulas-grid">
          {formulas.map((formula) => (
            <article className="formula-card" key={formula.id}>
              <div className="formula-header">
                <strong>{formula.id}</strong>
                <span>{formula.name}</span>
              </div>
              <p>Batch chuẩn: {formula.batchKg} kg</p>
              <div className="formula-section">
                <h3>Nguyên liệu hóa</h3>
                <ul>
                  {formula.chemical.map((item) => (
                    <li key={item.name}>{item.name}: {item.kg} kg</li>
                  ))}
                </ul>
              </div>
              <div className="formula-section">
                <h3>Nguyên liệu rắn</h3>
                <ul>
                  {formula.solid.map((item) => (
                    <li key={item.name}>{item.name}: {item.kg} kg</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
