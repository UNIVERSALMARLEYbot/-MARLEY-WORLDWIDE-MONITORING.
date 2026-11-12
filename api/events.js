import {done,getJSON,fail} from './_lib.js';
export default async function handler(req,res){try{
 const [quake,natural]=await Promise.allSettled([
 getJSON('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson'),
 getJSON('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=75')]);
 const items=[];const health={};
 if(quake.status==='fulfilled'){health.usgs='ok';for(const e of quake.value.features||[]){const [lon,lat]=e.geometry?.coordinates||[];if(Number.isFinite(lat)&&Number.isFinite(lon))items.push({id:`usgs-${e.id}`,kind:'earthquake',type:'Séisme',title:e.properties?.title||'Séisme',lat,lon,magnitude:e.properties?.mag,time:new Date(e.properties?.time).toISOString(),url:e.properties?.url,source:'USGS'});}}else health.usgs='indisponible';
 if(natural.status==='fulfilled'){health.nasa='ok';for(const e of natural.value.events||[]){const g=[...(e.geometry||[])].reverse().find(x=>x.type==='Point'&&x.coordinates?.length>=2);if(!g)continue;const [lon,lat]=g.coordinates;if(!Number.isFinite(lat)||!Number.isFinite(lon))continue;items.push({id:`eonet-${e.id}`,kind:'nature',type:e.categories?.map(c=>c.title).join(', ')||'Événement naturel',title:e.title,lat,lon,time:g.date,url:e.sources?.[0]?.url||e.link,source:'NASA EONET'});}}else health.nasa='indisponible';
 if(!items.length&&Object.values(health).every(s=>s!=='ok'))throw Error('Aucune source disponible');
 done(res,200,{ok:true,items:items.sort((a,b)=>new Date(b.time)-new Date(a.time)),health,updatedAt:new Date().toISOString()},120);
}catch(e){fail(res,'USGS / NASA EONET',e)}}
