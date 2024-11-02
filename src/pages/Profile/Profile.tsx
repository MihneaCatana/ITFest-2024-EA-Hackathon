import {useState} from "react";

import Navbar from "../../components/Navbar/Navbar.tsx";

import {Card} from "primereact/card";
import {Image} from "primereact/image";
import {Button} from "primereact/button";

import "./Profile.css"
import {Dropdown} from "primereact/dropdown";
import {toast, ToastContainer} from "react-toastify";

const Profile = () => {

    const account = JSON.parse(localStorage.getItem('account') || "");
    const defaultCity = localStorage.getItem('defaultCity') || 'Bucharest';
    const [selectedItem, setSelectedItem] = useState(defaultCity);



    const cities = [
        {label: 'EV', value: 'EV'},
        {label: 'Non-EV', value: 'Non-EV'},
    ]


    return <>
        <Navbar/>
        <div className="profile_container">
            <Card title={'Hello ' + account.username} className='profile_card'>
                <Image className='profile_image'
                       src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                       width='200'/>

                <div>
                    <p>Vehicle type:</p>
                    <Dropdown filter value={selectedItem} onChange={(e) => setSelectedItem(e.value)} options={cities}
                              virtualScrollerOptions={{itemSize: 38}}
                              placeholder="Type of vehicle" className="w-full md:w-14rem"
                              tooltip="Non-EV: Refers to the vehicles that consume fossil fuels like diesel/petrol cars"
                    />
                    <Button style={{marginLeft: '1rem'}}
                            onClick={() => {
                                localStorage.setItem('defaultCity', selectedItem);
                                toast.success('The vehicle type has been changed with success!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                });
                            }}><i
                        className='pi pi-check'></i></Button>
                </div>


                <Button style={{marginTop: 20}} >Update your Photo</Button>

                <p style={{textAlign: 'center'}}><b>Your badges: </b></p>
            </Card>
            <ToastContainer/>
        </div>
    </>
}

export default Profile