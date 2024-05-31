import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './GroupManagement.css';
import UserList from "../UserList/UserList";
import Swal from "sweetalert2";
import axios from "axios";

function GroupManagement() {
    const [sortDirection, setSortDirection] = useState({});
    const defaultRow = {
        name: '',
        publicity: '',
        maxMembers: '',
        code: '',
        description: '',
        users: 'Add Users',
        groups: 'Add Groups',
        operation: '',
    };

    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState('');
    const [maxMembers, setMaxMembers] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!(name !== '' && isPublic !== '' && maxMembers !== '' && code !== '' && description !== '')) {
            Swal.fire(
                'Error!',
                'Please fill in all fields.',
                'error'
            )
            return;
        }

        axios.post('http://localhost:8080/api/v1/groups/', {
            name: name,
            description: description,
            currentSize: 1,
            totalSize: maxMembers,
            isPrivate: true,
            joinCode: code,
            ownerId: 1,
        })
            .then(response => {
                setName('');
                setIsPublic('');
                setMaxMembers('');
                setCode('');
                setDescription('');
                setData(prevData => [defaultRow, ...prevData]);
                Swal.fire({
                    title: "Success!",
                    text: "Group has been added.",
                    icon: "success"
                });
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: "There was an error! " + error,
                    icon: "error"
                });
            });
    };


    const [data, setData] = useState([defaultRow]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/groups/')
            .then(response => {
                const newData = response.data.map(item => ({
                    ...item, // spread the original object
                    users: 'Add Users', // add the new fields
                    groups: 'Add Groups',
                    operation: '',
                }));
                setData(prevData => [prevData[0], ...newData]); // keep the first row and append the fetched data
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

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
                Header: ({column}) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Name
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'name',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter group name' required onChange={e => setName(e.target.value)}/>
                    ) : original.name
                ),
            },
            {
                Header: 'Public',
                accessor: 'publicity',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter group publicity' required onChange={e => setIsPublic(e.target.value)}/>
                    ) : (
                        original.publicity
                    )
                ),
            },
            {
                Header: ({column}) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Max members
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'maxMembers',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="number" placeholder='Enter max members' required onChange={e => setMaxMembers(e.target.value)}/>
                    ) : original.maxMembers
                ),
            },
            {
                Header: ({column}) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Invitation Code
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'code',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter group invitation code' required onChange={e => setCode(e.target.value)}/>
                    ) : original.code
                ),
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter description' required onChange={e => setDescription(e.target.value)}/>
                    ) : (
                        original.description
                    )
                ),
            },
            {
                Header: 'Users',
                accessor: 'users',
                Cell: ({value}) => (
                    <button className="btn btn-rounded" onClick={() => setIsUserModalOpen(true)}>
                        {value}
                    </button>
                ),
            },
            {
                Header: 'Operation',
                accessor: 'operation',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <button className='add-btn' onClick={handleSubmit}>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    ) : (

                        <button className='remove-btn' onClick={() => {
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
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                    // Add your code to delete the row here
                                }
                            });
                        }}>
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
    } = useTable({columns, data});

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{marginTop: '30px'}}><i className='bi bi-people-fill'></i> Group Management</h1>
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
            {isUserModalOpen && (
                <div className="modal">
                    <div className="modal-content" style={{borderRadius: '20px'}}>
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