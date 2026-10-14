"use client";
import {useCallback,useEffect,useRef,useState} from "react";
import type {CSSProperties} from "react";
import {ArrowLeft,ArrowRight,Check,Copy,Gift,Info,RotateCcw,Sparkles} from "lucide-react";
import {Wheel,prizes} from "@/components/Wheel";
type Tab="game"|"gifts"|"rules";
type Win={id:string;prizeId:number;code:string;date:string};
const STORAGE_KEY="beerfactory-wheel-demo-v2";
const SPIN_DURATION=4700;
function Logo(){return <div className="brand" aria-label="Beer Factory NSK"><img src="/beerfactory-logo.webp" alt="Beer Factory NSK" width="55" height="73"/><div className="brand-caption"><span>РЕСТОРАН</span><span>ПИВОВАРНЯ</span><b>НОВОСИБИРСК</b></div></div>}
function Nav({tab,onChange}:{tab:Tab;onChange:(tab:Tab)=>void}){
const items=[{id:"game" as const,label:"ИГРА",Icon:RotateCcw},{id:"gifts" as const,label:"ПОДАРКИ",Icon:Gift},{id:"rules" as const,label:"ПРАВИЛА",Icon:Info}];
return <nav className="bottom-nav" aria-label="Основные разделы">{items.map(({id,label,Icon})=><button key={id} type="button" className={tab===id?"nav-item active":"nav-item"} onClick={()=>onChange(id)} aria-current={tab===id?"page":undefined}><Icon size={21} strokeWidth={tab===id?2.35:1.85} aria-hidden="true"/><span>{label}</span></button>)}</nav>
}
export default function Home(){
const [tab,setTab]=useState<Tab>("game"),[win,setWin]=useState<Win|null>(null),[history,setHistory]=useState<Win[]>([]),[rotation,setRotation]=useState(0),[spinning,setSpinning]=useState(false),[spinDuration,setSpinDuration]=useState(SPIN_DURATION),[copiedCode,setCopiedCode]=useState<string|null>(null);
const hydrated=useRef(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null),busy=useRef(false);
useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");if(Array.isArray(saved))setHistory(saved.filter(item=>typeof item?.prizeId==="number"&&typeof item?.code==="string"))}catch{} hydrated.current=true;return()=>{if(timer.current)clearTimeout(timer.current)}},[]);
useEffect(()=>{if(hydrated.current){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(history))}catch{}}},[history]);
const navigate=useCallback((next:Tab)=>{setTab(next);if(next!=="game")setWin(null)},[]);
const spin=useCallback(()=>{
if(busy.current)return;busy.current=true;setWin(null);
const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;const duration=reduced?600:SPIN_DURATION;setSpinDuration(duration);
const index=Math.floor(Math.random()*prizes.length);
setRotation(previous=>{const target=(360-((index*60+30)%360))%360;const delta=(target-(((previous%360)+360)%360)+360)%360;return previous+(reduced?0:360*6)+delta});
setSpinning(true);
timer.current=setTimeout(()=>{const next:Win={id:crypto.randomUUID?.()??`${Date.now()}`,prizeId:index,code:`DEMO-${Math.floor(1000+Math.random()*9000)}`,date:new Date().toISOString()};setWin(next);setHistory(previous=>[next,...previous]);setSpinning(false);busy.current=false;window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("success")},duration+80);
},[]);
const copy=async(code:string)=>{try{await navigator.clipboard.writeText(code);setCopiedCode(code);window.setTimeout(()=>setCopiedCode(null),1600)}catch{}};
const showWin=(selected:Win)=>{setWin(selected);setTab("game")};
const selectedPrize=win?prizes[win.prizeId]:null;
return <main className="app-shell">
<header className="header"><Logo/><span className="header-aside">ТВОЙ ШАНС<br/>НА ПОДАРОК<span className="header-dot">.</span></span></header>
<div className="app-content" key={tab==="game"?(win?"result":"game"):tab}>
{tab==="game"&&!win&&<section className="game-screen" aria-label="Розыгрыш подарка">
<div className="hero-topline"><span className="topline-label"><span className="topline-square"/> КОЛЕСО ПОДАРКОВ</span><span className="demo-label">ДЕМО</span></div>
<h1 className="display-title">ТВОЙ<br/>СЧАСТЛИВЫЙ<br/>СТОЛ<span className="title-period">.</span></h1>
<p className="hero-subtitle">Крути колесо и получи приятный<br className="optional-break"/> комплимент от Beer Factory.</p>
<Wheel rotation={rotation} spinning={spinning} duration={spinDuration}/>
<button className="main-button" onClick={spin} disabled={spinning} type="button"><span>{spinning?"КОЛЕСО КРУТИТСЯ...":"КРУТИТЬ КОЛЕСО"}</span>{spinning?<span className="spinner" aria-hidden="true"/>:<ArrowRight size={23} strokeWidth={1.8} aria-hidden="true"/>}</button>
<p className="screen-footnote">Это демонстрация. Призы пока недействительны.</p></section>}
{tab==="game"&&win&&selectedPrize&&<section className="result-screen" aria-live="polite">
<button className="text-back" type="button" onClick={()=>setWin(null)}><ArrowLeft size={18}/> К колесу</button>
<div className="result-intro"><div className="result-rays" aria-hidden="true"><i/><i/><i/><i/><i/></div><span className="overline">ТВОЙ ПОДАРОК</span><h1 className="result-title">{selectedPrize.name}</h1><p>Отличный повод заглянуть к нам!</p></div>
<div className="result-hero" style={{"--prize-color":selectedPrize.color} as CSSProperties}><div className="hero-grain"/><Sparkles className="star-1" size={26}/><Gift className="hero-gift" size={112} strokeWidth={1.4}/><Sparkles className="star-2" size={17}/><div className="prize-banner">BEER FACTORY · NSK</div></div>
<div className="promo-card"><span>ТВОЙ ПРОМОКОД</span><div className="promo-code"><strong>{win.code}</strong><button onClick={()=>copy(win.code)} type="button" aria-label="Скопировать код">{copiedCode===win.code?<Check size={22}/>:<Copy size={22}/>}</button></div></div>
<button className="main-button dark-button" type="button" onClick={()=>navigate("gifts")}><span>МОИ ПОДАРКИ</span><ArrowRight size={22}/></button>
<p className="screen-footnote">Демо-промокод не действует в ресторане.</p></section>}
{tab==="gifts"&&<section className="inner-screen gifts-screen">
<div className="overline">СОХРАНЕНО ДЛЯ ТЕБЯ</div><h1 className="section-title">МОИ<br/>ПОДАРКИ<span className="title-period">.</span></h1><p className="section-description">Все выигрыши в одном месте. Открой подарок, чтобы посмотреть код.</p>
<div className="section-rule"/>
{history.length?<div className="gift-list">{history.map((item,index)=>{const prize=prizes[item.prizeId];if(!prize)return null;return <button className="gift-card" key={item.id} type="button" onClick={()=>showWin(item)}><span className="gift-tile" style={{background:prize.color}}><Gift size={27} strokeWidth={1.5}/></span><span className="gift-card-text"><small>ПОДАРОК {String(index+1).padStart(2,"0")}</small><strong>{prize.name}</strong><span>{item.code}</span></span><ArrowRight size={20} className="gift-arrow"/></button>})}</div>:<div className="empty-state"><Gift size={48} strokeWidth={1.15}/><strong>ПОКА ПУСТО</strong><p>Твой первый подарок ждёт на колесе.</p><button className="main-button" onClick={()=>navigate("game")} type="button"><span>К КОЛЕСУ</span><ArrowRight size={21}/></button></div>}
</section>}
{tab==="rules"&&<section className="inner-screen rules-screen"><div className="overline">КАК ЭТО РАБОТАЕТ</div><h1 className="section-title">ПРОЩЕ<br/>ПРОСТОГО<span className="title-period">.</span></h1>
<div className="rules-list"><article><span>01</span><div><h2>КРУТИ КОЛЕСО</h2><p>Нажми кнопку и дождись, пока колесо остановится.</p></div></article><article><span>02</span><div><h2>УЗНАЙ СВОЙ ПРИЗ</h2><p>На экране появится подарок с уникальным демо-кодом.</p></div></article><article><span>03</span><div><h2>ПОСМОТРИ В «ПОДАРКАХ»</h2><p>Тестовые выигрыши сохраняются в этом браузере.</p></div></article></div>
<p className="rules-notice">Сейчас это макет. Настоящие призы, сроки действия и правила акции будут подключены после реализации серверной части.</p>
<button className="main-button" onClick={()=>navigate("game")} type="button"><span>ПОПРОБОВАТЬ</span><ArrowRight size={21}/></button></section>}
</div><Nav tab={tab} onChange={navigate}/></main>;
}
declare global {interface Window {Telegram?:{WebApp?:{HapticFeedback?:{notificationOccurred:(type:string)=>void}}}}}
