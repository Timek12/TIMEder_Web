import React, { useState } from 'react';
import { useTable } from 'react-table';
import './UserList.css';

function UserList() {
    const data = React.useMemo(
        () => [
            {
                index: '',
                firstName: '',
                lastName: '',
                operation: '',
            },
            {
                index: '245932',
                firstName: 'Adam',
                lastName: 'Kowalski',
                operation: '',
            },
            {
                index: '123456',
                firstName: 'Marcin',
                lastName: 'Dubiel',
                operation: '',
            },
            {
                index: '225212',
                firstName: 'Agnieszka',
                lastName: 'Grzelak',
                operation: '',
            },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Index',
                accessor: 'index',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter index' />
                    ) : (
                        original.index
                    )
                ),
            },
            {
                Header: 'First name',
                accessor: 'firstName',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter first name' />
                    ) : (
                        original.firstName
                    )
                ),
            },
            {
                Header: 'Last name',
                accessor: 'lastName',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter last name' />
                    ) : (
                        original.lastName
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
            <h1 style={{marginTop: '10px' }}><i className="bi bi-person"></i> User List</h1>
            <table {...getTableProps()} style={{ width: '50%', marginBottom: '20px', }}>
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

export default UserList;