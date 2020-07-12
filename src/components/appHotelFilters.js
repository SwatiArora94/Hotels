import React, { Component } from 'react';

class AppHotelFilters extends Component{

    constructor(props){
        super(props);
        this.bindEvents();
    }

    onFilterClick(e){
        let filterId=e.currentTarget && e.currentTarget.getAttribute('data-id');
        let filterIndex =e.currentTarget && e.currentTarget.getAttribute('data-index');
        let {sortHotels}=this.props;
        if(sortHotels && typeof sortHotels === 'function'){
            sortHotels(filterIndex,filterId);
        }
    }

    bindEvents(){
        this.onFilterClick = this.onFilterClick.bind(this);
    }

    render(){
        let {filters=[]}= this.props;
        let filterView = filters.map((filter,index)=><div key ={filter.id} className="filter" data-id={filter.id} data-index={index} onClick={this.onFilterClick}><span>{filter.name}</span></div>)
        return <div id="hotel-filters-cont">
           {filterView}
        </div>;
    }
}

export default AppHotelFilters;