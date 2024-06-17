import React, {useEffect, useState} from 'react';
import {useTable} from 'react-table';
import './EventGroupList.css';
import {addGroup, deleteGroup, getGroups} from "../../services/eventService";
import Swal from "sweetalert2";
import {showErrorMessage, showLoadingSpinner, showSuccessMessage} from "../../services/swalService";
function EventGroupList({eventId: eventId}) {
    const [data, setData] = React.useState([]);
    const [reloadKey, setReloadKey] = useState(0);

    const getDefaultValues = () => ({


        name: '',
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
        showLoadingSpinner().then(r => r.dismiss);

        getGroups(eventId)
            .then(response => {
                Swal.close();
                const newData = response.data.map(item => ({
                    ...item,


                    name: item.name,
                    operation: '',
                }));


                setData([{


                    name: '',
                    operation: '',
                }, ...newData]);

            })
            .catch(error => {
                Swal.close();
                showErrorMessage('There was an error!');
            });
    }, [eventId, reloadKey]);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Adding group:', inputValues.name)

        addGroup(eventId, inputValues.name)
            .then(() => {
                showSuccessMessage('Group added successfully!').then(r => r.dismiss);
                setReloadKey(prevKey => prevKey + 1);
            })
            .catch(error => {
                showErrorMessage('There was an error while adding the group.').then(r => r.dismiss);
            });
    };

    const handleDeleteGroup = (groupName) => {
        deleteGroup(eventId, groupName)
            .then(() => {
                showSuccessMessage('Group removed successfully!').then(r => r.dismiss);
                setReloadKey(prevKey => prevKey + 1);
            })
            .catch(error => {
                showErrorMessage('There was an error while removing the group.').then(r => r.dismiss);
            });
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Group name',
                accessor: 'name',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <input type="text" className="form-control" placeholder='Enter group name'
                               onChange={(event) => handleInputChange(event, 'name')}
                               defaultValue={inputValues.name} required={true}/>
                    ) : (
                        original.name
                    )
                ),
            },
            {
                Header: 'Operation',
                accessor: 'operation',
                Cell: ({row: {index, original}}) => (
                    index === 0 ? (
                        <button type="submit" className='add-btn'>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    ) : (
                        <button className='remove-btn' onClick={() => handleDeleteGroup(original.name)}>
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
    } = useTable({columns, data});

    return (
        <div className="card-container"
             style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '30px'}}>
            <h1 style={{marginTop: '10px'}}><i className="bi bi-person"></i> Group List</h1>
            <form onSubmit={handleSubmit} key={reloadKey}>
                <table {...getTableProps()} style={{width: '50%', marginBottom: '20px',}}>
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

export default EventGroupList;