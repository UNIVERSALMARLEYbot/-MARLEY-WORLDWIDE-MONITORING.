import {done,getJSON,fail} from './_lib.js';
export default async function handler(req,res){try{
 const [usd,eur,gbp]=await Promise.all([getJSON('https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR,JPY,CHF,CAD,CNY'),getJSON('https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD,GBP,JPY,CHF'),getJSON('https://api.frankfurter.dev/v1/latest?base=GBP&symbols=USD')]);
 done(res,200,{ok:true,source:'Frankfurter / banques centrales',date:usd.date,updatedAt:new Date().toISOString(),items:[{symbol:'EUR/USD',value:eur.rates.USD},{symbol:'GBP/USD',value:gbp.rates.USD},{symbol:'USD/JPY',value:usd.rates.JPY},{symbol:'USD/CHF',value:usd.rates.CHF},{symbol:'USD/CAD',value:usd.rates.CAD},{symbol:'USD/CNY',value:usd.rates.CNY},{symbol:'EUR/GBP',value:eur.rates.GBP}]},3600);
}catch(e){fail(res,'Frankfurter',e)}}
