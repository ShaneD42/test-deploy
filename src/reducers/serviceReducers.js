import { FETCH_SERVICES, FILTER_SERVICES_BY_TYPE, SORT_SERVICES_BY_PRICE } from "../types"

export const servicesReducer = (state = {}, action) => {
    switch (action.type){
        case FILTER_SERVICES_BY_TYPE:
            return {
                ...state,
                productType: action.payload.productType,
                filteredItems: action.payload.items,
            };
        case SORT_SERVICES_BY_PRICE:
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items,
                
            };
        case FETCH_SERVICES:
            return {items: action.payload, filteredItems: action.payload};
            default: 
                return state;
    }
}