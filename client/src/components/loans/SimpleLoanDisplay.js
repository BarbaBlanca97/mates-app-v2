import React from 'react';

import './SimpleLoanDisplay.css'

class SimpleLoanDisplay extends React.Component {
    render () {
        return (
        <div className="wrapper">
            <div className="renglon">
                <div>Mates</div>
                <div>{ this.props.loan.mates }</div>
            </div>

            <div className="renglon">
                <div>Bombillas</div>
                <div>{ this.props.loan.bombillas }</div>
            </div>

            <div className="renglon">
                <div>Termos</div>
                <div>{ this.props.loan.termos }</div>
            </div>
            { this.props.loan.yerba ?
            <div className="renglon">
                <div>Yerba</div>
                <div>{ this.props.loan.yerba ? 'Si' : 'No'}</div>
            </div>
            : ''
            }
        </div>
        );
    }
}

export default SimpleLoanDisplay;