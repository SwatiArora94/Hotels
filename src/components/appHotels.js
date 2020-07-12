import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppHeader from './appHeader'
import AppHotelCard from './appHotelCard';
import AppHotelFilters from './appHotelFilters';

class AppHotels extends Component {

  constructor(props){
    super(props);
    this.filters=[
      {id:'starRating',name:'rating',isSelected:false},
      {id:'price',name:'price',isSelected:false},
      {id:'roomsAvailable',name:'rooms',isSelected:false}
  ]
  this.state={
    hotels:props.hotels
  }
    this.bindEvents();
  }

  bindEvents(){
    this.renderHotels= this.renderHotels.bind(this);
    this.renderHotel= this.renderHotel.bind(this);
    this.sortHotels = this.sortHotels.bind(this);
  }

  sortHotels(filterIndex,filterId){
    let {hotels=[]}=this.state;
    let filter = this.filters[filterIndex];
    if(filter.id===filterId && !filter.isSelected){
      hotels.sort((a,b)=>{
        return a[filterId]-b[filterId];
      })
      this.setState({
        hotels
      });
    }else if(filter.id===filterId && filter.isSelected){
      hotels.sort((a,b)=>{
        return b[filterId]-a[filterId];
      })
      this.setState({
        hotels
      });
    }
    this.filters[filterIndex].isSelected = !filter.isSelected;
  }

  renderHotel(hotel,index){
    const {name=''}=hotel || {};
    return <AppHotelCard key ={`${index}_${name}`} hotel={hotel}></AppHotelCard>
  }  

  renderHotels(){
    const { hotels = [] } = this.state
    const hotelView = hotels.map(hotel=>this.renderHotel(hotel));
    return <div id="hotel-list-cont">
      {hotelView}
    </div>
  }

  render() {
    const { isFetching } = this.props;
    const { hotels = [] } = this.state
    const totalHotels = hotels.length;
    return (
       <>
          <AppHeader></AppHeader>
          <AppHotelFilters filters={this.filters} sortHotels={this.sortHotels}></AppHotelFilters>
         {isFetching && totalHotels === 0 && <h2>Loading...</h2>}
         {!isFetching && totalHotels === 0 && <h2>Empty.</h2>}
         {!isFetching && totalHotels > 0 && this.renderHotels()}
       </>
    );
  }
}
 
function mapStateToProps({ isFetching, hotels }) {
  return {
    isFetching,
    hotels
  }
}
 
export default connect(mapStateToProps)(AppHotels)