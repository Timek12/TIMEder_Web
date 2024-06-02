import React, {useEffect, useState} from 'react';
import { useTable } from 'react-table';
import './GroupUserList.css';
import {addMember, deleteMember, getMembers} from "../../services/groupService";
import Swal from "sweetalert2";
function GroupUserList( {groupId}) {
    const [data, setData] = React.useState([]);
    const [reloadKey, setReloadKey] = useState(0);

    const getDefaultValues = () => ({
        userIndex: '',
        firstName: '',
        lastName: '',
    });

    const [inputValues, setInputValues] = useState(getDefaultValues());

    const handleInputChange = (event, field) => {
        let value = event.target.value;
        setInputValues(prevValues => ({
            ...prevValues,
            [field]: value,
        }));
    };

    useEffect(() => {
        getMembers(groupId)
            .then(response => {
                const newData = response.data.map(item => ({
                    ...item,
                    userIndex: item.index,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    operation: '',
                }));


                setData([{
                    userIndex: '',
                    firstName: '',
                    lastName: '',
                    operation: '',
                }, ...newData]);

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [groupId, reloadKey]);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Adding user:', inputValues.userIndex, inputValues.firstName, inputValues.lastName)

        addMember(groupId, inputValues.userIndex, inputValues.firstName, inputValues.lastName)
            .then(() => {
                Swal.fire(
                    'Success!',
                    'User added successfully.',
                    'success'
                )
                setReloadKey(prevKey => prevKey + 1);
            })
            .catch(error => {
                Swal.fire(
                    'Error!',
                    'There was an error while adding the user. Error: ' + error.message,
                    'error'
                )
                console.error('There was an error!', error);
            });
    };

    const handleDeleteMember = (userIndex) => {
        deleteMember(groupId, userIndex)
            .then(() => {
                Swal.fire(
                    'Success!',
                    'User removed successfully.',
                    'success'
                )
                setReloadKey(prevKey => prevKey + 1);
            })
            .catch(error => {
                Swal.fire(
                    'Error!',
                    'There was an error while removing the user. Error: ' + error.message,
                    'error'
                )
                console.error('There was an error!', error);
            });
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Index',
                accessor: 'userIndex',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" className="form-control" placeholder='Enter index'
                               onChange={(event) => handleInputChange(event, 'userIndex')}
                               defaultValue={inputValues.userIndex} required={true} />
                    ) : (
                        original.userIndex
                    )
                ),
            },
            {
                Header: 'First name',
                accessor: 'firstName',
                Cell: ({ row: { index, original } }) => (
                    index === 0 ? (
                        <input type="text" className="form-control" placeholder='Enter first name'
                               onChange={(event) => handleInputChange(event, 'firstName')}
                               defaultValue={inputValues.firstName} required={true} />
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
                        <input type="text" className="form-control" placeholder='Enter last name'
                               onChange={(event) => handleInputChange(event, 'lastName')}
                               defaultValue={inputValues.lastName} required={true} />
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
                        <button type="submit" className='add-btn'>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    ) : (
                        <button className='remove-btn' onClick={() => handleDeleteMember(original.index)}>
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
            <form onSubmit={handleSubmit} key={reloadKey}>
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
                </form>
        </div>
    );
}

export default GroupUserList;