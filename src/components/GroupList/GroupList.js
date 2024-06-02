import React from 'react';
import { useTable } from 'react-table';
import './GroupList.css';

function GroupList() {
    const data = React.useMemo(
        () => [
            {
                name: '',
                operation: '',
            },
            {
                name: 'Wejkusie 2.0',
                operation: '',
            },
            {
                name: 'FC Barcelona',
                operation: '',
            },
            {
                name: 'Szachy',
                operation: '',
            },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter group name' />
                    ) : (
                        original.name
                    )
                ),
            },
            {
                Header: 'Operation',
                accessor: 'operation',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <button className='add-btn'>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    ) : (
                        <button className='remove-btn'>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    )
                ),
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className="card-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '30px' }}>
            <h1 style={{marginTop: '10px' }}><i className="bi bi-people-fill"></i> Group List</h1>
            <table id='group-table' {...getTableProps()} style={{ width: '200px !important', marginBottom: '20px'}}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
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

export default GroupList;