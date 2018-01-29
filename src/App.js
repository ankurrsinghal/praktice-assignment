import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import './App.css';
import data from './data.json';

class App extends Component {
  state = {
    rotation: 0
  }

  onWheel(e) {
    // e.stopPropagation();
    // const { deltaY } = e;
    // this.setState({
    //   rotation: deltaY
    // });
  }

  onDateSlotClick(slot) {
    this.setState({ dateSlot: slot, hourSlot: null });
  }

  onHourSlotClick(slot) {
    this.setState({ hourSlot: slot });
  }

  render() {
    const { title, available_slots } = data;
    const { dateSlot, hourSlot, rotation } = this.state;

    return (
      <div className="main-app">
        <h1 className="title">{title}</h1>

        <div className="slot-columns">
          <div className="slot-column available-slots" id="slot-wrapper">
            <h1>Date Slots</h1>
            <div style={{ transform: `rotateX(${rotation}deg)` }} ref="el" id="slot" data-state="1" onWheel={this.onWheel.bind(this)}>
              {
                available_slots.map((slot, index) => {
                  const noSlotsAvailable = slot.date_slots.length === 0 ? 'no-slot-available' : '';
                  return (
                    <div key={index} className={`${noSlotsAvailable} slot-item`}>
                      <a onClick={(e) => { e.preventDefault(); this.onDateSlotClick(slot) }} href="#" className="slot-link">{slot.date}</a>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="slot-column selected-date-slot">
            <h1>Hour Slots</h1>          
            {
              dateSlot ?
              (
                <div>
                  {
                    dateSlot.date_slots.map((slot, key) => {
                      return (
                        <div className={`slot-item`} key={key}>
                          <a onClick={(e) => { e.preventDefault(); this.onHourSlotClick(slot); }} href="#">{slot.hour}</a>
                        </div>
                      )
                    })
                  }
                </div>
              )
              :
              null
            }
          </div>

          <div className="slot-column selected-hour-slot">
            <h1>Available Slots</h1>
            {
              hourSlot ?
              (
                <div>
                  {
                    hourSlot.hour_slots.map((slot, key) => {
                      const title = Object.keys(slot)[0];
                      return (
                        <div className={`slot-item`} key={key}>
                          <a onClick={(e) => { e.preventDefault(); alert(`Congratulations ${title} has been alloted to you`); }} href="#">{title}</a>
                        </div>
                      )
                    })
                  }
                </div>
              )
              :
              null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
