import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
// make sure qwikCityPlan is imported before entry
import render from './entry.ssr';

export default createQwikCity({ render, qwikCityPlan });
