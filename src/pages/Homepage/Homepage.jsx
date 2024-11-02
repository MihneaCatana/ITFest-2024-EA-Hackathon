import Navbar from "../../components/Navbar/Navbar.tsx";

import "./Homepage.css"
import {CircleMarker, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import Axios from "axios";

const Homepage = () => {


    const [malls, setMalls] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8080/mall/getAll').then(res => {
            setMalls(res.data);
        })


    }, []);

    const availableParkingSpaces = [
        {
            id: 1,
            label: "Veranda Mall",
            src: "https://www.evergent.ro/storage/media/7908/veranda-mall-840x600.jpg",
            latitude: 44.4522,
            longitude: 26.1306
        },
        {
            id: 2,
            label: "AFI Cotroceni",
            src: "https://www.aficotroceni.ro/wp-content/uploads/2023/02/02-Intrare-Galaxy.jpg",
            latitude: 44.4309,
            longitude: 26.0525,
            fullyOccupied: true
        },
        {
            id: 3,
            label: 'Mega Mall',
            src: "https://drsa.ro/wp-content/uploads/2015/06/Mega-Mall-Bucuresti.jpg",
            latitude: 44.4418,
            longitude: 26.1523
        },
        {
            id: 4,
            label: 'Militari Shopping Center',
            src: "https://www.militari-shopping.ro/wp-content/uploads/2023/09/militari-shopping-center-view-min-1-scaled.jpg",
            latitude: 44.44013,
            longitude: 25.98197,
        },
        {
            id: 5,
            label: 'Park Lake',
            src: "https://www.economica.net/wp-content/uploads/2016/07/parklake_entrance_64438500.jpg",
            latitude: 44.4206,
            longitude: 26.1496,
        },
    ]

    const navigate = useNavigate();

    return <>
        <div className='homepage_container'>
            <Navbar/>

            { <MapContainer center={[44.4480,26.0991]} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[44.4480,26.0991]}>
                    <Popup>
                        This is your current location.
                    </Popup>
                </Marker>

                {availableParkingSpaces.map((point) => <CircleMarker
                    center={{lat: point.latitude, lng: point.longitude}}
                    pathOptions={{color:  point?.fullyOccupied ? 'red' :'green' }} radius={30} key={point.label}>
                    <Popup>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
                            <h2>{point.label}</h2>
                        <br/>
                            <img src={point.src} alt={point.label} height={240} width={240} style={{marginBottom:10}}/>
                        <Button  onClick={()=>navigate("/parking/"+ point.id) } style={{padding: 5}} disabled={point?.fullyOccupied} >  { point?.fullyOccupied ? "Parking is fully occupied" : "Check parking"} </Button>
                        </div>
                    </Popup>
                </CircleMarker>)}

            </MapContainer>}
        </div>
    </>
}

export default Homepage