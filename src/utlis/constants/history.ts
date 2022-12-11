import { createBrowserHistory } from 'history';

const history = typeof document !== 'undefined' ? createBrowserHistory() : null;
export default history;
