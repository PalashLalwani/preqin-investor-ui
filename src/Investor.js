import { useParams } from "react-router-dom";
import { useState } from 'react'
import { Table, Form, Alert } from 'react-bootstrap';

function Investor() {
    const { id } = useParams();
    const [commitmentData, setCommitmentData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();


    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.value === '') {
            setErrorMessage("Please select asset class.")
        }
        // console.log(e.target.value,assetClass)
        if (e.target.value) {
            fetch(`http://127.0.0.1:8000/api/investor/commitment/${e.target.value}/${id}`)
                .then(res => {
                    // if (!res.ok) {
                    //     console.log(res)
                    //   }
                    return res.json()
                })
                .then((data) => {
                    console.log(data)
                    if (data && data.detail) {
                        setErrorMessage(data.detail)
                    }
                    else {
                        setCommitmentData(data)
                        setErrorMessage('')
                    }

                })
                .catch(e => {
                    console.log("error", e)
                })
        }
        else {
            setCommitmentData([])
        }
    }
    return (<>
        <br />
        <br/>
        <Form.Label htmlFor="investorOption">Select a Asset Class:</Form.Label>

        <Form.Select data-testid="select" name="investorOption" id="investorOption" onChange={(e) => handleChange(e)}>
            <option data-testid="select-option" value="">--Select--</option>
            <option data-testid="select-option" value="pe">Private Equity</option>
            <option data-testid="select-option" value="re">Real Estate</option>
            <option data-testid="select-option" value="inf">Infrastructure</option>
            <option data-testid="select-option" value="nr">Natural Resources</option>
            <option data-testid="select-option" value="hf">Hedge Funds</option>

        </Form.Select>
        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}


        <br />
        <br />

        {commitmentData !== null && commitmentData !== undefined && commitmentData.length !== 0 &&
            <div>
                <div>Asset Class Commitment</div>
                
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>FirmId</th>
                            <th>AssetClass</th>
                            <th>Amount</th>
                            <th>Currency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commitmentData.map((ele, key) => {
                            return (<tr key={key}>
                                <td>
                                    {ele.firm_id}
                                </td>
                                <td>
                                    {ele.asset_class}
                                </td>
                                <td>
                                    {ele.amount}
                                </td>
                                <td>
                                    {ele.currency}
                                </td>

                            </tr>)

                        })}

                    </tbody>



                </Table>
            </div>
        }


    </>)
}

export default Investor;