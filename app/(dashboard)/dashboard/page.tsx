import { redirect } from 'next/navigation';
import { Settings } from './settings';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import SearchBox from '../search-box';
import OpenCageGeocoding from '../lat_long';
import FlightSearch from '../flightSearch';




import { StrictMode } from 'react';
import App from '../map/page';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  const places = [
    { lat: 51.505, lng: -0.09, name: "Place 1" },
    { lat: 51.515, lng: -0.1, name: "Place 2" },
    { lat: 51.525, lng: -0.08, name: "Place 3" },
    { lat: 51.535, lng: -0.07, name: "Place 4" },
  ];


  return <SearchBox />

//   <div className="relative w-full h-screen">
//   {/* Render the MapComponent dynamically client-side */}
//   <div className="flex justify-center items-center absolute right-0">
//     <MapComponent places={places} />
//   </div>
// </div>

// return (
  
//     <App />
  
// )




}
