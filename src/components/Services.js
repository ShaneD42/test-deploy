import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { fetchServices } from "../actions/serviceActions";
import { connect } from "react-redux";
import {addToCart} from "../actions/cartActions";

 class Services extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: null,
        };
    }

    componentDidMount() {
        this.props.fetchServices();
    }


    openModal = (service) => {
        this.setState({service});
    };
    closeModal = () => {
        this.setState({service:null});
    };
    render() {
        const {service} = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    {
                        !this.props.services ? ( <div> loading... </div>
                        ) : (
                    
                <ul className="services">
                    {this.props.services.map((service) => (
                        <li key={service._id}>
                            <div className="service">
                                <a href={"#" + service._id} 
                                onClick={() => this.openModal(service)}>
                                    <img className ="service-images" src={service.image} alt={service.title}/>
                                    <p>
                                        {service.title}
                                    </p>
                                </a>

                                <div className="service-price">
                                    <div>
                                        {formatCurrency(service.price)}
                                    </div>
                                        <button onClick= {() => this.props.addToCart(service)}
                                            className="button primary">
                                            Add To Cart </button>
                                </div>

                           </div>
                       </li>
                   ))} 
                 </ul>
                        )}
             </Fade>
             {/* Modal */}
             {service && (
                     <Modal isOpen={true}
                     onRequestClose={this.closeModal}>
                         
                         <Zoom>
                             <button className="close-modal"
                             onClick={this.closeModal}>x</button>
                             
                             <div className="service-details">
                                <img src={service.image} alt={service.title}/>
                                <div className="service-details-description">
                                    <p>
                                        <strong>{service.title}</strong>
                                    </p>
                                    <p>
                                        {service.description}
                                    </p>
                                    <p>
                                        Product Types {" "}
                                        {service.productType.map(x=> (
                                            <span> {" "} <button className="button"> {x} </button> </span>
                                            ))} 
                                    </p>
                                    <div className="service-price">
                                        <div>
                                            {formatCurrency(service.price)}
                                            <button className="button primary" onClick={() => {
                                                this.props.addToCart(service);
                                                this.closeModal();
                                            }}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                       
                        </Zoom>
                    </Modal>
                )}
            </div>
        )
    }
}

export default connect(
(state) => ({services: state.services.filteredItems}), 
{ fetchServices, addToCart})
(Services);