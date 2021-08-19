import React, {useState, useEffect}  from 'react'
import Dashboard from '../../services/Dashboard'
import './css/Dashboards.css'
import AddDasboard  from './AddDashboard'


const Dashboards = () => {

    const [dashboards, setDashboards] = useState([])
    const [editDashId, setEditDashId] = useState(null)

    const [dashName, setDashName] = useState(null)

    
    useEffect( () => {
        getDashboards()
    }, [])

    const handleInputChange = (e) => {
        setDashName(e.target.value.trim())
    }


    const getDashboards = async () => {
        const {data} = await Dashboard.list()
        setDashboards(data)
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
        <div className='dash_container'>
            <div className='dash_header'>
                <h1 className='dash_title'>Tableros</h1>
            </div>

            <AddDasboard getDashboards={getDashboards} />

            <div className='dash_cards'>

                    {(dashboards || []).map(({name, _id}) => (
                            <div className='dash_card' key={_id}>
                                {
                                    editDashId === _id ? 
                                    <input onChange={handleInputChange} type='text' value={dashName === null ? name : dashName} placeholder='name' /> : 
                                    <>
                                    <h1 key={_id}>{name}</h1>
                                    </>
                                }
                               
                                {
                                    editDashId === _id ? 
                                    <i onClick={() => save(_id)} className="far fa-save edit-icon"></i> :  
                                    <i onClick={() => setEditDashId(_id)} className="fas fa-pen edit-icon"></i>
                                }
                                
                                
                                <i onClick={() => deleteDash(_id)}  className="far fa-trash-alt trash-icon"></i>
                            </div>
                    ))}
            </div>
        </div>
    )

}

export default Dashboards;