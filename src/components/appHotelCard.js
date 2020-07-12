import React, { Component } from 'react';
import hotels from '../redux/reducers';

class AppHotelCard extends Component{
    render(){
        const {hotel}=this.props;
        if(!hotel){
            return null;
        }
        
        return <div className="hotel-card-cont">
                <div className="hotel-card-img">
                    <img src={hotel.image} alt={hotel.name} className="hotel-img" />
                </div>
                <div className="hotel-details-cont hotel-info-cont">
                    {hotel.name && <div claasName="hotel-name-cont">
                        <span className="hotel-name">{hotel.name}</span>
                    </div>}
                    <div claasName="hotel-info-cont">
                        <span className="hotel-price">Rs. {hotel.price}</span>
                    </div>
                    <div claasName="hotel-info-cont">
                        <span className="hotel-rooms">{hotel.roomsAvailable} rooms Avaialable</span>
                    </div>
                    <div claasName="hotel-info-cont">
                        <span className="hotel-rating">{hotel.starRating} Stars</span>
                    </div>
                </div>
            </div>;
    }
}

export default AppHotelCard;
