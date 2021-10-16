import React from 'react'
import Card from './Card'

function CoronaSummary(props) {

    const { TotalConformed,
        TotalRecoverd,
        TotalDeaths,
        Country }
        = props
    return (

        <div>
            <h1 style={{textTransform:'capitalize'}}>{Country  === ''  ?   'Corona World Wide Report' : Country}</h1>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <Card>
                    <span>Total conformed</span><br />
                    <span>{TotalConformed}</span>
                </Card>

                <Card>
                    <span>Total Recoverd</span><br />
                    <span>
                        {TotalRecoverd}
                    </span>
                </Card>

                <Card>
                    <span>Total Deaths</span><br />
                    <span>{TotalDeaths}</span>
                </Card>
            </div>
        </div>
    )
}

export default CoronaSummary
