import React from 'react'
import axios from 'axios';
import Addbus from './Busses/AddBus/AddBus'
import ViewBusses from './Busses/ViewBusses/ViewBusses'
import AdminNavigation from './AdminNavigation/AdminNavigation'
import AddCity from './Cities/AddCity/AddCity'
import Aux from '../../Hoc/Auxs/Auxs'
import './Admin.css'
import ViewCities from './Cities/ViewCities/ViewCities'
import UpdateCity from './Cities/UpdateCity/UpdateCity'
import UpdateBus from './Busses/UpdateBus/UpdateBus'
import SeatBooked from './Busses/ViewBusses/SeatBooked/SeatBooked'
import Backdrop from '../Utility/Backdrop/Backdrop'

export default class Admin extends React.Component {
    state={
        busses:[],
        display:'menu',
        cities:[],
        updateCity:null,
        updateBus:null,
        showSeat:false,
        bus:{}
    }
    
    
    viewCity=()=>{
        axios.get('http://localhost:8080/city/viewCity')
            .then(response => {
                const cities = response.data.cities;
                this.setState({cities:cities})
            })
			.catch(error => {throw error});
    }
    deleteCity=(id)=>{
        axios.delete('http://localhost:8080/city/delete/' + id)
         .then(response=>{this.viewCity()});
    }
    updateCity = (id) => {
        let cities = this.state.cities;
        let city = cities.find((city) => city._id === id)
        this.setState({updateCity:city})
        this.navigateTo('updateCity')

    }
    viewBusses = () => {
        axios.get('http://localhost:8080/bus/viewBus')
            .then(response => {
                const busses = response.data.busses;
                this.setState({busses:busses})
            })
			.catch(error => {throw error});
    }
    deleteBus=(id)=>{
        let busses = this.state.busses;
        let bus = busses.find((bus) => bus._id === id);
        let showSeat = false
        for(let i=0;i<bus.seatStatus.length;i++){
            if(bus.seatStatus[i].status.includes('booked'))
            {
                showSeat = true;
                    break;
            }
        }
        if(showSeat)
        this.setState({bus:bus,showSeat:true})
        else{
            axios.delete('http://localhost:8080/bus/delete/' + id)
            .then(response=>{this.viewBusses()});
        }
    }
    updateBus = (id) => {
        let busses = this.state.busses;
        let bus = busses.find((bus) => bus._id === id);
        let showSeat = false;
        for(let i=0;i<bus.seatStatus.length;i++){
            if(bus.seatStatus[i].status.includes('booked'))
            {
                showSeat = true
                    break;
            }
        }
        if(showSeat)
        this.setState({bus:bus,showSeat:true})
        else{
        this.setState({updateBus:bus})
        this.navigateTo('updateBus')
        }

    }
    viewBusListBooked = () => {
        axios.get('http://localhost:8080/bus/viewBus')
            .then(response => {
                let busses = response.data.busses;
                busses = busses.filter((bus)=>{
                    let showSeat = false;
                    for(let i=0;i<bus.seatStatus.length;i++){
                        if(bus.seatStatus[i].status.includes('booked'))
                        {
                            showSeat = true
                                break;
                        }
                    }
                    return showSeat;
                })
                this.setState({busses:busses})
                
            })
			.catch(error => {throw error});
    }
    cancelSeatView=()=>{
        this.setState({showSeat:false})
    }
    navigateTo=(display)=>{
        if(display=='viewCity'){
            this.viewCity();
        }
        if(display=='viewBusList'){
            this.viewBusses();
        }
        if(display=='viewBusListBooked'){
            this.viewBusListBooked();
        }
        this.setState({display:display})
    }
    render(){
        let view=null;
        switch(this.state.display){
            case 'menu':
                view=(<Aux>
                    <AdminNavigation clicked={()=>this.navigateTo('viewBusList')}>View Bus List</AdminNavigation><br/>
                <AdminNavigation clicked={()=>this.navigateTo('addBus')}>Add Bus</AdminNavigation><br/>
                <AdminNavigation clicked={()=>this.navigateTo('viewBusListBooked')}>View list of buses booked</AdminNavigation><br/>
                <AdminNavigation clicked={()=>this.navigateTo('viewCity')}>View Cities</AdminNavigation><br/>
                <AdminNavigation clicked={()=>this.navigateTo('addCity')}>Add City</AdminNavigation><br/>
                <AdminNavigation clicked={()=>this.navigateTo()}>Chart - Top destination cities</AdminNavigation>
                </Aux>)
                break;
            case 'addCity':
                    view=(
                        <Aux>
                            <input type='button' 
                            onClick={()=>this.navigateTo('menu')} className="BackToMenu" value="<- Back To Menu"  />
                        <AddCity update={this.state.updateCity}/>
                        </Aux>
                    )
                break;
            case 'viewCity':
                    view=(
                        <Aux>
                        <input type='button' onClick={()=>this.navigateTo('menu')} className="BackToMenu" value="<- Back To Menu"  />
                        <ViewCities cities={this.state.cities} delete={this.deleteCity} update={this.updateCity}/>
                        </Aux>
                    )
                    break;
            case 'updateCity':
                    view=(
                        <Aux>
                         <input type='button' onClick={()=>this.navigateTo('menu')} className="BackToMenu" value="<- Back To Menu"  /> 
                        <UpdateCity update={this.state.updateCity}/>
                        </Aux>
                    )
                    break;
            case 'addBus':
                    view=(
                        <Aux>
                          <input type='button' onClick={()=>this.navigateTo('menu')} className="BackToMenu" value="<- Back To Menu"  />
                          <Addbus/>                            
                        </Aux>
                    )
                    break;
            case 'viewBusList':
                    view=(
                        <Aux>
                        <Backdrop show={this.state.showSeat} ><SeatBooked cancel={this.cancelSeatView}
                        seatStatus={this.state.bus.seatStatus} /></Backdrop>
                        <input type='button' onClick={()=>this.navigateTo('menu')} className="BackToMenu" value="<- Back To Menu"  />
                        <ViewBusses busses={this.state.busses} delete={this.deleteBus} update={this.updateBus}/>                            
                        </Aux>
                    )
                    break;
            case 'updateBus':
                    view=(
                        <Aux>
                         <input type='button' onClick={()=>this.navigateTo('menu')} className="BackToMenu" value="<- Back To Menu"  /> 
                        <UpdateBus update={this.state.updateBus}/>
                        </Aux>
                    )
                    break;
            case 'viewBusListBooked':
                    view=(
                        <Aux>
                        <Backdrop show={this.state.showSeat} ><SeatBooked cancel={this.cancelSeatView}
                        seatStatus={this.state.bus.seatStatus} /></Backdrop>
                        <input type='button' onClick={()=>this.navigateTo('menu')} className="BackToMenu" value="<- Back To Menu"  /> 
                        <ViewBusses busses={this.state.busses}  delete={this.deleteBus} update={this.updateBus}/>                            
                        </Aux>
                    )
                    break;
        }
        return(
            <div>
                <h1>WELCOME ADMIN</h1>
                {view}
            </div>
            
        )
    }
}