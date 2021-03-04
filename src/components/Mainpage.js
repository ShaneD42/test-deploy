// feature 1 
import React from "react";
import Services from "./Services";
import Filter from "./Filter";
import Cart from "./Cart";
import store from "../store"
import { Provider } from "react-redux";
import Footer from "./Footer";



class Mainpage extends React.Component {
// RENDER FUNCTION
  render() {
    return ( 
  <Provider store={store}>
   <div className="grid-container">
     {/* HEADER */}
     <header>
       <a href="/">Mitten MSP </a>
     </header>
    {/* MAIN  */}
     <main>
       <div className="content">
         <div className="main"> 
         <Filter></Filter>
         <Services> </Services> 
         </div>
         <div className="sidebar"> 
         <Cart/>
         </div>
       </div>
     </main> 
      {/* FOOTER */}
     <Footer/>
    </div>
   </Provider>
        
        );

        }
      }

export default Mainpage;