import { connect } from 'react-redux'
import React, { Component } from 'react'
import { filterServices, sortServices } from '../actions/serviceActions';

class Filter extends Component {
    render() {
        return !this.props.filteredServices? (
            <div> Loading... </div>
        ) : (
            <div className="filter"> 
                <div className="filter-result"> {this.props.filteredServices.length} Services 
                </div>
                <div className="filter-sort"> 
                Sort {" "} 
                <select value={this.props.price} 
                onChange={(e) => 
                this.props.sortServices(
                    this.props.filteredServices, 
                    e.target.value)}>

                    <option value="lowest"> Price (Lowest) </option>
                    <option value="highest"> Price (Highest)</option>

               </select>
                      
                </div>

                <div className="filter-producttype"> Filter {" "}
                 <select value={this.props.productType} onChange={(e) => this.props.filterServices(this.props.services, e.target.value)}> 
                     <option value=""> All </option>
                     <option value="Desktop"> Desktop </option>
                     <option value="Laptop"> Laptop </option>
                     <option value="Tablet"> Tablet </option>
                     <option value="Switch"> Switch </option>
                     <option value="Access Point"> Access Point </option>
                     <option value="NAS Storage Device"> NAS Storage Device </option>
                     <option value="Firewall"> Firewall </option>
                    </select>
                </div>
                <form action="/main-page">
                    <input className="button" type="submit" value="Reset" />
                </form>
            </div> 
        )
    }
}

export default connect(
    (state) => ({
    productType: state.services.productType,
    sort: state.services.sort,
    services: state.services.items,
    filteredServices: state.services.filteredItems  
}),
{ filterServices, sortServices }
) (Filter); 