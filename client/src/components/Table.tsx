type Data = Record<string, any>;

export interface TableColumn<DataType extends Data> {
  key?: string;
  field?: keyof DataType;
  title: React.ReactNode;
  render?: (value: any, row: DataType) => React.ReactNode;
}

export interface TableProps<DataType extends Data> {
  columns: TableColumn<DataType>[];
  data: DataType[];
  keyField?: keyof DataType;
  getKey?: (row: DataType) => string;
}

export const Table = <DataType extends Data>({ columns, data, keyField, getKey }: TableProps<DataType>) => {
  return (
    <table className="list">
      <thead className="list-head">
        <tr className="list-row">
          {columns.map(({ key, field, title }) => (
            <td className="list-item" key={key ?? (field as string)}>
              {title}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className="list-body">
        {data.map((row, i) => (
          <tr key={getKey ? getKey(row) : keyField ? row[keyField] : i} className="list-row">
            {columns.map(({ field, key, render }) => (
              <td className="list-item" key={key ?? (field as string)}>
                {render ? render(field ? row[field] : undefined, row) : field ? row[field] : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
