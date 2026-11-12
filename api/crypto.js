import {done,getJSON,fail} from './_lib.js';
export default async function handler(req,res){try{
 const url='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Csolana%2Cripple%2Cbinancecoin%2Cdogecoin%2Ccardano%2Cchainlink%2Cavalanche-2%2Ctron%2Cstellar%2Cpepe&order=market_cap_desc&per_page=25&page=1&sparkline=false&price_change_percentage=24h%2C7d';
 const headers=process.env.COINGECKO_DEMO_KEY?{'x-cg-demo-api-key':process.env.COINGECKO_DEMO_KEY}:{};
 const data=await getJSON(url,{headers});done(res,200,{ok:true,source:'CoinGecko',updatedAt:new Date().toISOString(),items:data.map(x=>({id:x.id,symbol:x.symbol.toUpperCase(),name:x.name,price:x.current_price,change24h:x.price_change_percentage_24h,change7d:x.price_change_percentage_7d_in_currency,volume:x.total_volume,marketCap:x.market_cap,image:x.image}))},90);
}catch(e){fail(res,'CoinGecko',e)}}
