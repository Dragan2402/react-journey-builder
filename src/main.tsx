import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BlueprintProvider } from './context/BlueprintContext.js';
import App from './App.jsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BlueprintProvider>
			<App />
		</BlueprintProvider>
	</StrictMode>
);
