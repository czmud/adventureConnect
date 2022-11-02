import { render, screen } from '@testing-library/react';
import LoginForm from '../components/forms/LoginForm'
import { BrowserRouter } from 'react-router-dom';


it('renders login form title', () => {
    render(
    <BrowserRouter>
        <LoginForm/>
    </BrowserRouter>
    )
    const formTitle = screen.getByText(/Organizer Login/);
    expect(formTitle).toBeInTheDocument();
});