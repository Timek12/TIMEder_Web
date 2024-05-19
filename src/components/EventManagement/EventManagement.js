import React, { useState } from 'react';
import { useTable } from 'react-table';
import './EventManagement.css';
import UserList from "../UserList/UserList";
import GroupList from "../GroupList/GroupList";
import Swal from "sweetalert2";

function EventManagement() {
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
                startTime: '',
                description: '',
                users: 'Add Users',
                groups: 'Add Groups',
                operation: '',
            },
            {
                name: 'Juwenalia Politechniki',
                location: 'aleje Politechniki 11, Lodz',
                date: '17.04.2024',
                startTime: '18:00',
                description: 'Oficjalne otwarcie Juwenaliow Politechniki Lodzkiej',
                users: 'Add Users',
                groups: 'Add Groups',
                operation: '...'
            },
            {
                name: 'Dni Wydzialu EEIA',
                location: 'aleje Politechniki 11, Lodz',
                date: '22.04.2024',
                startTime: '10:00',
                description: 'Oficjalne dni wydzialu',
                users: 'Add Users',
                groups: 'Add Groups',
                operation: '...'
            },
            {
                name: 'Granie w szachy',
                location: 'aleje Politechniki 11, Lodz',
                date: '19.04.2024',
                startTime: '12:00',
                description: 'Oficjalny turniej szachowy',
                users: 'Add Users',
                groups: 'Add Groups',
                operation: '...'
            },
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
                Header: 'Location',
                accessor: 'location',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter event location' />
                    ) : original.location
                ),
            },
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Date
                        {sortDirection[column.id] === 'asc' ? <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ? <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'date',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="date" placeholder='Enter event date' />
                    ) : original.date
                ),
            },
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Start Time
                        {sortDirection[column.id] === 'asc' ? <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ? <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'startTime',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter event start time' />
                    ) : original.startTime
                ),
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter event description' />
                    ) : original.description
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
                Header: 'Groups',
                accessor: 'groups',
                Cell: ({ value }) => (
                    <button onClick={() => setIsGroupModalOpen(true)}>
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
                        <button className='remove-btn' onClick={() => {
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                }
                            });
                        }}>
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
            <h1 style={{marginTop: '30px'}}> <i className='bi bi-calendar-event'></i> Event Management</h1>
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
                    <div className="modal-content" style={{borderRadius: '20px'}}>
                        <UserList/>
                        <button style={{width: '300px', alignItems: 'center'}} className="btn btn-purple" onClick={() => setIsUserModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
            {isModalGroupOpen && (
                <div className="modal">
                    <div className="modal-content" id='group-modal' style={{borderRadius: '20px'}}>
                        <GroupList/>
                        <button style={{width: '300px', alignItems: 'center'}} className="btn btn-purple"
                                onClick={() => setIsGroupModalOpen(false)}>Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventManagement;