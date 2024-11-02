import { useState, useMemo } from 'react'
import {Button} from "primereact/button";
import {toast, ToastContainer} from "react-toastify";

import "./ParkingLot.css"
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";

const occupiedSpotsHardcoded = new Set(['spot-1', 'spot-2', 'spot-7','spot-8', 'spot-11'])

export default function ParkingLot({ rows = 5, cols = 10 }: { rows?: number, cols?: number }) {
    const [occupiedSpots, setOccupiedSpots] = useState<Set<string>>(occupiedSpotsHardcoded)

    const toggleSpot = (spotId: string, spotNumber?: number) => {
      confirmDialog({
            header: 'Are you sure you want to reserve this spot?',
            message: 'The payment will start after you enter the parking lot and it will stop after you leave.',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log(spotNumber)
                toast.success('The reservation has been done successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                setOccupiedSpots(prev => {
                    const newSet = new Set(prev)
                    if (newSet.has(spotId)) {
                        newSet.delete(spotId)
                    } else {
                        newSet.add(spotId)
                    }
                    return newSet
                })
            }
        })
    }

    const parkingSpots = useMemo(() => {
        let spotNumber = 1
        return Array.from({ length: rows * cols }).map((_, index) => {
            const colIndex = index % cols
            if (colIndex === 0 || colIndex === 3 || colIndex === 6 || colIndex === 9) {
                return { type: 'path', id: `path-${index}` }
            }
            return { type: 'spot', id: `spot-${index}`, number: spotNumber++ }
        })
    }, [rows, cols])

    const renderSpot = (spot: { type: string; id: string; number?: number }) => {
        if (spot.type === 'path') {
            return <div key={spot.id} className="path" aria-label="Path" />;
        }

        const isOccupied = occupiedSpots.has(spot.id);
        const spotClass = `parking-spot ${isOccupied ? 'occupied' : 'available'}`;

        return (
            <Button
                key={spot.id}
                className={spotClass}
                onClick={() => toggleSpot(spot.id, spot.number)}
                disabled={isOccupied}
                aria-label={`Parking spot ${spot.number}, ${isOccupied ? 'occupied' : 'available'}`}
            >
                {spot.number}
            </Button>
        );
    };

    const totalSpots = parkingSpots.filter(spot => spot.type === 'spot').length
    const occupiedCount = occupiedSpots.size
    const availableSpots = totalSpots - occupiedCount

    return (
        <div className="container">
            <div className="row-sections">
                <span>Section A</span>
                <span>Section B</span>
                <span>Section C</span>
            </div>
            <div className="relative">
                <div
                    className={`grid grid-cols`}
                    style={{
                        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    }}
                >
                    {parkingSpots.map(spot => renderSpot(spot))}
                </div>
                {[0, 3, 6, 9].map(col => (
                    <div
                        key={col}
                        className="vertical-line"
                        style={{left: `calc(${(col + 1) * 100 / cols}% - 1px)`}}
                        aria-hidden="true"
                    />
                ))}
            </div>
            <p style={{textAlign:"center"}} aria-live="polite">
                Available spots: {availableSpots} / {totalSpots}
            </p>
            <ToastContainer/>
            <ConfirmDialog />
        </div>

    )
}