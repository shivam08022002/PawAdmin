import './DataTable.css'

export default function DataTable({ title, columns, rows, actionLabel, onAction }) {
  return (
    <div className="table card">
      <div className="table-head">
        <h3>{title}</h3>
        {actionLabel && (
          <button className="btn ghost" onClick={onAction}>{actionLabel}</button>
        )}
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {columns.map((c) => (
                  <td key={c.key}>
                    {c.render ? c.render(r[c.key], r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

