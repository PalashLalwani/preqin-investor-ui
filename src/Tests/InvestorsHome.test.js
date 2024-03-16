import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import InvestorsHome from '../InvestorsHome';

beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponse('[]')
})

describe('InvestorsHome', () => {

    it("Demonstrating navigation to InvestorHome tests ", async () => {
        const { getByText } = await render(
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<InvestorsHome />}
                    />
                </Routes>
            </BrowserRouter>
        )

        const text = screen.getByText(/list of investors/i);
        expect(text).toBeInTheDocument();
        //   fireEvent.click(button);
    });

    it('render investors headers', async () => {
        await fetch.mockResponse(JSON.stringify([{ "firm_id": 2670, "firm_name": "Mjd Jedi fund", "AUM": 426920827, "date_added": "2010-06-08T00:00:00Z", "last_updated": "2024-02-21T00:00:00Z", "established_at": "2010-06-08T00:00:00Z", "firm_type": "bank", "city": "Hong Kong", "country": "China", "address": "29 Nathan Road, Hong Kong", "postal_code": "37E" }, { "firm_id": 2792, "firm_name": "Ibx Skywalker ltd", "AUM": 307975834, "date_added": "1997-07-21T00:00:00Z", "last_updated": "2024-02-21T00:00:00Z", "established_at": "1997-07-21T00:00:00Z", "firm_type": "asset manager", "city": "New York", "country": "United States", "address": "19 Fifth Avenue, New York", "postal_code": "00347" }, { "firm_id": 332, "firm_name": "Cza Weasley fund", "AUM": 177250016, "date_added": "2002-05-29T00:00:00Z", "last_updated": "2024-02-21T00:00:00Z", "established_at": "2002-05-29T00:00:00Z", "firm_type": "wealth manager", "city": "London", "country": "United Kingdom", "address": "31 Baker Street, London", "postal_code": "WCL 43" }, { "firm_id": 3611, "firm_name": "Ioo Gryffindor fund", "AUM": 199319719, "date_added": "2000-07-06T00:00:00Z", "last_updated": "2024-02-21T00:00:00Z", "established_at": "2000-07-06T00:00:00Z", "firm_type": "fund manager", "city": "Singapore", "country": "Singapore", "address": "36 Marina Bay, Singapore", "postal_code": "9 20" }]))
        render(<BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<InvestorsHome />}
                />
            </Routes>
        </BrowserRouter>)

        await waitFor(() => {

            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/investors'));
            const button = screen.getAllByText(/more info/i)[0];
            expect(button).toBeInTheDocument(0);

        })
    })

})
