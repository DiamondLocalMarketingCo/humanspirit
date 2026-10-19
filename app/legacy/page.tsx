"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const GlobeClient = dynamic(() => import("../components/GlobeClient"), { ssr: false });
export default function Legacy() {
 const [mission, setMission] = useState(false);
 return <main className="legacy-wrap">
   <div className="legacy-globe" aria-hidden="true"><GlobeClient/></div>
   <div className="legacy-overlay"/>
   <div className="legacy-content"><img src="/liorvel_logo_white_transparent_true_alpha.png" className="legacy-logo" alt="Liorvel"/>
   {mission ? <><h1>Unlocking the knowledge<br/>that moves AI forward.</h1><p style={{maxWidth:660,margin:"28px auto",fontSize:20,lineHeight:1.65,color:"#cad4dd"}}>Liorvel connects organizations with valuable, licensable data to the teams building advanced AI. We facilitate data partnerships that respect ownership, privacy, and responsible use.</p></> :
   <><h1>Connecting data to the<br/>next frontier of intelligence.</h1><h2>Intelligence begins with data.</h2><p style={{letterSpacing:".26em",fontSize:12,color:"#adb4be"}}>AI DATA SOURCING &amp; LICENSING.</p></>}</div>
   <div className="legacy-nav"><a href="/" aria-label="Return to new website">NEW WEBSITE ↗</a><button onClick={() => setMission(!mission)} type="button" style={{border:"1px solid #888",borderRadius:50,padding:"12px 20px",fontSize:12,letterSpacing:".15em",background:"transparent",color:"white"}}>{mission ? "BACK ↩" : "MISSION →"}</button></div>
 </main>;
}
