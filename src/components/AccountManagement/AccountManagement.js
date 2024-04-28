import React, {useState} from 'react';
import { useTable } from 'react-table';
import './AccountManagement.css';

function AccountManagement() {
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
                firstName: 'Adam',
                lastName: 'Kowalski',
                status: '',
            },
            {
                index: 225714,
                firstName: 'Agnieszka',
                lastName: 'Grzelak',
                status: '',
            },
            {
                index: 215332,
                firstName: 'Marcin',
                lastName: 'Dubiel',
                status: '',
            },
            {
                index: 245239,
                firstName: 'Robert',
                lastName: 'Lewandowski',
                status: '',
            },
        ],
        []
    );
    const [selectedStatus, setSelectedStatus] = useState(Array(data.length).fill(2)); // ok - 2
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
                        {['archive', 'blockquote-right', 'check-circle', 'exclamation-triangle'].map((icon, index) => (
                            <i
                                className={`bi bi-${icon} ${selectedStatus[row.index] === index ? 'selected' : ''}`}
                                onClick={() => {
                                    const newSelectedStatus = [...selectedStatus];
                                    newSelectedStatus[row.index] = index;
                                    setSelectedStatus(newSelectedStatus);
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