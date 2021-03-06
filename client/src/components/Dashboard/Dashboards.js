import React, {useState, useEffect}  from 'react'
import Dashboard from '../../services/Dashboard'
import './css/Dashboards.css'
import WorkSpace from '../WorkSpace'
import AddDasboard  from './AddDashboard'
import NavBar from '../NavBar'


const Dashboards = () => {

    const [dashboards, setDashboards] = useState([])
    const [editDashId, setEditDashId] = useState(null)
    const [dashName, setDashName] = useState(null)
    const [activeDash, setActiveDDash] = useState(null)

    
    useEffect( () => {
        getDashboards()
    }, [])

    const handleInputChange = (e) => {
        setDashName(e.target.value.trim())
    }


    const getDashboards = async () => {
        const {data} = await Dashboard.list()
        setDashboards(data)
        if (activeDash && data) {
            const updateDash = data.find(d => d._id === activeDash._id)
            setActiveDDash(updateDash)
        }
    }

    const deleteDash = async (id) => {
        await Dashboard.deleteDash(id)
        getDashboards()

    }

    const save = async (id) => {
        if(!dashName) {
            setEditDashId(null)
            return
        }
        await Dashboard.save(id, dashName)
        setEditDashId(null)
        getDashboards()

    }


    return (
        <div className='app'>
            
            <div className='dash_container' id="style-2">
                <div className='dash_header'>
                    <h1 className='dash_title'>Tableros</h1>
                </div>

                <AddDasboard getDashboards={getDashboards} />

                <div className='dash_cards'>

                    {(dashboards || []).map(dash => {

                        const {name, _id} = dash
                        return <div className='dash_card' key={_id}>
                            {
                                editDashId === _id ? 
                                <input className='dash_input' onChange={handleInputChange} type='text' value={dashName === null ? name : dashName} placeholder='name' /> 
                                : 
                                <>
                                    <h1 onClick={() => setActiveDDash(dash)} key={_id}>{name}</h1>
                                </>
                            }
                            {
                                editDashId === _id ? 
                                <i onClick={() => save(_id)} className="far fa-save save-icon actiones"></i> :  
                                <i onClick={() => setEditDashId(_id)} className="fas fa-pen edit-icon actiones"></i>
                            }                                
                            <i onClick={() => deleteDash(_id)}  className="far fa-trash-alt remove-icon actiones"></i>
                        </div>
                    })}
                </div>


            </div>

            <div className='dash_Body'>
            <NavBar />
                <div>

                { activeDash && <WorkSpace getDashboards={getDashboards} activeDash={activeDash} />}
                </div>
                
            </div>


        </div>
    )

}

export default Dashboards;