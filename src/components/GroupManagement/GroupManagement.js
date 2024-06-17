import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './GroupManagement.css';
import Swal from "sweetalert2";
import AuthService from "../../services/authService";
import { createGroup, deleteGroup, getGroups } from "../../services/groupService";
import GroupUserList from "../GroupUserList/GroupUserList";
import {showErrorMessage, showSuccessMessage} from "../../services/swalService";

function GroupManagement() {
    const [sortDirection, setSortDirection] = useState({});
    const [reload, setReload] = useState(false);
    const [currentGroupId, setCurrentGroupId] = useState(null);
    const [formKey, setFormKey] = useState(0);

    const defaultRow = {
        name: '',
        isPrivate: '',
        totalSize: '',
        joinCode: '',
        description: '',
        users: 'Add Users',
        groups: 'Add Groups',
        operation: '',
    };

    const getDefaultValues = () => ({
        name: '',
        isPrivate: '',
        totalSize: '',
        joinCode: '',
        description: '',
    });

    const [inputValues, setInputValues] = useState(getDefaultValues());

    const handleInputChange = (event, field) => {
        let value = event.target.value;
        if (field === 'isPrivate') {
            value = event.target.value === 'Yes';
        }
        setInputValues(prevValues => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userId = AuthService.getUserId();
        createGroup(inputValues, userId)
            .then((response) => {
                if(response === undefined) {
                    showErrorMessage('There was an error!').then(r => r.dismiss);
                    return;
                }

                showSuccessMessage('Group added successfully.').then(r => r.dismiss);

                setInputValues({
                    name: '',
                    isPrivate: '',
                    totalSize: '',
                    joinCode: '',
                    description: '',
                });

                setReload(prevReload => !prevReload);
            })
            .catch(error => {
                showErrorMessage('There was an error!').then(r => r.dismiss);
            });

        setInputValues(getDefaultValues());
        setFormKey(prevKey => prevKey + 1);
    };

    const handleDelete = (event, groupId) => {
        event.stopPropagation();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6D2B75FF",
            cancelButtonColor: "#A060A8FF",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteGroup(groupId)
                    .then(response => {
                        showSuccessMessage('Group deleted successfully.').then(r => r.dismiss);

                        setReload(prevReload => !prevReload);
                    })
                    .catch(error => {
                        showErrorMessage('There was an error!').then(r => r.dismiss);
                    });
            }
        });
    };

    const [data, setData] = useState([defaultRow]);

    useEffect(() => {
        setInputValues({
            name: '',
            isPrivate: '',
            totalSize: '',
            joinCode: '',
            description: '',
        });

        getGroups()
            .then(response => {
                const newData = response.data.map(item => ({
                    ...item, // spread the original object
                    id: item.id,
                    users: 'Add Users',
                    groups: 'Add Groups',
                    operation: '',
                }));
                setData(prevData => [prevData[0], ...newData]);
                // keep the first row and append the fetched data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [reload]);

    const toggleSort = (columnId) => {
        setSortDirection(prev => ({
            ...prev,
            [columnId]: prev[columnId] === 'asc' ? 'desc' : prev[columnId] === 'desc' ? 'none' : 'asc'
        }));
    };

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const columns = React.useMemo(
        () => [
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Name
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'name',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter group name' className="form-control"
                               onChange={(event) => handleInputChange(event, 'name')}
                               defaultValue={inputValues.name} required={true}/>
                    ) : original.name
                ),
            },
            {
                Header: 'Public',
                accessor: 'isPrivate',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <select className="form-control"
                                onChange={(event) => handleInputChange(event, 'isPrivate')}
                                defaultValue={inputValues.isPrivate === 'true' ? 'Yes' : 'No'}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    ) : original.isPrivate ? 'No' : 'Yes'
                ),
            },
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Max members
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'maxMembers',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="number" placeholder='Enter max members' className="form-control"
                               onChange={(event) => handleInputChange(event, 'totalSize')}
                               defaultValue={inputValues.totalSize} required={true}/>
                    ) : original.totalSize
                ),
            },
            {
                Header: ({ column }) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Invitation Code
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'code',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter invitation code' className="form-control"
                               onChange={(event) => handleInputChange(event, 'joinCode')}
                               defaultValue={inputValues.joinCode} required={true}/>
                    ) : original.joinCode
                ),
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter description' className="form-control"
                               onChange={(event) => handleInputChange(event, 'description')}
                               defaultValue={inputValues.description} required={true}/>
                    ) : original.description
                ),
            },
            {
                Header: 'Users',
                accessor: 'users',
                Cell: ({ row: { index, original } }) => (
                    index !== 0 ? (
                        <button className="btn btn-rounded" onClick={() => {
                            setIsUserModalOpen(true);
                            setCurrentGroupId(original.id);
                        }}>
                            {original.users}
                        </button>
                    ) : null
                ),
            },
            {
                Header: 'Operation',
                accessor: 'operation',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <button type="submit" className='add-btn'>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    ) : (
                        <button type="button" className='remove-btn' onClick={(event) => handleDelete(event, original.id)}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    )
                ),
            }
        ],
        [sortDirection, setIsUserModalOpen]
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
            <h1 style={{ marginTop: '30px' }}><i className='bi bi-people-fill'></i> Group Management</h1>
            <form onSubmit={handleSubmit} key={formKey}>
                <table {...getTableProps()} style={{width: '50%'}}>
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
            </form>
            {isUserModalOpen && (
                <div className="modal">
                    <div className="modal-content" style={{borderRadius: '20px'}}>
                        <GroupUserList groupId={currentGroupId}/>
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
