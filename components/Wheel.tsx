"use client";
import { Beer, CakeSlice, Gift, Percent, Sandwich, UtensilsCrossed } from "lucide-react";
import type { CSSProperties } from "react";
export type Prize={id:number;label:string;name:string;color:string;ink:string};
export const prizes:Prize[]=[
{id:0,label:"НАПИТОК",name:"Напиток на выбор",color:"#F3C34A",ink:"#1A1A18"},
{id:1,label:"СКИДКА",name:"Скидка 10%",color:"#CF514A",ink:"#1A1A18"},
{id:2,label:"ДЕСЕРТ",name:"Десерт",color:"#8CBD63",ink:"#1A1A18"},
{id:3,label:"ЗАКУСКА",name:"Закуска к пиву",color:"#F3C34A",ink:"#1A1A18"},
{id:4,label:"ГРЕНКИ",name:"Фирменные гренки",color:"#CF514A",ink:"#1A1A18"},
{id:5,label:"СЮРПРИЗ",name:"Комплимент от Beer Factory",color:"#8CBD63",ink:"#1A1A18"}];
const icons=[Beer,Percent,CakeSlice,Sandwich,UtensilsCrossed,Gift];
const polar=(r:number,degrees:number)=>{const radians=degrees*Math.PI/180;return{x:200+r*Math.cos(radians),y:200+r*Math.sin(radians)}};
const wedge=(index:number)=>{const start=polar(174,-90+index*60);const end=polar(174,-90+(index+1)*60);return `M200 200 L${start.x} ${start.y} A174 174 0 0 1 ${end.x} ${end.y} Z`};
export function Wheel({rotation,spinning,duration}:{rotation:number;spinning:boolean;duration:number}){
return <div className="wheel-stage">
<div className="wheel-pointer" aria-hidden="true"><span/></div>
<svg className="wheel-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Колесо из шести призовых секторов">
<defs><radialGradient id="rim" cx="50%" cy="45%" r="70%"><stop offset="0" stopColor="#4B4132"/><stop offset=".79" stopColor="#201E1A"/><stop offset="1" stopColor="#0D0D0C"/></radialGradient><filter id="wheelShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#17120D" floodOpacity=".19"/></filter></defs>
<circle cx="200" cy="200" r="196" fill="url(#rim)" filter="url(#wheelShadow)"/>
<circle cx="200" cy="200" r="179" fill="#F8F2E7" stroke="#D3A955" strokeWidth="3"/>
<g style={{transform:`rotate(${rotation}deg)`,transformOrigin:"200px 200px",transition:spinning?`transform ${duration}ms cubic-bezier(.10,.72,.12,1)`:"none"} as CSSProperties}>
{prizes.map((prize,index)=>{const p=polar(114,-60+index*60);const Icon=icons[index];return <g key={prize.id}>
<path d={wedge(index)} fill={prize.color} stroke="#27231E" strokeWidth="1.3"/>
<g transform={`translate(${p.x} ${p.y})`} fill="none" stroke={prize.ink}>
<Icon x={-18} y={-31} size={36} strokeWidth={2.5} aria-hidden="true"/>
<text x="0" y="24" fill={prize.ink} stroke="none" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="Arial,sans-serif" letterSpacing="-.35">{prize.label}</text>
</g></g>})}
</g>
<circle cx="200" cy="200" r="52" fill="#181818" stroke="#E6B44D" strokeWidth="5"/>
<circle cx="200" cy="200" r="45" fill="#151515" stroke="#383126" strokeWidth="1"/>
<image href="/beerfactory-mark.webp" x="177" y="174" width="46" height="44" preserveAspectRatio="xMidYMid meet"/>
{Array.from({length:16},(_,i)=>{const p=polar(188,i*22.5-90);return <circle key={i} cx={p.x} cy={p.y} r="3" fill="#F1C66B" stroke="#715A32" strokeWidth=".7"/>})}
</svg></div>
}
