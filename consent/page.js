export default function ConsentPage() {

return (

<div style={{maxWidth:800,margin:"auto"}}>

<h1>SIMTRACE User Consent</h1>

<p>
By registering your device with SIMTRACE you agree that the system
may collect technical information necessary for device protection.
</p>

<h3>Information Collected</h3>

<ul>
<li>Device IMEI</li>
<li>Device fingerprint</li>
<li>SIM network changes</li>
<li>Approximate location when theft is reported</li>
</ul>

<h3>Purpose</h3>

<p>
This information is used exclusively for theft detection,
device recovery, and intelligence analysis.
</p>

<p>
SIMTRACE will never sell personal identity information.
</p>

<label>
<input type="checkbox"/> I agree to SIMTRACE data collection for device protection.
</label>

<br/><br/>

<button>Accept & Continue</button>

</div>

)

}
