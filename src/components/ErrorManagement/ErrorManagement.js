import React, {useState} from 'react';
import { useTable } from 'react-table';
import './ErrorManagement.css';

function ErrorManagement() {
    const [sortDirection, setSortDirection] = useState({});

    const toggleSort = (columnId) => {
        setSortDirection(prev => ({
            ...prev,
            [columnId]: prev[columnId] === 'asc' ? 'desc' : prev[columnId] === 'desc' ? 'none' : 'asc'
        }));
    };

    const data = React.useMemo(
        () => [
            {
                index: 245734,
                date: '21.04.2024',
                description: 'Homepage not working',
            },
            {
                index: 225714,
                date: '12.03.2024',
                description: 'Add Arabic language',
            },
            {
                index: 215332,
                date: '13.04.2024',
                description: 'Add blue mode',
            },
            {
                index: 245239,
                date: '11.05.2024',
                description: 'Create new group button not working',
            },
        ],
        []
    );


    const columns = React.useMemo(
        () => [
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Index
                        {sortDirection[column.id] === 'asc' ? <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ? <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'index',
            },
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Date
                        {sortDirection[column.id] === 'asc' ? <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ? <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'date',
            },
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Error Message
                        {sortDirection[column.id] === 'asc' ? <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ? <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'description',
            },
        ],
        [sortDirection]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{marginTop: '30px'}}><i className='bi bi-bug'></i> Error Reports</h1>
            <table {...getTableProps()} style={{ width: '50%' }}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, i) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ErrorManagement;