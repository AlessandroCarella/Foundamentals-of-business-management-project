import React from 'react';
import { useTable } from 'react-table';

const ResultsTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Model', accessor: 'model' },
      { Header: 'Mean Squared Error', accessor: 'mse' },
      { Header: 'Mean Absolute Error', accessor: 'mae' },
      { Header: 'R-squared', accessor: 'rSquared' },
      { Header: 'Explained Variance Score', accessor: 'explainedVariance' },
      { Header: 'Accuracy', accessor: 'accuracy' },
      { Header: 'Precision', accessor: 'precision' },
      { Header: 'Recall', accessor: 'recall' },
      { Header: 'F1 Score', accessor: 'f1Score' },
    ],
    []
  );

  const tableData = React.useMemo(
    () => [
      {
        model: 'Decision Tree',
        mse: data[2][0].toFixed(2),
        mae: data[2][0].toFixed(2),
        rSquared: data[2][0].toFixed(2),
        explainedVariance: data[3][0].toFixed(2),
        accuracy: data[4][0].toFixed(2),
        precision: data[5].toFixed(2),
        recall: data[6].toFixed(2),
        f1Score: data[7].toFixed(2),
      },
      {
        model: 'RidgeModel',
        mse: data[2][1].toFixed(2),
        mae: data[3][1].toFixed(2),
        rSquared: data[2][1].toFixed(2),
        explainedVariance: data[3][1].toFixed(2),
        accuracy: 'N/A', // Adjust based on your actual data
        precision: 'N/A',
        recall: 'N/A',
        f1Score: 'N/A',
      },

      {
        model: 'Elastic Net',
        mse: data[2][1].toFixed(2),
        mae: data[3][1].toFixed(2),
        rSquared: data[2][1].toFixed(2),
        explainedVariance: data[3][1].toFixed(2),
        accuracy: 'N/A', // Adjust based on your actual data
        precision: 'N/A',
        recall: 'N/A',
        f1Score: 'N/A',
      },

      {
        model: 'Lasso',
        mse: data[2][1].toFixed(2),
        mae: data[3][1].toFixed(2),
        rSquared: data[2][1].toFixed(2),
        explainedVariance: data[3][1].toFixed(2),
        accuracy: 'N/A', // Adjust based on your actual data
        precision: 'N/A',
        recall: 'N/A',
        f1Score: 'N/A',
      },
      {
        model: 'LinearRegression',
        mse: data[2][1].toFixed(2),
        mae: data[3][1].toFixed(2),
        rSquared: data[2][1].toFixed(2),
        explainedVariance: data[3][1].toFixed(2),
        accuracy: 'N/A', // Adjust based on your actual data
        precision: 'N/A',
        recall: 'N/A',
        f1Score: 'N/A',
      },
      // Add more rows if needed for additional models
    ],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: tableData,
  });

  return (
    <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '8px' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ border: '1px solid black' }}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} style={{ padding: '8px' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResultsTable;
