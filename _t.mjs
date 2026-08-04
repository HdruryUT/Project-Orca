import { computeZones, zonePace, fmtPace, fmtDuration } from './src/utils/paces.js';
import { demoEffort } from './src/services/strava.js';
const { effort } = demoEffort();
console.log('based on:', effort.name, effort.miles.toFixed(1)+'mi', fmtPace(effort.seconds/effort.miles)+'/mi');
const z = computeZones(effort);
console.log('pred marathon:', fmtDuration(z.marathonSeconds), '@', fmtPace(z.marathonPace)+'/mi');
for (const k of ['easy','recovery','long','marathon','tempo','intervals']) {
  console.log(k.padEnd(10), zonePace(z,k).text+'/mi');
}
