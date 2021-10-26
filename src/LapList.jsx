import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss"
import lap from './index'

class LapList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeList: []
        }


    }


    render() {
        let index = 0;
        const time = lap;
        return (
            <div>
                <ul className="LapTimeList__list" >
                    {
                        this.state.timeList.map((time, index) => {
                            return (
                                <li key={index}>
                                    <lap lap={index + 1} time={time} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}



export default LapList;


