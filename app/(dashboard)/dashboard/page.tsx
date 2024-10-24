import { redirect } from 'next/navigation';
import { Settings } from './settings';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import SearchBox from '../search-box';
import OpenCageGeocoding from '../lat_long';
import FlightSearch from '../flightSearch';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }


  //return <SearchBox />
  // return <Settings teamData={teamData} />;
  return <OpenCageGeocoding />
// return <FlightSearch />
}
