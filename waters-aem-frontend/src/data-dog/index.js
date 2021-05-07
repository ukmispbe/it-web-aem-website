import {setUserDataForDataDog} from '../utils/userFunctions';

class DataDogEvent {
    constructor() {
        this.maxLimit = 50;
        this.count = 0;
        this.timer = '';
    }

    callDataDogEvent = () => {
        if (typeof window.DD_RUM  !== 'undefined') {
            setUserDataForDataDog();
            clearTimeout(this.timer);
        }else{
            if(this.count <= this.maxLimit){
                this.timer = setTimeout(()=> {
                    this.count = this.count + 1; 
                    this.callDataDogEvent()
                }, 1000);
            }
            else{
                clearTimeout(this.timer);
            }
            
        }
    }

    siteLoad = () => {
        this.callDataDogEvent()
    }

}

const dataDogEvent = new DataDogEvent();
    
export default dataDogEvent;