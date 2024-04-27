import {tiger} from "../../../lib/index.js"


export const bannerData = (await tiger.get("http://localhost:3000/banner")).data;

export const productsData = (await tiger.get("http://localhost:3000/products")).data;