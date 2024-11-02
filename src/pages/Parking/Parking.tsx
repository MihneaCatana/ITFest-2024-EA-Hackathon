// import {useParams} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.tsx";
import ParkingLot from "../../components/ParkingLot/ParkingLot.tsx";

const Parking = ()=>{

    // const {id} = useParams();

    return <>
        <Navbar/>
        {/*{id}*/}
        <div>
        <ParkingLot/>

        </div>
    </>
}


export default Parking