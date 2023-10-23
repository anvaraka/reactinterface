import { BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment"
import AppointmentInfo from "./components/AppointmentInfo"
import { useCallback, useState, useEffect } from "react";

function App() {

    let [appointmentList, setAppointmentList] = useState([]);
    let [query, setQuery] = useState("");
    let [sortBy, setSortBy] = useState("petName");
    let [orderBy, setOrderBy] = useState("desc");

    const filteredAppointments = appointmentList.filter(list => {
        return (
            list.petName.toLowerCase().includes(query.toLowerCase()) ||
            list.ownerName.toLowerCase().includes(query.toLowerCase()) ||
            list.aptNotes.toLowerCase().includes(query.toLowerCase())
        )
    }).sort((a, b) => {
        let order = (orderBy === 'asc') ? 1 : -1;
        return (
            a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
        )
    })

    const fetchData = useCallback(() => {
        fetch('./data.json')
            .then(res => res.json())
            .then((data) => setAppointmentList(data))
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    return (
        <div className="App container mx-auto mt-3 font-thin">
            <h1 className="text-5xl">
                <BiArchive className="inline-block text-red-400 align-top" />Your Appointments
            </h1>
            <AddAppointment 
            onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
            lastId={appointmentList.reduce((max, item)=> Number(item.id) > max ? Number(item.id) : max, 0)}
            />
            <Search query={query} onQueryChange={myQuery => setQuery(myQuery)} 
            orderBy={orderBy}
            onOrderByChange={mySort => setOrderBy(mySort)}
            sortBy={sortBy}
            onSortByChange={mySort => setSortBy(mySort)}
            />
            <ul className="divide-y divide-gray-200 ">
                {filteredAppointments.map(appointment => (
                    <AppointmentInfo
                        key={appointment.id}
                        appointment={appointment}
                        onDeleteAppointment={
                            appointmentId => setAppointmentList(appointmentList.filter(list => list.id !== appointmentId))
                        } />
                ))}
            </ul>
        </div>
    );
}

export default App;
