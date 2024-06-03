import React, {useEffect, useState} from 'react';
import {useTable} from 'react-table';
import './EventManagement.css';
import UserList from "../UserList/UserList";
import GroupList from "../GroupList/GroupList";
import Swal from "sweetalert2";
import AuthService from "../../services/authService";
import {deleteEvent, getEvents, createEvent} from "../../services/eventService";

function EventManagement() {
    const [sortDirection, setSortDirection] = useState({});
    const [reload, setReload] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null);
    const [formKey, setFormKey] = useState(0);

    const defaultRow = {
        name: '',
        location: '',
        date: '',
        startTime: '',
        description: '',
        users: 'Add Users',
        groups: 'Add Groups',
        operation: '',
    };

    const getDefaultValues = () => ({
        name: '',
        location: '',
        date: '',
        startTime: '',
        description: '',
    });

    const [inputValues, setInputValues] = useState(getDefaultValues());

    const handleInputChange = (event, field) => {
        let value = event.target.value;
        setInputValues(prevValues => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userId = AuthService.getUserId();
        createEvent(inputValues, userId)
            .then((response) => {
                if (response === undefined) {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error!",
                        icon: "error"
                    });
                    return;
                }
                Swal.fire({
                    title: "Success!",
                    text: "Group has been added.",
                    icon: "success"
                });

                setInputValues({
                    name: '',
                    location: '',
                    date: '',
                    startTime: '',
                    description: '',
                });

                setReload(prevReload => !prevReload);
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: "There was an error! " + error,
                    icon: "error"
                });
            });

        setInputValues(getDefaultValues());
        setFormKey(prevKey => prevKey + 1);
    };

    const handleDelete = (event, eventId) => {
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
                deleteEvent(eventId)
                    .then(response => {
                        Swal.fire({
                            title: "Success!",
                            text: "Group has been deleted.",
                            icon: "success"
                        });

                        setReload(prevReload => !prevReload);
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was an error! " + error,
                            icon: "error"
                        });
                    });
            }
        });
    };

    const [data, setData] = useState([defaultRow]);

    useEffect(() => {
        setInputValues({
            name: '',
            location: '',
            date: '',
            startTime: '',
            description: '',
        });

        getEvents()
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

    const [isModalUserOpen, setIsUserModalOpen] = useState(false);
    const [isModalGroupOpen, setIsGroupModalOpen] = useState(false);

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
                        <input type="text" placeholder='Enter event name' className="form-control"
                               onChange={(event) => handleInputChange(event, 'name')}
                               defaultValue={inputValues.name} required={true}/>
                    ) : original.name
                ),
            },
            {
                Header: 'Location',
                accessor: 'location',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter event location' className="form-control"
                               onChange={(event) => handleInputChange(event, 'location')}
                               defaultValue={inputValues.location} required={true}/>
                    ) : original.location
                ),
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
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="date" placeholder='Enter event date' className="form-control"
                               onChange={(event) => handleInputChange(event, 'date')}
                               defaultValue={inputValues.date} required={true}/>
                    ) : original.date
                ),
            },
            {
                Header: ({column}) => (
                    <div onClick={() => toggleSort(column.id)} className="column-header">
                        Start Time
                        {sortDirection[column.id] === 'asc' ?
                            <i className="bi bi-caret-up"></i> : sortDirection[column.id] === 'desc' ?
                                <i className="bi bi-caret-down"></i> : null}
                    </div>
                ),
                accessor: 'startTime',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter event start time' className="form-control"
                               onChange={(event) => handleInputChange(event, 'startTime')}
                               defaultValue={inputValues.startTime} required={true}/>
                    ) : original.startTime
                ),
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="text" placeholder='Enter event description' className="form-control"
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
                            setCurrentEventId(original.id);
                        }}>
                            {original.users}
                        </button>
                    ) : null
                ),
            },
            {
                Header: 'Groups',
                accessor: 'groups',
                Cell: ({ row: { index, original } }) => (
                    index !== 0 ? (
                        <button className="btn btn-rounded" onClick={() => {
                            setIsUserModalOpen(true);
                            setCurrentEventId(original.id);
                        }}>
                            {original.groups}
                        </button>
                    ) : null
                ),
            },
            {
                Header: 'Operation',
                accessor: 'operation',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <button className='add-btn rounded-button'>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    ) : (
                        <button className='remove-btn rounded-button' onClick={(event) => handleDelete(event, original.id)}>
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
    } = useTable({columns, data});

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{marginTop: '30px'}}><i className='bi bi-calendar-event'></i> Event Management</h1>
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
            {isModalUserOpen && (
                <div className="modal">
                    <div className="modal-content" style={{borderRadius: '20px'}}>
                        <UserList eventId = {currentEventId}/>
                        <button style={{width: '300px', alignItems: 'center'}} className="btn btn-purple"
                                onClick={() => setIsUserModalOpen(false)}>Close
                        </button>
                    </div>
                </div>
            )}
            {isModalGroupOpen && (
                <div className="modal">
                    <div className="modal-content" id='group-modal' style={{borderRadius: '20px'}}>
                        <GroupList eventId = {currentEventId}/>
                        <button style={{width: '300px', alignItems: 'center', borderRadius: '5px'}}
                                className="btn btn-purple"
                                onClick={() => setIsGroupModalOpen(false)}>Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventManagement;
