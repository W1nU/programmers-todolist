import { createStore, applyMiddlewares, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";

import {rootReducers} from "./modules";

const composeEnhancers = window.__REDUX