import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { darkTheme } from './theme';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
	createRoot(rootElement).render(
		<React.StrictMode>
			<RecoilRoot>
				<ThemeProvider theme={darkTheme}>
					<App />
				</ThemeProvider>
			</RecoilRoot>
		</React.StrictMode>
	);
} else {
	console.error("Root element with id 'root' not found!");
}
