import LandingPage from '@/components/LandingPage'
import PollutionChatBot from '@/components/PollutionChatbot'
import Warning from '@/components/Warning'

export default function Home() {
  return (
<>
<div className="w-screen  h-[90vh] overflow-hidden ">

<LandingPage/>
<PollutionChatBot/>
<Warning/>
</div>
</>
  );
}
