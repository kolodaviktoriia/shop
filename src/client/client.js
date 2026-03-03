import { hydrateRoot } from 'react-dom/client';
import Landing from './pages/Landing.js';

hydrateRoot(
    document.getElementById('root'),
    <Landing />
);