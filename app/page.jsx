import LandingPage from '@/components/LandingPage'
import PollutionChatBot from '@/components/PollutionChatbot'
import Warning from '@/components/Warning'

export default function Home() {
  return (
<>
<div className="overflow-hidden min-h-screen ">

<LandingPage/>
<PollutionChatBot/>
<Warning/>
</div>
</>
  );
}
