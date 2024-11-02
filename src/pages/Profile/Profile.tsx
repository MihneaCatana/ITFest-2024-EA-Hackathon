import {useEffect, useState} from "react";

import Navbar from "../../components/Navbar/Navbar.tsx";

import {Card as CardComponent} from "primereact/card";
import {Image} from "primereact/image";
import {Button} from "primereact/button";

import "./Profile.css"
import {Dropdown} from "primereact/dropdown";
import {toast, ToastContainer} from "react-toastify";
import Card  from "react-credit-cards-2";

import 'react-credit-cards-2/dist/es/styles-compiled.css'
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import Axios from "axios";

const Profile = () => {

    const account = JSON.parse(localStorage.getItem('account') || "");
    const defaultCity = localStorage.getItem('defaultCity') || 'Bucharest';
    const [selectedItem, setSelectedItem] = useState(defaultCity);
    const [historyReservations, setHistoryReservations] = useState([]);
    const [badgesList, setBadgesList] = useState([]);
    const [hidden, setHidden] = useState(true);

    const cardDetails = JSON.parse( localStorage.getItem('cardDetails') as string);

    const [displayHistory, setDisplayHistory] = useState(false);
    const [displayCreditCardModal, setDisplayCreditCardModal] = useState(false);
    const [creditCardDetails, setCreditCardDetails] = useState(cardDetails || {
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt: any) => {
        const { name, value } = evt.target;

        setCreditCardDetails((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt: any) => {
        setCreditCardDetails((prev) => ({ ...prev, focus: evt.target.name }));
    }


    const cities = [
        {label: 'EV', value: 'EV'},
        {label: 'Non-EV', value: 'Non-EV'},
    ]

    useEffect(() => {

        Axios.get('http://localhost:8080/history/getAllBy/14').then(
            (res)=> setHistoryReservations(res.data)
        )

        Axios.get('http://localhost:8080/badges/getAll').then(
            (res)=> setBadgesList(res.data)
        )

    }, []);


    const badges = [
        {
        id:1,
        name:"3rd reservation",
        badgeImg: "https://www.freeiconspng.com/uploads/badge-icon-png-22.png",
        discount: 5,
        used: false,
    },
        {
            id:2,
            name:"5 year aniversary",
            badgeImg: "https://png.pngtree.com/element_our/png/20180904/5-year-ribbon-anniversary-png_83468.jpg",
            discount: 10,
            used: true,
        },
        {
            id:3,
            name:"Gold award",
            badgeImg: "https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-champion-gold-award-medals-with-red-ribbons-png-image_6502715.png",
            discount: 15,
            used:false,
        }

    ]

    return <>
    <Navbar/>
    <div className="profile_container">
        <CardComponent title={'Hello, ' + account.username+"!"} className='profile_card'>
            <Image className='profile_image'
                   src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                   width='200'/>

            <div>
            </div>
            <Button style={{marginTop: 20}}>Update your Photo</Button>
        </CardComponent>
        <CardComponent title={'Details'} className='details_card'>
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
            <p style={{textAlign: 'center'}}><b>Your badges: </b></p>

            <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: "wrap"}}>
                {badgesList.map((badge: any) => {
                    return (

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginLeft: 5,
                            marginRight: 5,
                            justifyContent: "space-between"
                        }}>
                            {badge.name}
                            <img width={80} src={badge.badgeImg} className={badge.used ? "greyscale" : ""}/>
                            <Button onClick={()=>toast.success('The discount coupon has been selected with success!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            })} disabled={badge.used}> Activate {badge.discount}% discount</Button>
                        </div>

                    )
                })
                }

            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                <Button style={{backgroundColor: 'transparent', border: 'none', color: 'black'}} onClick={()=> setDisplayHistory(true)}>
                    <i className="pi pi-history" style={{fontSize: '2.5rem'}}></i>
                </Button>
            </div>
            <></>
        </CardComponent>
        <ToastContainer/>
    </div>
    <div className="profile_container">
        <CardComponent title={'Wallet'} className='wallet_card'>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {!cardDetails ?

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div>{"You don't have any associated credit card, please add for automatic payment"}</div>
                        <Button style={{marginTop: 15, marginBottom: 15}}
                                onClick={() => setDisplayCreditCardModal(true)}>Add a new Card</Button>
                    </div> :

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <Card
                            number={ hidden? '': creditCardDetails.number}
                            expiry={hidden? '':creditCardDetails.expiry}
                            cvc={hidden? '':creditCardDetails.cvc}
                            name={hidden? '':creditCardDetails.name}
                        />
                        <i className={`pi ${hidden?"pi-eye" : "pi-eye-slash"}`} onClick={()=> setHidden(!hidden)} style={{fontSize: '1.3rem', marginBottom: 10, marginTop: 10}}></i>
                        <Button style={{marginTop: 15}} onClick={() => {
                            localStorage.removeItem('cardDetails');
                            window.location.reload()
                        }}>Delete Card</Button>
                    </div>
                }

            </div>

        </CardComponent>
    </div>

    <Dialog header="Add Credit Card" visible={displayCreditCardModal} style={{width: '50vw'}} onHide={() => {
        if (!displayCreditCardModal) return;
        setDisplayCreditCardModal(false);
    }}>
        <Card
            number={creditCardDetails.number}
            expiry={creditCardDetails.expiry}
            cvc={creditCardDetails.cvc}
            name={creditCardDetails.name}
        />

        <form style={{display:"flex", flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <InputText
                name="number"
                placeholder="Card Number"
                value={creditCardDetails.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={16}
                style={{marginTop: 15, marginBottom: 15}}
            />
            <InputText
                name="name"
                placeholder="Name"
                value={creditCardDetails.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={25}
                style={{marginTop: 15, marginBottom: 15}}
            />
            <InputText
                name="cvc"
                placeholder="CVC"
                value={creditCardDetails.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={3}
                style={{marginTop: 15, marginBottom: 15}}
            />
            <InputText
                name="expiry"
                placeholder="Expiry Date"
                value={creditCardDetails.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={4}
                style={{marginTop: 15, marginBottom: 15}}
            />
            <Button onClick={()=>{
                localStorage.setItem('cardDetails',JSON.stringify(creditCardDetails))
            }}>Add Card</Button>
        </form>

    </Dialog>

        <Dialog header="History of Reservations" visible={displayHistory} style={{width: '50vw'}} onHide={() => {
            if (!displayHistory) return;
            setDisplayHistory(false);
        }}>

            {historyReservations.map((historyReserve : any)=>{

               return (
                   <CardComponent style={{marginBottom: 10}}>
                    <div>Place: <b>{historyReserve.mallId}</b> </div>
                    <div>Spot: <b>{historyReserve.parkingSpot}{historyReserve.parkingSector}</b></div>
                    <div>Period: <b>{historyReserve.startparking} - {historyReserve.endParking.split(" ")[1]}</b></div>
                    <div> Price: <b>{historyReserve.paymentAmount} RON</b></div>
               </CardComponent>
               )
            })}


        </Dialog>
        {console.log(badgesList)}
    </>
}

export default Profile