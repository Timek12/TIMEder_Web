import React, {useEffect, useState} from 'react';
import { useTable } from 'react-table';
import './AccountManagement.css';
import {getUsers, updateUser} from "../../services/userService";

function AccountManagement() {
    const [sortDirection, setSortDirection] = useState({});
    const [reload, setReload] = useState(false);

    const toggleSort = (columnId) => {
        setSortDirection(prev => ({
            ...prev,
            [columnId]: prev[columnId] === 'asc' ? 'desc' : prev[columnId] === 'desc' ? 'none' : 'asc'
        }));
    };


    const [data, setData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);

    useEffect(() => {
        getUsers()
            .then(response => {
                const newData = response.data.map(item => ({
                    id: item.id,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    index: item.index,
                    email: item.email,
                    password: item.password,
                    status: item.status,
                }));
                setData(prevData => {
                    if (!prevData || prevData.length === 0) {
                        return newData;
                    }
                    return [prevData[0], ...newData];
                });

                // Set selectedStatus based on the fetched data's status
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        setSelectedStatus(data.map(item => item.status));
    }, [reload]);

    const columns = React.useMemo(
        () => [
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Index
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'index',
            },
            {
                Header: ({column}) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        First Name
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'firstName',
            },
            {
                Header: ({column}) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Last Name
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'lastName',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ row }) => (
                    <div className='status-checkboxes'>
                        {['archive', 'ban', 'check-circle', 'hourglass-split'].map((icon, index) => (
                            <i
                                className={`bi bi-${icon} ${selectedStatus[row.index] === index ? 'selected' : ''}`}
                                onClick={() => {
                                    if (data.length !== 0) {
                                        updateUser(data[row.index].id, data[row.index], index);
                                        const newSelectedStatus = [...selectedStatus];
                                        newSelectedStatus[row.index] = index;
                                        setSelectedStatus(newSelectedStatus);
                                        setReload(prevReload => !prevReload);
                                    } else {
                                        setReload(prevReload => !prevReload);
                                    }
                                }}
                            ></i>
                        ))}
                    </div>
                ),
            },
        ],
        [sortDirection, selectedStatus]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data});

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{marginTop: '30px'}}><i className='bi bi-person-circle'> </i> Account Management</h1>
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

export default AccountManagement;