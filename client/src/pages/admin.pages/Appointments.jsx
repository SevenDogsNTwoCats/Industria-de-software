import React, { useEffect, useState } from 'react'
import { createAppointment, deleteAppointment, getAppointments, getAppointmentsSolicitation, updateAppointmentSolicitation } from '../../api/appointment';
import { Button, Modal } from 'react-bootstrap';
import { getEmployees } from '../../api/human-resources';
import BottomNavigation from '../../components/BottomNavigation';



const Appointments = () => {

    const list = [
        { title: 'Volver', url: '/admin/home', icon: 'bi bi-arrow-left-circle-fill' },
        { title: 'Panel', url: '/admin/home', icon: 'bi bi-house-fill' },
    ]

    const [appointmentsSolicitation, setAppointmentsSolicitation] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [currentAS, setCurrentAS] = useState({});
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (movement) => {
        setShowModal(true);
        setCurrentAS(movement)
        setDate(movement.Date.split('T')[0]);
        setDescription(movement.Description);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        getAppointmentsSolicitationFunc();
    };


    const getAppointmentsSolicitationFunc = async () => {
        try {
            const response = await getAppointmentsSolicitation();
            setAppointmentsSolicitation(response.data);
        } catch (error) {
            console.error(error);
            error.response.data.map((err) => alert(err));
        }
    }

    const getAppointmentsFunc = async () => {
        try {
            const response = await getAppointments();
            setAppointments(response.data);
        } catch (error) {
            console.error(error);
            error.response.data.map((err) => alert(err));
        }
    }

    const deleteAppointmentFunc = async (id) => {
        try {
            const res = await deleteAppointment(id);
            getAppointmentsSolicitationFunc();
            getAppointmentsFunc();
            alert('Cita cancelada correctamente');
        } catch (error) {
            alert('Error al cancelar la cita');
            error.response.data.map((err) => alert(err));
            console.error(error);
        }
    }

    const newAppointment = async () => {
        try {
            const res = await createAppointment({
                appointmentSolicitationId: currentAS.Id,
                clientId: parseInt(currentAS.Client.Id),
                description: document.getElementById('desp-a').value,
                employeeId: parseInt(document.getElementById('employee-a').value),
                state: 'APROBADO',
                date: `${document.getElementById('date-a').value}T${document.getElementById('time-a').value}:00.000Z`,
            });
            getAppointmentsSolicitationFunc();
            getAppointmentsFunc();
            alert('Cita aceptada correctamente');
            handleCloseModal();
        } catch (error) {
            console.error(error);
            error.response.data.map((err) => alert(err));
        }
    }

    const rejectAppointmentSolicitation = async (id) => {
        try {
            const res = await updateAppointmentSolicitation(id, { state: 'RECHAZADO' });
            getAppointmentsSolicitationFunc();
            alert('Solicitud rechazada correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al rechazar la solicitud');
            error.response.data.map((err) => alert(err));
        }
    }

    const getAllEmployees = async () => {
        try {
            const res = await getEmployees();
            setEmployees(res.data);
        } catch (error) {
            console.error(error);
            error.response.data.map((err) => alert(err));
        }
    }




    useEffect(() => {
        getAppointmentsSolicitationFunc();
        getAppointmentsFunc();
        getAllEmployees();
    }, [])


    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleDesChange = (event) => {
        setDescription(event.target.value);
    };


    const [currentPageAS, setCurrentPageAS] = useState(1);
    const [itemsPerPageAS, setItemsPerPageAS] = useState(10);
    const indexOfLastItemAS = currentPageAS * itemsPerPageAS;
    const indexOfFirstItemAS = indexOfLastItemAS - itemsPerPageAS;
    const currentItemsAS = appointmentsSolicitation.slice(indexOfFirstItemAS, indexOfLastItemAS);
    const paginateAS = (pageNumber) => setCurrentPageAS(pageNumber);

    const [currentPageA, setCurrentPageA] = useState(1);
    const [itemsPerPageA, setItemsPerPageA] = useState(10);
    const indexOfLastItemA = currentPageA * itemsPerPageA;
    const indexOfFirstItemA = indexOfLastItemA - itemsPerPageA;
    const currentItemsA = appointments.slice(indexOfFirstItemA, indexOfLastItemA);
    const paginateA = (pageNumber) => setCurrentPageA(pageNumber);

    return (
        <div className='pb-4' >
            <div className="container mt-4 bg-white rounded-4 table-responsive" >
                <br />
                <h3>Solicitudes</h3>
                <table className="table wrap-table" >
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItemsAS.map((movement, index) => (
                                movement.State === 'PENDIENTE' ?
                                    <tr key={index} className={movement.State === 'PENDIENTE' ? 'table-secondary' : movement.State === 'RECHAZADO' ? 'table-danger' : movement.State === 'APROBADO' ? 'table-success' : ''}>

                                        <td>{movement.Date.split('T')[0]}</td>
                                        <td>{movement.Client.Person.First_Name} {movement.Client.Person.Last_Name}</td>
                                        <td>{movement.Description}</td>
                                        <td className='d-flex'>
                                            <button className={`btn btn-success`} onClick={() => handleShowModal(movement)}  ><i className="bi bi-check-lg"></i></button>
                                            <div className="mx-2"></div>
                                            <button className={`btn btn-danger`} onClick={() => rejectAppointmentSolicitation(movement.Id)}  ><i className="bi bi-x-lg"></i></button>
                                        </td>
                                    </tr>
                                    : null
                            ))
                        }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPageAS === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateAS(currentPageAS - 1)}>Anterior</a>
                        </li>
                        <li className={`page-item ${currentPageAS === Math.ceil(appointmentsSolicitation.length / itemsPerPageAS) ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateAS(currentPageAS + 1)}>Siguiente</a>
                        </li>
                    </ul>
                </nav>
                <div className="pagination">

                </div>
            </div>

            <div className="container mt-4 bg-white rounded-4 table-responsive" >
                <h3>Citas</h3>
                <table className="table wrap-table" >
                    <thead>
                        <tr>
                            <th scope="col">Estado</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Doctor</th>
                            <th scope="col">Cancelar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItemsA.map((movement, index) => (
                                movement.State === 'PENDIENTE' ?
                                    <tr key={index} className='table-secondary'>
                                        <td>{movement.State}</td>
                                        <td>{movement.Date.split('T')[0]}</td>
                                        <td>{movement.Date.split('T')[1].split('.')[0]}</td>
                                        <td>{movement.Description}</td>
                                        <td>{movement.Employee.Person.First_Name} {movement.Employee.Person.Last_Name}</td>
                                        <td><button className={`btn btn-danger ${movement.State !== 'PENDIENTE' ? 'disabled' : ''}`} onClick={() => deleteAppointmentFunc(movement.Id)}  ><i className="bi bi-trash"></i></button></td>
                                    </tr>
                                    : null
                            ))
                        }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPageA === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateAS(currentPageA - 1)}>Anterior</a>
                        </li>
                        <li className={`page-item ${currentPageA === Math.ceil(appointments.length / itemsPerPageA) ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginateAS(currentPageA + 1)}>Siguiente</a>
                        </li>
                    </ul>
                </nav>
                <div className="pagination">

                </div>
            </div>


            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Aceptar cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="date-a" className="form-label">Fecha</label>
                        <input type="date" className="form-control" id="date-a" value={currentAS.Date ? date : null} onChange={handleDateChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="time-a" className="form-label">Hora</label>
                        <input type="time" className="form-control" id="time-a" min="08:00" max="16:59" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="client-a" className="form-label">Cliente</label>
                        <input type="text" className="form-control" id="client-a" value={currentAS.Client && currentAS.Client.Person ? `${currentAS.Client.Person.First_Name} ${currentAS.Client.Person.Last_Name}` : ''} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desp-a" className="form-label">Descripcion</label>
                        <textarea type="text" className="form-control" id="desp-a" value={description} onChange={handleDesChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="employee-a" className="form-label">Doctor</label>
                        <select className="form-select" id="employee-a">
                            {
                                employees.map((employee, index) => (
                                    employee.Position === 'MEDICO' ?
                                        <option key={index} value={employee.Id}>{employee.Person.First_Name} {employee.Person.Last_Name}</option>
                                        : null
                                ))
                            }
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={newAppointment}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
            <BottomNavigation list={list} />
        </div>
    )
}

export default Appointments