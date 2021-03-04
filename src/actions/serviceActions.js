import { FETCH_SERVICES, FILTER_SERVICES_BY_TYPE, SORT_SERVICES_BY_PRICE } from "../types";

export const fetchServices = () => async(dispatch) => {
   const res = await fetch("/api/services");
   const data = await res.json();
   console.log(data);
   dispatch({
       type: FETCH_SERVICES,
       payload: data,
   });
};

export const filterServices = (services, productType) => (dispatch) => {
    dispatch({
        type: FILTER_SERVICES_BY_TYPE, 
        payload: {
            productType: productType,
            items: productType === ""
            ? services
            : services.filter(x => x.productType.indexOf(productType)>=0)
        }
    });
};

export const sortServices = (filterServices, sort) => (dispatch) => {
  const sortedServices = filterServices.slice();
    if(sort === "") {
        sortedServices.sort((a,b) => (a._id > b._id ? 1 : -1));
    } else {
        sortedServices.sort((a,b) => 
           sort === "lowest"
           ? a.price > b.price? 
           1 : -1
           :
           a.price > b.price
           ? -1 
           : 1 
        )
    }
    dispatch(
        {type: SORT_SERVICES_BY_PRICE,
        payload: {
            sort: sort, 
            items: sortedServices
        }  }
    )
}






