import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {Button, Table } from 'react-bootstrap';

function Investors(){

    const [investorsData, setInvestorsData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/investors')
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setInvestorsData(data)
        })
    },[])

    const handleClick = (e,id)=>{
        e.preventDefault()
        navigate(`/investor/${id}`);
    }

    return (<>
        {/* <div>{JSON.stringify(investorsData)}</div> */}
        <br />
        <div>List of investors</div>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th >FirmId</th>
                    <th >FirmName</th>
                    <th >Type</th>
                    <th >DateAdded</th>
                    <th >Address</th>
                    <th ></th>
                </tr>
            </thead>
            <tbody>
            {investorsData.map((ele,key)=>{
               return (<tr key={key}>
                    <td>
                    {ele.firm_id}
                    </td>
                    <td>
                    {ele.firm_name}
                    </td>
                    <td>
                    {ele.firm_type}
                    </td>
                    <td>
                    {ele.date_added}
                    </td>
                    <td>
                    {ele.address}
                    </td>
                    <td>
                        <Button id={'btn_' + ele.firm_id} onClick={(event)=>handleClick(event, ele.firm_id)}>More Info</Button>
                    </td>
                    
                </tr>)

            })}

            </tbody>

        
        
        </Table>
    </>)
}

export default Investors;