import React, {useEffect, useState} from 'react';
import {useTable} from 'react-table';
import './ErrorManagement.css';
import Swal from "sweetalert2";
import {
    getErrorReports, deleteErrorReportService, updateErrorReportStatusService
} from "../../services/errorService";
import {showErrorMessage, showSuccessMessage} from "../../services/swalService";

function ErrorManagement() {
    const [sortDirection, setSortDirection] = useState({});
    const [data, setData] = useState([]);
    const [reloadKey, setReloadKey] = useState(0);

    const updateErrorReportStatus = (id, status) => {
        updateErrorReportStatusService(id, status)
            .then(response => {
                showSuccessMessage('Status updated successfully').then(r => r.dismiss);
                setReloadKey(prevKey => prevKey + 1);
            })
            .catch(error => {
                showErrorMessage('Error while updating status').then(r => r.dismiss);
                console.error('There was an error!', error);
            });
    };

    const deleteErrorReport = (id) => {
        deleteErrorReportService(id)
            .then(() =>{
                showErrorMessage('Error report deleted successfully').then(r => r.dismiss);
                setReloadKey(prevKey => prevKey + 1);
            })
            .catch(error => {
                showErrorMessage('Error while deleting error report').then(r => r.dismiss);
            });
    };

    useEffect(() => {
        getErrorReports()
            .then(response => {
                const newData = response.data.map(item => ({
                    id: item.id,
                    index: item.index,
                    date: item.dateTime,
                    description: item.content,
                    status: item.status,
                    operation: '',
                }));

                setData(newData);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [reloadKey]);

    const toggleSort = (columnId) => {
        setSortDirection(prev => ({
            ...prev,
            [columnId]: prev[columnId] === 'asc' ? 'desc' : prev[columnId] === 'desc' ? 'none' : 'asc'
        }));
    };

    const [selectedStatus, setSelectedStatus] = useState(Array(data.length).fill(1)); // in progress - 1

    const columns = React.useMemo(
        () => [
            {
                Header: ({column}) => (
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
                        Date
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'date',
            },
            {
                Header: ({column}) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Error Message
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'description',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({row}) => (
                    <div className='status-icons'>
                        {['check-circle', 'hourglass-split'].map((icon, index) => {
                            const status = index === 0 ? 'SOLVED' : 'PENDING';
                            return (
                                <i
                                    className={`bi bi-${icon} ${row.original.status === status ? 'selected' : ''}`}
                                    onClick={() => {
                                        const newSelectedStatus = [...selectedStatus];
                                        newSelectedStatus[row.index] = index;
                                        setSelectedStatus(newSelectedStatus);
                                        updateErrorReportStatus(row.original.id, status);
                                    }}
                                ></i>
                            );
                        })}
                    </div>
                ),
            },
            {
                Header: 'Operation',
                accessor: 'operation',
                Cell: ({row}) => (
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
                                deleteErrorReport(row.original.id);
                                showSuccessMessage('Error report deleted successfully').then(r => r.dismiss);
                            }
                        });
                    }}>
                        <i className="bi bi-x-circle"></i>
                    </button>
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
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{marginTop: '30px'}}><i className='bi bi-bug'></i> Error Reports</h1>
            <table {...getTableProps()} style={{width: '50%'}}>
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