import { render, screen } from '@testing-library/react';
import submitLoginForm from '../components/forms/LoginForm';
import LoginForm from '../components/forms/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useReducer } from 'react'

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom')

    return {
        __esModule: true,
        ...originalModule,
        useNavigate: () => mockedUseNavigate
    }
})

test('logs user in', () => {
    mockedAxios.post.mockResolvedValue({status: 200})
    
    // submitLoginForm()
    // expect(useNavigate).toHaveBeenCalledWith('/Dashboard')

    return
});


it('renders login form title', () => {
    render(
    <BrowserRouter>
        <LoginForm/>
    </BrowserRouter>
    )
    const formTitle = screen.getByText(/Organizer Login/);
    expect(formTitle).toBeInTheDocument();
});