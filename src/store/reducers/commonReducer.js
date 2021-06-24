import { 

} from '../constants';

const initState = {
    sessionId: null,
    region: 'FB',
    sendingContactRequest: false,
    contactModalOpen: false
}

const commonReducer = (state = initState, action) => {
    switch (action.type) {  
       
      
    
        default: {
            return state;
        }
    }
}

export default commonReducer;