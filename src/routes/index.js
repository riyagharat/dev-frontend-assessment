import Routes from './Constants';
import HomeView from '../views/Home';
import SymbolsView from '../views/Symbols';
import TickerView from'../views/Ticker';
export default [
    {
        path : '/',
        name : Routes.HOME,
        component : HomeView,
        meta : {
            title : 'Home'
        },
    },
    {
        path : '/symbols',
        name : Routes.SYMBOLS,
        component : SymbolsView,
        meta : {
            title : 'Symbols'
        },
    },
    {
        path : '/ticker/:symbol',
        name : Routes.NAME,
        component : TickerView,
        meta : {
            title : 'Tickers'
        },
    }
];
