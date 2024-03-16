import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";
import Investor from '../Investor';

beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponse('[]')
})

describe('Investor Asset Class', () => {

    it("Demonstrating navigation to Investor test ", async () => {
        const firm_id = 2670;
        render(
            <MemoryRouter initialEntries={[`/investor/${firm_id}`]}>
                <Routes>
                    <Route
                        exact
                        path='/investor/:id'
                        element={<Investor />}
                    />
                </Routes>
            </MemoryRouter>
        )

        await waitFor(() => {
            const text = screen.getByText(/Select a Asset Class:/i);
            expect(text).toBeInTheDocument();
        })

        
    });

    it('test asset class dropdown', async () => {
        const firm_id = 2670;
        const { getByTestId, getAllByTestId } = render(
            <MemoryRouter initialEntries={[`/investor/${firm_id}`]}>
                <Routes>
                    <Route
                        exact
                        path='/investor/:id'
                        element={<Investor />}
                    />
                </Routes>
            </MemoryRouter>
        )

        //The value should be the key of the option
        fireEvent.change(getByTestId('select'), { target: { value: "pe" } })
        let options = getAllByTestId('select-option')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    })

})
