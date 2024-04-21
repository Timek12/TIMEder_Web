import React, { useState } from 'react';
import { useTable } from 'react-table';
import './GroupManagement.css';
import UserList from "../UserList/UserList";

function GroupManagement() {
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
                name: '',
                location: '',
                date: '',
                startDate: '',
                description: '',
                users: 'Add Users',
                groups: 'Add Groups',
                operation: '',
            },
            {
                name: 'Wejkusie 2.0',
                purpose: 'Nice time spending',
                maxMembers: '100',
                code: '567123',
                status: 'Public',
                description: 'Group for people who like to spend time together',
                users: 'Add Users',
                groups: 'Add Groups',
                operation: '...'
            },
            // More data...
        ],
        []
    );

    const [isModalUserOpen, setIsUserModalOpen] = useState(false);
    const [isModalGroupOpen, setIsGroupModalOpen] = useState(false);

    const columns = React.useMemo(
        () => [
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Name
                        {sortDirection[column.id] === 'asc' ? <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ? <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'name',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter event name' />
                    ) : original.name
                ),
            },
            {
                Header: 'Purpose',
                accessor: 'purpose',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter group purpose' />
                    ) : (
                        original.purpose
                    )
                ),
            },
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Max members
                        {sortDirection[column.id] === 'asc' ? <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ? <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'maxMembers',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="number" placeholder='Enter max members' />
                    ) : original.maxMembers
                ),
            },
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Invitation Code
                        {sortDirection[column.id] === 'asc' ? <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ? <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'code',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter group status' />
                    ) : original.code
                ),
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter description' />
                    ) : (
                        original.description
                    )
                ),
            },
            {
                Header: 'Users',
                accessor: 'users',
                Cell: ({ value }) => (
                    <button onClick={() => setIsUserModalOpen(true)}>
                        {value}
                    </button>
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
        [sortDirection, setIsUserModalOpen, setIsGroupModalOpen]
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
            <h1 style={{marginTop: '30px'}}> <i className='bi bi-people-fill'></i> Group Management</h1>
            <table {...getTableProps()} style={{ width: '50%' }}>
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
            {isModalUserOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <UserList/>
                        <button style={{width: '300px', alignItems: 'center'}} className="btn btn-purple"
                                onClick={() => setIsUserModalOpen(false)}>Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupManagement;